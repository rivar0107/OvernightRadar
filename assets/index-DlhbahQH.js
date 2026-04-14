(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(s){if(s.ep)return;s.ep=!0;const l=a(s);fetch(s.href,l)}})();function te(e,t){e.querySelectorAll(".tab-item").forEach(a=>{a.addEventListener("click",()=>{const n=a.dataset.view;t(n)})})}function ne(e){const t=document.getElementById("tab-nav");t&&t.querySelectorAll(".tab-item").forEach(a=>{a.classList.toggle("active",a.dataset.view===e)})}const se={BASE_URL:"/OvernightRadar/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};let H="../data/";try{import.meta&&se&&(H="/OvernightRadar/data/")}catch{}console.log("[Data] BASE_URL:",H);async function S(e,t=7){const a=[],n=new Date;for(let s=0;s<t;s++){const l=new Date(n);l.setDate(l.getDate()-s),a.push(ae(l))}for(const s of a)try{const l=await fetch(`${H}${e}/${s}.json`);if(l.ok)return await l.json()}catch(l){console.warn(`Failed to fetch ${e}/${s}.json:`,l)}return null}function ae(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),n=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${n}`}function W(){return S("watchlist")}function le(){return S("results")}async function ie(){console.log("[Data] Fetching CN watchlist data...");const e=await S("cn_watchlist");return console.log("[Data] CN watchlist data:",e?`${e.total_sectors} sectors`:"null"),e}async function oe(e={}){try{const t=await S("signals");if(!t||!t.signals)return{signals:[],metadata:null};let a=[...t.signals];if(e.direction&&e.direction!=="all"){const s={bullish:"利多",bearish:"利空"}[e.direction]||e.direction;a=a.filter(l=>l.direction===s)}return e.confidence&&e.confidence!=="all"&&(a=a.filter(n=>{var i;return(((i=n.level)==null?void 0:i.toLowerCase())||"")==={high:"高",medium:"中",low:"低"}[e.confidence]||n.level===e.confidence})),e.type&&e.type!=="all"&&(a=a.filter(n=>n.type===e.type)),{signals:a,metadata:t.metadata||null,generated_at:t.generated_at||null}}catch(t){return console.error("获取信号数据失败:",t),{signals:[],metadata:null,generated_at:null}}}async function ce(){try{const e=await S("signals");return(e==null?void 0:e.signal_history)||[]}catch(e){return console.error("获取信号历史失败:",e),[]}}const D={4:{label:"强烈看多",cssClass:"sentiment-label-4"},3:{label:"偏多",cssClass:"sentiment-label-3"},2:{label:"中性",cssClass:"sentiment-label-2"},1:{label:"偏空",cssClass:"sentiment-label-1"},0:{label:"强烈看空",cssClass:"sentiment-label-0"}};function V(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function x(e){const t=e.us_change_pct>=0?"up":"down",a=D[e.sentiment_level]||D[2],n=e.relative_strength>=0?"跑赢大盘":"跑输大盘",s=e.relative_strength>=0?"up":"down",l=e.volatility.is_abnormal?`异常波动 ${e.volatility.vol_multiple}x`:"正常波动";let i="平盘";e.trend.direction==="up"&&e.trend.consecutive_days>0?i=`连涨${e.trend.consecutive_days}天 +${e.trend.cumulative_pct}%`:e.trend.direction==="down"&&e.trend.consecutive_days>0&&(i=`连跌${e.trend.consecutive_days}天 ${e.trend.cumulative_pct}%`);const r=e.supply_chain.map(c=>{const u=c.change_pct!==null&&c.change_pct!==void 0?c.change_pct>=0?"up":"down":"na";return`<div class="stock-item">
      <span class="stock-name">${c.name}</span>
      <span class="stock-change ${u}">${V(c.change_pct)}</span>
    </div>`}).join("");let o="";return e.cn_etf_code&&(o=`<span class="card-cn-etf">${e.cn_etf_name}(${e.cn_etf_code})</span>`),`
    <div class="card sentiment-${e.sentiment_level}">
      <div class="card-sentiment ${a.cssClass}">${a.label}</div>
      <div class="card-header">
        <span class="card-us">${e.us_name} <span style="color:var(--color-muted);font-weight:400">${e.us_etf}</span></span>
        <span class="card-change ${t}">${V(e.us_change_pct)}</span>
      </div>
      <div class="card-detail">
        <span class="card-rs ${s}">${n} ${e.relative_strength>=0?"+":""}${e.relative_strength.toFixed(1)}%</span>
      </div>
      <div class="card-detail">${l} / ${i}</div>
      <div class="card-cn">A 股映射: ${e.cn_name} ${o}</div>
      <div class="card-stocks">${r}</div>
    </div>
  `}const j={强:{label:"强",cssClass:"signal-strong"},中:{label:"中",cssClass:"signal-medium"},弱:{label:"弱",cssClass:"signal-weak"}},R={利多:{cssClass:"dir-bullish"},利空:{cssClass:"dir-bearish"}};function G(e,t=null){const a=j[e.level]||j.中,n=R[e.direction]||R.利多,s=e.sectors?e.sectors.map(u=>`<span class="signal-sector">${u}</span>`).join(""):"",l=e.targets&&e.targets.length>0?`<div class="signal-targets">目标: ${e.targets.join(", ")}</div>`:"",i=e.source_news?`<div class="signal-source">${e.source_news.source} · ${re(e.source_news.datetime)}</div>`:"",r=e.score!==void 0?`<span class="signal-score">评分 ${e.score}<span class="signal-score-bar"><span class="signal-score-bar-fill" style="width:${e.score}%"></span></span></span>`:"",o=t?`<span class="signal-time">${de(t)}</span>`:"",c=r||o?`<div class="signal-footer">${r}${o}</div>`:"";return`
    <div class="signal-card ${a.cssClass}">
      <div class="signal-header">
        <span class="signal-badge ${n.cssClass}">${a.label}级 ${e.direction}</span>
        <h3 class="signal-title">${e.title}</h3>
      </div>

      <div class="signal-meta">
        <span class="signal-direction ${n.cssClass}">${e.direction}</span>
        ${s}
      </div>

      ${l}

      <div class="signal-action">
        <svg class="action-label" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
        <span class="action-text">${e.action}</span>
      </div>

      ${e.reason?`<div class="signal-reason">${e.reason}</div>`:""}

      ${c}
      ${i}
    </div>
  `}function re(e){if(!e)return"";const t=new Date(e*1e3),n=Math.floor((new Date-t)/1e3/60);return n<60?`${n}分钟前`:n<1440?`${Math.floor(n/60)}小时前`:`${Math.floor(n/1440)}天前`}function de(e){if(!e)return"";try{const t=new Date(e),a=t.getFullYear(),n=String(t.getMonth()+1).padStart(2,"0"),s=String(t.getDate()).padStart(2,"0"),l=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${a}-${n}-${s} ${l}:${i}`}catch{return e}}const b=10;let p={allSignals:[],displayedCount:b,sortBy:"time",isLoading:!1};function Y(e,t){const a=[...e];switch(t){case"time":a.sort((l,i)=>{const r=new Date(l.generated_at||0).getTime();return new Date(i.generated_at||0).getTime()-r});break;case"confidence":const n={high:3,medium:2,low:1};a.sort((l,i)=>n[i.confidence]-n[l.confidence]);break;case"level":const s={strong:3,medium:2,weak:1};a.sort((l,i)=>s[i.level]-s[l.level]);break}return a}function ue(e){return e<=0?`
      <div class="load-more-done">
        <span class="done-text">已加载全部内容</span>
      </div>
    `:`
    <div class="load-more-container">
      <button class="load-more-btn" id="load-more-signals">
        <span class="btn-text">加载更多</span>
        <span class="btn-count">(剩余 ${e})</span>
      </button>
    </div>
  `}function N(e=3){return`
    <div class="signals-list">
      ${Array(e).fill(0).map(()=>`
        <div class="skeleton-card signal-card skeleton">
          <div class="skeleton-header">
            <div class="skeleton skeleton-title"></div>
            <div class="skeleton skeleton-meta"></div>
          </div>
          <div class="skeleton skeleton-action"></div>
          <div class="skeleton skeleton-reason"></div>
          <div class="skeleton skeleton-reason"></div>
        </div>
      `).join("")}
    </div>
  `}async function pe(e,t={}){const{filters:a={}}=t;try{const{signals:n,metadata:s,generated_at:l}=await oe(a),i=await ce();if(p.allSignals=n||[],p.displayedCount=b,p.sortBy="time",!n||n.length===0){me(e);return}z(e,l),K(e)}catch(n){console.error("Failed to render signals view:",n),e.innerHTML=`
      <div class="signals-view">
        <div class="signals-error">
          <p class="error-state">加载信号数据失败</p>
          <p class="error-detail">${n.message}</p>
        </div>
      </div>
    `}}function me(e){e.innerHTML=`
    <div class="signals-view">
      <div class="signals-header">
        <h2 class="signals-title">交易信号</h2>
        <p class="signals-subtitle">基于板块异动和市场趋势自动生成</p>
      </div>
      <div class="empty-state empty-signals">
        <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
        <h3 class="empty-title">暂无信号</h3>
        <p class="empty-desc">
          当市场出现板块突破、趋势反转或异常波动时，系统会自动生成信号
        </p>
      </div>
    </div>
  `}function z(e,t=null){const a=Y(p.allSignals,p.sortBy),n=a.slice(0,p.displayedCount),s=a.length-p.displayedCount;e.innerHTML=`
    <div class="signals-view">
      <div class="signals-list" id="signals-list">
        ${n.map(l=>G(l,t)).join("")}
      </div>
      ${ue(s)}
    </div>
  `}function J(){if(p.isLoading)return;p.isLoading=!0;const e=document.getElementById("load-more-signals"),t=document.getElementById("signals-list");e&&(e.classList.add("loading"),e.disabled=!0,e.innerHTML=`
      <div class="spinner"></div>
      <span class="btn-text">加载中...</span>
    `),setTimeout(()=>{p.displayedCount+=b;const a=Y(p.allSignals,p.sortBy),n=a.slice(p.displayedCount-b,p.displayedCount);t&&n.forEach(r=>{const o=document.createElement("div");o.innerHTML=G(r,null),t.appendChild(o.firstElementChild)});const s=a.length-p.displayedCount,l=document.querySelector(".load-more-container");l&&(s<=0?l.outerHTML=`
          <div class="load-more-done">
            <span class="done-text">已加载全部内容</span>
          </div>
        `:l.innerHTML=`
          <button class="load-more-btn" id="load-more-signals">
            <span class="btn-text">加载更多</span>
            <span class="btn-count">(剩余 ${s})</span>
          </button>
        `),p.isLoading=!1;const i=document.getElementById("load-more-signals");i&&i.addEventListener("click",J)},300)}function K(e){const t=document.getElementById("load-more-signals");t&&t.addEventListener("click",J);const a=document.getElementById("signals-sort");a&&a.addEventListener("change",n=>{p.sortBy=n.target.value,p.displayedCount=b,z(e,null),K(e)})}const _=8;let d={allSectors:[],displayedCount:_,sortBy:"change",isLoading:!1};function I(e,t){const a=[...e];switch(t){case"change":a.sort((s,l)=>Math.abs(l.change_pct)-Math.abs(s.change_pct));break;case"sentiment":const n={strong:3,neutral:2,weak:1};a.sort((s,l)=>n[l.sentiment]-n[s.sentiment]);break;case"volatility":a.sort((s,l)=>(l.volatility||0)-(s.volatility||0));break}return a}function he(e=4){return`
    <div class="sectors-list">
      ${Array(e).fill(0).map(()=>`
        <div class="skeleton-card card skeleton">
          <div class="skeleton-sentiment skeleton"></div>
          <div class="skeleton skeleton-detail"></div>
          <div class="skeleton skeleton-detail"></div>
          <div class="skeleton-stocks">
            <div class="skeleton skeleton-stock-item"></div>
            <div class="skeleton skeleton-stock-item"></div>
            <div class="skeleton skeleton-stock-item"></div>
          </div>
        </div>
      `).join("")}
    </div>
  `}function Q(e){return e<=0?`
      <div class="load-more-done">
        <span class="done-text">已加载全部内容</span>
      </div>
    `:`
    <div class="load-more-container">
      <button class="load-more-btn" id="load-more-sectors">
        <span class="btn-text">加载更多</span>
        <span class="btn-count">(剩余 ${e})</span>
      </button>
    </div>
  `}function ge(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function ve(e){if(!e)return"";const t=e.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):/);if(t){const[,a,n,s,l,i]=t;return`${a}-${n}-${s} ${l}:${i}`}return e}function fe(e="sectors"){return`
    <div class="radar-tabs">
      ${[{key:"sectors",icon:`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7"></rect>
      <rect x="14" y="3" width="7" height="7"></rect>
      <rect x="3" y="14" width="7" height="7"></rect>
      <rect x="14" y="14" width="7" height="7"></rect>
    </svg>
  `,label:"板块"},{key:"signals",icon:`
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
      <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  `,label:"信号"}].map(s=>`
        <button class="radar-tab ${s.key===e?"active":""}" data-tab="${s.key}">
          <span class="radar-tab-icon">${s.icon}</span>
          <span class="radar-tab-label">${s.label}</span>
        </button>
      `).join("")}
    </div>
  `}async function we(e){const t=document.createElement("div");try{return await pe(t),`<div class="radar-content">${t.innerHTML}</div>`}catch(a){return console.error("渲染信号视图失败:",a),'<div class="radar-content"><p class="empty-state">信号视图加载失败</p></div>'}}function O(e){const t=`
    <div class="disclaimer wl-top-disclaimer">
      <p>仅供数据参考，不构成投资建议。数据来源：Yahoo Finance、AKShare、公开市场数据。</p>
    </div>
  `;if(!e.sectors||e.sectors.length===0)return`
      <div class="radar-content">
        ${t}
        <div class="empty-state empty-sectors">
          <svg class="empty-icon" xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
          </svg>
          <h3 class="empty-title">暂无板块数据</h3>
          <p class="empty-desc">
            数据更新中，请稍后刷新查看
          </p>
        </div>
      </div>
    `;d.allSectors=e.sectors,d.displayedCount=_,d.sortBy="change";const a=I(d.allSectors,d.sortBy),n=a.slice(0,d.displayedCount),s=a.length-d.displayedCount;return`
    <div class="radar-content" id="sectors-content">
      ${t}
      <div class="sectors-list" id="sectors-list">
        ${n.map(x).join("")}
      </div>
      ${Q(s)}
    </div>
  `}function X(){if(d.isLoading)return;d.isLoading=!0;const e=document.getElementById("load-more-sectors"),t=document.getElementById("sectors-list");e&&(e.classList.add("loading"),e.disabled=!0,e.innerHTML=`
      <div class="spinner"></div>
      <span class="btn-text">加载中...</span>
    `),setTimeout(()=>{d.displayedCount+=_;const a=I(d.allSectors,d.sortBy),n=a.slice(d.displayedCount-_,d.displayedCount);t&&n.forEach(r=>{const o=document.createElement("div");o.innerHTML=x(r),t.appendChild(o.firstElementChild)});const s=a.length-d.displayedCount,l=document.querySelector(".load-more-container");l&&(s<=0?l.outerHTML=`
          <div class="load-more-done">
            <span class="done-text">已加载全部内容</span>
          </div>
        `:l.innerHTML=`
          <button class="load-more-btn" id="load-more-sectors">
            <span class="btn-text">加载更多</span>
            <span class="btn-count">(剩余 ${s})</span>
          </button>
        `),d.isLoading=!1;const i=document.getElementById("load-more-sectors");i&&i.addEventListener("click",X)},300)}function B(){const e=document.getElementById("load-more-sectors");e&&e.addEventListener("click",X);const t=document.getElementById("sectors-sort");t&&t.addEventListener("change",()=>{d.sortBy=t.value,d.displayedCount=_;const a=I(d.allSectors,d.sortBy),n=a.slice(0,d.displayedCount),s=a.length-d.displayedCount,l=document.getElementById("sectors-list");l&&(l.innerHTML=n.map(x).join(""));const i=document.querySelector(".load-more-container");i&&(i.outerHTML=Q(s)),B()})}async function ye(e,t,a="sectors"){const n=await le();if(!n){e.innerHTML='<p class="empty-state">暂无雷达数据</p>',t.innerHTML=`
      <h1 class="title">隔夜雷达</h1>
      <p class="slogan">昨夜美股异动，今日A股看点</p>
    `;return}const s={sp500:"标普500",nasdaq:"纳斯达克",dow:"道琼斯"};let l="";for(const[o,c]of Object.entries(s))if(n.market_indices&&n.market_indices[o]){const u=n.market_indices[o].change_pct,m=u>=0?"up":"down",h=u>=0?'<svg class="icon icon-sm" style="color: var(--color-bull);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>':'<svg class="icon icon-sm" style="color: var(--color-bear);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';l+=`<span class="index-item">${h} ${c}<span class="${m}">${ge(u)}</span></span>`}t.innerHTML=`
    <h1 class="title">隔夜雷达</h1>
    <p class="slogan">昨夜美股异动，今日A股看点</p>
    <div class="market-indices">${l}</div>
    <p class="date">${n.market_summary} · ${ve(n.updated_at)}</p>
  `;async function i(o){switch(o){case"signals":return await we();case"sectors":return O(n);default:return O(n)}}const r=await i(a);e.innerHTML=fe(a)+r,e.querySelectorAll(".radar-tab").forEach(o=>{o.addEventListener("click",async()=>{const c=o.dataset.tab;e.querySelectorAll(".radar-tab").forEach(m=>{m.classList.toggle("active",m.dataset.tab===c)});const u=e.querySelector(".radar-content");u&&(c==="sectors"?u.innerHTML=he(4):c==="signals"&&(u.innerHTML=N?N(3):'<div class="loading"><div class="loading-spinner"></div></div>'),setTimeout(async()=>{const m=await i(c),h=m.match(/<div class="radar-content">([\s\S]*)<\/div>/);u.innerHTML=h?h[1]:m,c==="sectors"&&B()},200))})}),a==="sectors"&&B()}function ke(e,t=!1){return e==null||isNaN(e)?"#334155":e>=5?"#d32f2f":e>=2?"#e57373":e>=.5?"#ffcdd2":e>0?"#ef9a9a":e===0?"#334155":e>-.5?"#c8e6c9":e>-2?"#81c784":e>-5?"#3ba53b":"#1b7a1b"}function $e(e,t){return t==="change_pct"?e.change_pct:e.rel&&t in e.rel?e.rel[t]:null}function be(e){return e==null||isNaN(e)?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function _e(e,t,a=!1){const n=$e(e,t),s=ke(n,a),l=be(n),i=e.code||e.ticker,r=e.name||"",o=!a&&e.has_cn_mapping?'<span class="wl-cn-badge" title="有A股映射">A</span>':"";return`
    <div class="wl-block${a?" cn":""}" data-code="${i}" style="background-color: ${s}">
      <span class="wl-block-ticker">${i}</span>
      <span class="wl-block-name">${r}</span>
      <span class="wl-block-value">${l}</span>
      ${o}
    </div>
  `}function Se(e,t){for(const a of Object.values(e)){if(a.etfs){const n=a.etfs.find(s=>s.ticker===t);if(n)return n}if(a.sectors){const n=a.sectors.find(s=>s.code===t);if(n)return n}}return null}function Le(e,t,a,n){let s=a;const l=t.find(o=>o.key===a),i=l?l.desc:"",r=t.map(o=>`<button class="wl-indicator-btn${o.key===a?" active":""}" data-key="${o.key}">${o.label}</button>`).join("");e.innerHTML=`
    <div class="wl-indicators-row">${r}</div>
    <p class="wl-indicator-desc">${i}</p>
  `,e.querySelectorAll(".wl-indicator-btn").forEach(o=>{o.addEventListener("click",()=>{const c=o.dataset.key;if(c===s)return;s=c,e.querySelectorAll(".wl-indicator-btn").forEach(h=>h.classList.remove("active")),o.classList.add("active");const u=t.find(h=>h.key===c),m=e.querySelector(".wl-indicator-desc");m&&u&&(m.textContent=u.desc),n(c)})})}function Ce(e,t,a={}){if(!t||t.length<2)return;const n=e.getContext("2d"),s=a.width||e.width||300,l=a.height||e.height||80;e.width=s,e.height=l;const i=Math.min(...t),o=Math.max(...t)-i||1,c=2,u=s-c*2,m=l-c*2,h=t[0],L=t[t.length-1],C=L>=h?"#2e7d32":"#c62828";n.clearRect(0,0,s,l),n.beginPath(),n.strokeStyle=C,n.lineWidth=1.5,n.lineJoin="round";for(let g=0;g<t.length;g++){const k=c+g/(t.length-1)*u,v=c+m-(t[g]-i)/o*m;g===0?n.moveTo(k,v):n.lineTo(k,v)}n.stroke();const w=n.createLinearGradient(0,0,0,l);w.addColorStop(0,L>=h?"rgba(46,125,50,0.15)":"rgba(198,40,40,0.15)"),w.addColorStop(1,"rgba(255,255,255,0)"),n.lineTo(c+u,l),n.lineTo(c,l),n.closePath(),n.fillStyle=w,n.fill()}let $=null;function y(e){return e==null||isNaN(e)?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function Z(e,t){if(!t)return;if(!e){t.style.display="none",$=null;return}if($===e.ticker){t.style.display="none",$=null;return}$=e.ticker;const a=e.rel?`
      <div class="wl-rel-grid">
        <div class="wl-rel-item"><span class="wl-rel-label">REL5</span><span class="wl-rel-value">${y(e.rel.rel_5)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL20</span><span class="wl-rel-value">${y(e.rel.rel_20)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL60</span><span class="wl-rel-value">${y(e.rel.rel_60)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL120</span><span class="wl-rel-value">${y(e.rel.rel_120)}</span></div>
      </div>
    `:"",n=e.has_cn_mapping?`
      <div class="wl-cn-mapping">
        <span class="wl-cn-badge-detail">有 A 股映射</span>
        <span class="wl-cn-hint">数据来源：隔夜雷达</span>
      </div>
    `:"";t.innerHTML=`
    <div class="wl-detail-header">
      <h3 class="wl-detail-title">${e.ticker} · ${e.name}</h3>
      <button class="wl-detail-close" id="wl-detail-close">✕</button>
    </div>
    <div class="wl-detail-price">
      <span class="wl-detail-price-value">$${e.price.toFixed(2)}</span>
      <span class="wl-detail-change">${y(e.change_pct)}</span>
      <span class="wl-detail-ytd">YTD: ${y(e.ytd)}</span>
    </div>
    <canvas id="sparkline-canvas" width="300" height="80"></canvas>
    ${a}
    ${n}
  `,t.style.display="block",document.getElementById("wl-detail-close").addEventListener("click",()=>{t.style.display="none",$=null});const s=document.getElementById("sparkline-canvas");s&&e.history&&e.history.length>=2&&Ce(s,e.history,{width:s.parentElement.clientWidth-32}),t.scrollIntoView({behavior:"smooth",block:"nearest"})}function Ee(e){if(!e)return"";const t=e.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):/);if(t){const[,a,n,s,l,i]=t;return`${a}-${n}-${s} ${l}:${i}`}return e}const Me=[{key:"change_pct",label:"日涨跌",desc:"当日涨跌幅 (%)"},{key:"rel_5",label:"5日强弱",desc:"近5日相对标普500的超额收益"},{key:"rel_20",label:"20日强弱",desc:"近20日(约1月)相对标普500的超额收益"},{key:"rel_60",label:"60日强弱",desc:"近60日(约1季)相对标普500的超额收益"},{key:"rel_120",label:"120日强弱",desc:"近120日(约半年)相对标普500的超额收益"}];let E="change_pct",F="us",f=null,M=null;function Te(e,t,a){const n=[{key:"us",label:"美股"},{key:"cn",label:"A股"}];e.innerHTML=`
    <div class="wl-market-switcher">
      ${n.map(s=>`
        <button
          class="wl-market-btn ${s.key===t?"active":""}"
          data-market="${s.key}"
        >
          ${s.label}
        </button>
      `).join("")}
    </div>
  `,e.querySelectorAll(".wl-market-btn").forEach(s=>{s.addEventListener("click",()=>{const l=s.dataset.market;console.log("[MarketSwitcher] Button clicked:",l),a(l)})})}async function Be(e,t){console.log("[HeatmapView] renderHeatmapView called"),f||(console.log("[HeatmapView] Loading US data..."),f=await W(),console.log("[HeatmapView] US data loaded:",f?`${f.total_etfs} etfs`:"null")),console.log("[HeatmapView] Rendering US market view"),await ee(e,t,"us")}async function ee(e,t,a,n=null){var C,w,g,k;console.log("[MarketView] Switching to market:",a),F=a;const s=a==="cn",l=s?"A股":"美股";t.innerHTML=`
    <h1 class="title">市场观察表</h1>
    <p class="slogan">正在加载${l}数据...</p>
  `,e.innerHTML='<p class="empty-state">加载中...</p>';let i;if(a==="us"?(console.log("[MarketView] Loading US data..."),f||(f=await W()),i=f):(console.log("[MarketView] Loading CN data..."),M||(M=await ie()),i=M),console.log("[MarketView] Data loaded:",i?`${i.total_sectors||"?"} sectors`:"null"),!i){t.innerHTML=`
      <h1 class="title">市场观察表</h1>
      <p class="slogan">暂无数据</p>
    `,e.innerHTML='<p class="empty-state">暂无数据</p>';return}const r=Ee(i.updated_at);t.innerHTML=`
    <div class="wl-header-top">
      <div>
        <h1 class="title">市场观察表</h1>
        <p class="slogan">
          Market Watchlist ·
          ${s?"A股申万板块相对强度热力图":"美股 ETF 相对强度热力图"}
        </p>
        <p class="date">更新时间: ${r||i.date}</p>
      </div>
    </div>
  `;const o='<div id="wl-market-switcher" class="wl-market-switcher-top"></div>',c=`
    <div class="disclaimer wl-top-disclaimer">
      <p>仅供数据参考，不构成投资建议。数据来源：${s?"AkShare":"TheMarketMemo、Yahoo Finance"}。</p>
      <p>REL (相对强度) = ${s?"行业":"ETF"}涨跌幅 - ${s?"基准指数":"标普500"}涨跌幅，正值表示跑赢大盘。</p>
    </div>
  `,u=`
    <div class="wl-main-layout">
      <div class="wl-right-content">
        ${o}
        <nav class="wl-indicators" id="wl-indicators"></nav>
        <div id="wl-heatmap"></div>
      </div>
    </div>
  `,m='<section id="wl-detail" class="wl-detail" style="display:none"></section>';e.innerHTML=c+u+m;const h=document.getElementById("wl-market-switcher");Te(h,F,v=>{h.querySelectorAll(".wl-market-btn").forEach(A=>{A.classList.toggle("active",A.dataset.market===v)}),ee(e,t,v)});const L=s?[{key:"change_pct",label:"日涨跌",desc:"当日涨跌幅 (%)",hasBenchmark:!0},{key:"rel_5",label:"5日强弱",desc:`近5日相对${((C=i.benchmark)==null?void 0:C.name)||"沪深300"}的超额收益`},{key:"rel_20",label:"20日强弱",desc:`近20日(约1月)相对${((w=i.benchmark)==null?void 0:w.name)||"沪深300"}的超额收益`},{key:"rel_60",label:"60日强弱",desc:`近60日(约1季)相对${((g=i.benchmark)==null?void 0:g.name)||"沪深300"}的超额收益`},{key:"rel_120",label:"120日强弱",desc:`近120日(约半年)相对${((k=i.benchmark)==null?void 0:k.name)||"沪深300"}的超额收益`}]:Me;Le(document.getElementById("wl-indicators"),L,E,v=>{E=v,q(document.getElementById("wl-heatmap"),i.groups,E,s)}),q(document.getElementById("wl-heatmap"),i.groups,E,s),Z(null,null),console.log("[MarketView] Render complete for market:",a)}function q(e,t,a,n=!1){if(!t){e.innerHTML='<p class="empty-state">暂无数据</p>';return}let s="";for(const l of Object.keys(t)){const i=t[l],r=i.etfs||i.sectors;!r||r.length===0||(s+=`
      <div class="wl-group">
        <h2 class="wl-group-title">${i.display_name}</h2>
        <div class="wl-blocks">
          ${r.map(o=>_e(o,a,n)).join("")}
        </div>
      </div>
    `)}e.innerHTML=s,e.querySelectorAll(".wl-block").forEach(l=>{l.addEventListener("click",()=>{const i=l.dataset.code||l.dataset.ticker,r=Se(t,i);if(r){const o=document.getElementById("wl-detail");Z(r,o)}})})}console.log("[Main] App starting...");const P={heatmap:Be,radar:ye},T="heatmap";async function He(){const e=document.getElementById("app"),t=document.getElementById("loading"),a=document.getElementById("error"),n=document.getElementById("tab-nav");try{te(n,s=>{window.location.hash=`#/${s}`}),window.addEventListener("hashchange",()=>U()),await U(),t.style.display="none",e.style.display="block",n.style.display="flex"}catch(s){console.error("Failed to initialize app:",s),t.style.display="none",a.style.display="block"}}async function U(){const t=(window.location.hash||"").replace("#/","")||T;if(!P[t]){console.warn(`Unknown view: ${t}, falling back to ${T}`),window.location.hash=`#/${T}`;return}const a=document.getElementById("view-container"),n=document.getElementById("app-header");ne(t),await P[t](a,n)}He();
