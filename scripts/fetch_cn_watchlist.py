"""
A股 ETF 市场观察数据获取脚本
数据源：AkShare ETF 行情接口 + 累积日线历史
输出：按分组的 ETF 数据 JSON

REL 计算方式：每日累积 ETF 收盘价到 history.json，从累积数据计算 N 日相对强度。
这样避免调用被封锁的 fund_etf_hist_em API。

用法: python scripts/fetch_cn_watchlist.py
"""
import json
import os
import sys
import time
from datetime import datetime, timedelta

import akshare as ak
import pandas as pd

sys.path.insert(0, os.path.dirname(__file__))
from cn_sector_config import (
    BENCHMARKS, DEFAULT_BENCHMARK,
    ALL_ETF_CODES, CN_ETF_GROUPS, get_etf_by_code, get_benchmark_info,
)

# ─── 配置 ─────────────────────────────────────────────────

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "data", "cn_watchlist")
HISTORY_FILE = os.path.join(OUTPUT_DIR, "history.json")
HISTORY_POINTS = 30
REL_PERIODS = [5, 20, 60, 120]
MAX_RETRIES = 5
ETF_SPOT_TIMEOUT = 60  # fund_etf_spot_em 超时（秒），批量获取62只ETF数据量大


# ─── 基准指数数据获取 ─────────────────────────────────────────────

def fetch_benchmark_history(benchmark_key: str, period_days: int = 150) -> pd.Series:
    """
    获取基准指数历史数据。

    Returns:
        收盘价 Series，索引为日期
    """
    benchmark_info = get_benchmark_info(benchmark_key)
    if not benchmark_info:
        raise ValueError(f"Unknown benchmark: {benchmark_key}")

    code = benchmark_info["code"]
    end_date = datetime.now().strftime("%Y%m%d")
    start_date = (datetime.now() - timedelta(days=period_days)).strftime("%Y%m%d")

    print(f"  获取基准指数 {benchmark_info['name']} ({code})...")

    for retry in range(MAX_RETRIES):
        try:
            df = ak.stock_zh_index_daily(
                symbol=f"sh{code}" if code.startswith("00") else f"sz{code}"
            )
            if df.empty:
                print(f"    WARNING: 基准指数 {code} 返回空数据")
                return pd.Series()

            col_map = {}
            for col in df.columns:
                if col in ("日期", "date"):
                    col_map[col] = "date"
                elif col in ("收盘", "close"):
                    col_map[col] = "close"
            df = df.rename(columns=col_map)

            if "date" not in df.columns or "close" not in df.columns:
                print(f"    WARNING: 基准指数 {code} 缺少必要列 {list(df.columns)}")
                return pd.Series()

            df['date'] = pd.to_datetime(df['date'])
            df = df[(df['date'] >= start_date) & (df['date'] <= end_date)]
            df = df.sort_values('date')

            print(f"    OK: {len(df)} 条基准记录")
            return df.set_index('date')['close']

        except Exception as e:
            if retry < MAX_RETRIES - 1:
                print(f"    重试 {retry + 1}/{MAX_RETRIES}: {e}")
                continue
            print(f"    ERROR: 获取基准指数失败 - {e}")
            return pd.Series()


# ─── ETF 实时行情 ─────────────────────────────────────────────

def fetch_etf_realtime(etf_codes: list) -> dict:
    """
    批量获取 ETF 实时行情。

    Returns:
        {code: {"name": str, "price": float, "change_pct": float}}
    """
    print(f"获取 ETF 实时行情 ({len(etf_codes)} 只)...")

    result = {}

    for retry in range(MAX_RETRIES):
        try:
            # 增加 requests 超时，AkShare 内部用 requests 但不暴露 timeout 参数
            import requests
            original_get = requests.Session.get
            def _patched_get(self, url, **kwargs):
                kwargs.setdefault('timeout', ETF_SPOT_TIMEOUT)
                return original_get(self, url, **kwargs)
            requests.Session.get = _patched_get
            try:
                df = ak.fund_etf_spot_em()
            finally:
                requests.Session.get = original_get
            if df is None or df.empty:
                print("  WARNING: ETF 行情返回空数据")
                continue

            # 找到代码和涨跌幅列
            code_col = None
            name_col = None
            price_col = None
            change_col = None

            for col in df.columns:
                if col in ("代码", "code"):
                    code_col = col
                elif col in ("名称", "name"):
                    name_col = col
                elif col in ("最新价", "price"):
                    price_col = col
                elif col in ("涨跌幅", "change_pct"):
                    change_col = col

            if not code_col or not change_col:
                print(f"  WARNING: 列名不匹配 {list(df.columns)}")
                continue

            code_set = set(etf_codes)
            matched = df[df[code_col].astype(str).isin(code_set)]

            for _, row in matched.iterrows():
                code = str(row[code_col])
                try:
                    price = float(row[price_col]) if price_col else 0.0
                    change_pct = round(float(row[change_col]), 2)
                    name = str(row[name_col]) if name_col else ""
                    result[code] = {
                        "name": name,
                        "price": price,
                        "change_pct": change_pct,
                    }
                except (ValueError, TypeError):
                    pass

            print(f"  获取到 {len(result)}/{len(etf_codes)} 只 ETF 行情")
            return result

        except Exception as e:
            if retry < MAX_RETRIES - 1:
                print(f"  重试 {retry + 1}/{MAX_RETRIES}: {e}")
                time.sleep(5)
                continue
            print(f"  ERROR: 获取 ETF 行情失败 - {e}")
            return {}

    return result


# ─── 累积日线历史 ─────────────────────────────────────────────

def load_price_history(history_path: str) -> dict:
    """
    加载累积的 ETF 日线价格历史。

    Returns:
        {code: {"2026-04-14": 4.65, "2026-04-15": 4.70, ...}}
    """
    if not os.path.exists(history_path):
        print(f"  历史文件不存在，从零开始: {history_path}")
        return {}

    try:
        with open(history_path, "r", encoding="utf-8") as f:
            data = json.load(f)
        total_dates = sum(len(v) for v in data.values())
        print(f"  加载历史: {len(data)} 只 ETF, {total_dates} 条价格记录")
        return data
    except Exception as e:
        print(f"  WARNING: 加载历史文件失败: {e}")
        return {}


def save_price_history(history_path: str, history: dict):
    """保存累积日线价格历史。"""
    os.makedirs(os.path.dirname(history_path), exist_ok=True)
    with open(history_path, "w", encoding="utf-8") as f:
        json.dump(history, f, ensure_ascii=False)
    total_dates = sum(len(v) for v in history.values())
    print(f"  保存历史: {len(history)} 只 ETF, {total_dates} 条价格记录 → {history_path}")


def update_price_history(
    history: dict,
    realtime_data: dict,
    date_str: str,
) -> dict:
    """
    将今日实时价格追加到累积历史。

    Args:
        history: {code: {"2026-04-14": 4.65, ...}}
        realtime_data: {code: {"price": 4.746, ...}}
        date_str: "2026-04-16"

    Returns:
        更新后的 history
    """
    updated_count = 0
    for code, rt in realtime_data.items():
        price = rt.get("price")
        if not price or price <= 0:
            continue

        if code not in history:
            history[code] = {}

        # 追加/更新今日价格
        history[code][date_str] = price
        updated_count += 1

    # 清理超过 200 天的旧数据（保留足够计算 REL_120 + 余量）
    cutoff_date = (datetime.now() - timedelta(days=200)).strftime("%Y-%m-%d")
    for code in list(history.keys()):
        history[code] = {
            d: p for d, p in history[code].items()
            if d >= cutoff_date
        }

    print(f"  追加今日价格: {updated_count} 只 ETF ({date_str})")
    return history


def history_to_series(code: str, history: dict) -> pd.Series:
    """
    将累积历史转为 pandas Series，用于 REL 计算。

    Returns:
        收盘价 Series，索引为日期
    """
    if code not in history or not history[code]:
        return pd.Series()

    prices = history[code]
    dates = []
    values = []
    for date_str, price in sorted(prices.items()):
        dates.append(pd.to_datetime(date_str))
        values.append(float(price))

    if not dates:
        return pd.Series()

    return pd.Series(values, index=dates)


# ─── REL 计算 ─────────────────────────────────────────────

def calculate_rel(
    etf_close: pd.Series,
    benchmark_close: pd.Series,
) -> dict:
    """
    计算相对强度（REL）= ETF_N日收益率 - 基准_N日收益率
    """
    rel_data = {}

    for period in REL_PERIODS:
        if len(etf_close) < period or len(benchmark_close) < period:
            rel_data[f"rel_{period}"] = 0.0
            continue

        etf_ret = (etf_close.iloc[-1] / etf_close.iloc[-period] - 1) * 100
        benchmark_ret = (benchmark_close.iloc[-1] / benchmark_close.iloc[-period] - 1) * 100
        rel = round(etf_ret - benchmark_ret, 2)
        rel_data[f"rel_{period}"] = rel

    return rel_data


def calculate_rank(rel_data: dict) -> dict:
    """根据 REL 值计算简化的 Rank（百分位近似）。"""
    rank = {}
    for period in REL_PERIODS:
        rel_val = rel_data.get(f"rel_{period}", 0)
        rank_val = int(50 + rel_val * 2)
        rank[f"r_{period}"] = max(0, min(100, rank_val))
    return rank


def calculate_ytd(close: pd.Series) -> float:
    """计算年初至今收益率。"""
    if len(close) < 2:
        return 0.0
    year_start = f"{datetime.now().year}-01-01"
    ytd_data = close[close.index >= year_start]
    if len(ytd_data) < 2:
        return 0.0
    return round((ytd_data.iloc[-1] / ytd_data.iloc[0] - 1) * 100, 2)


def generate_history(close: pd.Series, current_price: float) -> list:
    """生成历史走势数据（用于图表）。"""
    if len(close) < HISTORY_POINTS:
        return [current_price] * HISTORY_POINTS
    recent = close.iloc[-HISTORY_POINTS:].tolist()
    recent[-1] = current_price
    return [round(float(x), 2) for x in recent]


# ─── 数据构建 ─────────────────────────────────────────────

def build_etf_data(
    code: str,
    realtime: dict,
    benchmark_close: pd.Series,
    etf_history_series: pd.Series,
) -> dict:
    """
    构建单个 ETF 的数据对象。

    Args:
        etf_history_series: 从累积日线构建的价格 Series
    """
    etf_info = get_etf_by_code(code)
    if not etf_info:
        return None

    # 计算 REL（从累积日线数据）
    rel_data = calculate_rel(etf_history_series, benchmark_close)
    rank_data = calculate_rank(rel_data)

    # YTD
    ytd_ret = calculate_ytd(etf_history_series)

    # 历史走势
    history = generate_history(etf_history_series, realtime["price"])

    return {
        "code": code,
        "name": etf_info["name"],
        "price": realtime["price"],
        "change_pct": realtime["change_pct"],
        "rel": rel_data,
        "rank": rank_data,
        "ytd": ytd_ret,
        "history": history,
    }


def build_output(groups_data: dict, benchmark_key: str) -> dict:
    """构建输出 JSON 结构。"""
    benchmark_info = get_benchmark_info(benchmark_key)
    total = sum(len(g["sectors"]) for g in groups_data.values())

    return {
        "date": datetime.now().strftime("%Y-%m-%d"),
        "updated_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%S+08:00"),
        "total_sectors": total,
        "benchmark": {
            "key": benchmark_key,
            "name": benchmark_info["name"],
            "name_en": benchmark_info["name_en"],
        },
        "groups": groups_data,
    }


# ─── 主运行函数 ─────────────────────────────────────────────

def run_fetch(output_dir: str = None, benchmark_key: str = None, force: bool = False):
    """
    主入口：获取 ETF 行情 → 追加历史 → 计算 REL → 输出 JSON。

    Args:
        force: 为 True 时覆盖已有文件（盘中刷新用）
    """
    if output_dir is None:
        output_dir = OUTPUT_DIR
    output_dir = os.path.abspath(output_dir)

    if benchmark_key is None:
        benchmark_key = DEFAULT_BENCHMARK

    if benchmark_key not in BENCHMARKS:
        print(f"ERROR: Unknown benchmark: {benchmark_key}")
        return None

    try:
        # 0. 提前检查文件是否已存在（避免浪费 API 调用）
        date_str = datetime.now().strftime("%Y-%m-%d")
        if benchmark_key == DEFAULT_BENCHMARK:
            filename = f"{date_str}.json"
        else:
            filename = f"{date_str}_{benchmark_key}.json"
        output_path = os.path.join(output_dir, filename)

        if os.path.exists(output_path) and not force:
            print(f"SKIP: {output_path} already exists (use --force to overwrite)")
            return None

        # 1. 获取基准指数历史（API 正常可用）
        print(f"基准指数: {BENCHMARKS[benchmark_key]['name']}")
        benchmark_close = fetch_benchmark_history(benchmark_key)
        if benchmark_close.empty:
            print("ERROR: 无法获取基准指数数据")
            return None

        # 2. 批量获取 ETF 实时行情
        realtime_data = fetch_etf_realtime(ALL_ETF_CODES)
        if not realtime_data:
            print("ERROR: 无法获取 ETF 行情")
            return None

        # 3. 加载累积日线历史 + 追加今日数据
        print("累积日线历史:")
        history_path = os.path.join(output_dir, "history.json")
        price_history = load_price_history(history_path)
        price_history = update_price_history(price_history, realtime_data, date_str)
        save_price_history(history_path, price_history)

        # 4. 按分组处理每个 ETF
        groups_output = {}
        for group_key, group_conf in CN_ETF_GROUPS.items():
            sectors = []
            for etf_conf in group_conf["etfs"]:
                code = etf_conf["code"]
                if code not in realtime_data:
                    print(f"  SKIP: {code} {etf_conf['name']} — 无实时数据")
                    continue

                # 从累积历史构建 Series
                etf_series = history_to_series(code, price_history)
                print(f"  {code} {etf_conf['name']}: {len(etf_series)} 日历史")

                etf_data = build_etf_data(
                    code, realtime_data[code], benchmark_close, etf_series
                )
                if etf_data:
                    sectors.append(etf_data)

            groups_output[group_key] = {
                "display_name": group_conf["display_name"],
                "sectors": sectors,
            }
            print(f"  [{group_conf['display_name']}] {len(sectors)} 只")

        # 5. 构建输出
        output = build_output(groups_output, benchmark_key)

        # 6. 写入文件
        os.makedirs(output_dir, exist_ok=True)

        with open(output_path, "w", encoding="utf-8") as f:
            json.dump(output, f, ensure_ascii=False, indent=2)

        total = output["total_sectors"]
        print(f"OK: {output_path} ({total} ETFs, {len(groups_output)} groups)")
        return output

    except Exception as e:
        print(f"ERROR: {e}")
        import traceback
        traceback.print_exc()
        return None


if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="获取A股ETF市场观察数据")
    parser.add_argument(
        "--benchmark", "-b",
        choices=list(BENCHMARKS.keys()),
        default=DEFAULT_BENCHMARK,
        help="基准指数 (默认: hs300)",
    )
    parser.add_argument(
        "--force", "-f",
        action="store_true",
        help="覆盖已有文件（盘中刷新用）",
    )
    args = parser.parse_args()
    run_fetch(benchmark_key=args.benchmark, force=args.force)
