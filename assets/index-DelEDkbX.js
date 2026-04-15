(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const l of n)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const l={};return n.integrity&&(l.integrity=n.integrity),n.referrerPolicy&&(l.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?l.credentials="include":n.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function s(n){if(n.ep)return;n.ep=!0;const l=a(n);fetch(n.href,l)}})();function le(e,t){e.querySelectorAll(".tab-item").forEach(a=>{a.addEventListener("click",()=>{const s=a.dataset.view;t(s)})})}function ie(e){const t=document.getElementById("tab-nav");t&&t.querySelectorAll(".tab-item").forEach(a=>{a.classList.toggle("active",a.dataset.view===e)})}const oe={BASE_URL:"/OvernightRadar/",DEV:!1,MODE:"production",PROD:!0,SSR:!1};let V="../data/";try{import.meta&&oe&&(V="/OvernightRadar/data/")}catch{}console.log("[Data] BASE_URL:",V);async function C(e,t=7){const a=[],s=new Date;for(let n=0;n<t;n++){const l=new Date(s);l.setDate(l.getDate()-n),a.push(ce(l))}for(const n of a)try{const l=await fetch(`${V}${e}/${n}.json`);if(l.ok)return await l.json()}catch(l){console.warn(`Failed to fetch ${e}/${n}.json:`,l)}return null}function ce(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),s=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${s}`}function z(){return C("watchlist")}function re(){return C("results")}async function j(){console.log("[Data] Fetching CN watchlist data...");const e=await C("cn_watchlist");return console.log("[Data] CN watchlist data:",e?`${e.total_sectors} sectors`:"null"),e}async function de(e={}){try{const t=await C("signals");if(!t||!t.signals)return{signals:[],metadata:null};let a=[...t.signals];if(e.direction&&e.direction!=="all"){const n={bullish:"利多",bearish:"利空"}[e.direction]||e.direction;a=a.filter(l=>l.direction===n)}return e.confidence&&e.confidence!=="all"&&(a=a.filter(s=>{var i;return(((i=s.level)==null?void 0:i.toLowerCase())||"")==={high:"高",medium:"中",low:"低"}[e.confidence]||s.level===e.confidence})),e.type&&e.type!=="all"&&(a=a.filter(s=>s.type===e.type)),{signals:a,metadata:t.metadata||null,generated_at:t.generated_at||null}}catch(t){return console.error("获取信号数据失败:",t),{signals:[],metadata:null,generated_at:null}}}async function ue(){try{const e=await C("signals");return(e==null?void 0:e.signal_history)||[]}catch(e){return console.error("获取信号历史失败:",e),[]}}const N={4:{label:"强烈看多",cssClass:"sentiment-label-4"},3:{label:"偏多",cssClass:"sentiment-label-3"},2:{label:"中性",cssClass:"sentiment-label-2"},1:{label:"偏空",cssClass:"sentiment-label-1"},0:{label:"强烈看空",cssClass:"sentiment-label-0"}};function F(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function D(e){const t=e.us_change_pct>=0?"up":"down",a=N[e.sentiment_level]||N[2],s=e.relative_strength>=0?"跑赢大盘":"跑输大盘",n=e.relative_strength>=0?"up":"down",l=e.volatility.is_abnormal?`异常波动 ${e.volatility.vol_multiple}x`:"正常波动";let i="平盘";e.trend.direction==="up"&&e.trend.consecutive_days>0?i=`连涨${e.trend.consecutive_days}天 +${e.trend.cumulative_pct}%`:e.trend.direction==="down"&&e.trend.consecutive_days>0&&(i=`连跌${e.trend.consecutive_days}天 ${e.trend.cumulative_pct}%`);const r=e.supply_chain.map(c=>{const u=c.change_pct!==null&&c.change_pct!==void 0?c.change_pct>=0?"up":"down":"na";return`<div class="stock-item">
      <span class="stock-name">${c.name}</span>
      <span class="stock-change ${u}">${F(c.change_pct)}</span>
    </div>`}).join("");let o="";return e.cn_etf_code&&(o=`<span class="card-cn-etf">${e.cn_etf_name}(${e.cn_etf_code})</span>`),`
    <div class="card sentiment-${e.sentiment_level}">
      <div class="card-sentiment ${a.cssClass}">${a.label}</div>
      <div class="card-header">
        <span class="card-us">${e.us_name} <span style="color:var(--color-muted);font-weight:400">${e.us_etf}</span></span>
        <span class="card-change ${t}">${F(e.us_change_pct)}</span>
      </div>
      <div class="card-detail">
        <span class="card-rs ${n}">${s} ${e.relative_strength>=0?"+":""}${e.relative_strength.toFixed(1)}%</span>
      </div>
      <div class="card-detail">${l} / ${i}</div>
      <div class="card-cn">A 股映射: ${e.cn_name} ${o}</div>
      <div class="card-stocks">${r}</div>
    </div>
  `}const O={强:{label:"强",cssClass:"signal-strong"},中:{label:"中",cssClass:"signal-medium"},弱:{label:"弱",cssClass:"signal-weak"}},q={利多:{cssClass:"dir-bullish"},利空:{cssClass:"dir-bearish"}};function J(e,t=null){const a=O[e.level]||O.中,s=q[e.direction]||q.利多,n=e.sectors?e.sectors.map(u=>`<span class="signal-sector">${u}</span>`).join(""):"",l=e.targets&&e.targets.length>0?`<div class="signal-targets">目标: ${e.targets.join(", ")}</div>`:"",i=e.source_news?`<div class="signal-source">${e.source_news.source} · ${pe(e.source_news.datetime)}</div>`:"",r=e.score!==void 0?`<span class="signal-score">评分 ${e.score}<span class="signal-score-bar"><span class="signal-score-bar-fill" style="width:${e.score}%"></span></span></span>`:"",o=t?`<span class="signal-time">${me(t)}</span>`:"",c=r||o?`<div class="signal-footer">${r}${o}</div>`:"";return`
    <div class="signal-card ${a.cssClass}">
      <div class="signal-header">
        <span class="signal-badge ${s.cssClass}">${a.label}级 ${e.direction}</span>
        <h3 class="signal-title">${e.title}</h3>
      </div>

      <div class="signal-meta">
        <span class="signal-direction ${s.cssClass}">${e.direction}</span>
        ${n}
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
  `}function pe(e){if(!e)return"";const t=new Date(e*1e3),s=Math.floor((new Date-t)/1e3/60);return s<60?`${s}分钟前`:s<1440?`${Math.floor(s/60)}小时前`:`${Math.floor(s/1440)}天前`}function me(e){if(!e)return"";try{const t=new Date(e),a=t.getFullYear(),s=String(t.getMonth()+1).padStart(2,"0"),n=String(t.getDate()).padStart(2,"0"),l=String(t.getHours()).padStart(2,"0"),i=String(t.getMinutes()).padStart(2,"0");return`${a}-${s}-${n} ${l}:${i}`}catch{return e}}const E=10;let p={allSignals:[],displayedCount:E,sortBy:"time",isLoading:!1};function K(e,t){const a=[...e];switch(t){case"time":a.sort((l,i)=>{const r=new Date(l.generated_at||0).getTime();return new Date(i.generated_at||0).getTime()-r});break;case"confidence":const s={high:3,medium:2,low:1};a.sort((l,i)=>s[i.confidence]-s[l.confidence]);break;case"level":const n={strong:3,medium:2,weak:1};a.sort((l,i)=>n[i.level]-n[l.level]);break}return a}function he(e){return e<=0?`
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
  `}function P(e=3){return`
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
  `}async function ge(e,t={}){const{filters:a={}}=t;try{const{signals:s,metadata:n,generated_at:l}=await de(a),i=await ue();if(p.allSignals=s||[],p.displayedCount=E,p.sortBy="time",!s||s.length===0){ve(e);return}Q(e,l),Z(e)}catch(s){console.error("Failed to render signals view:",s),e.innerHTML=`
      <div class="signals-view">
        <div class="signals-error">
          <p class="error-state">加载信号数据失败</p>
          <p class="error-detail">${s.message}</p>
        </div>
      </div>
    `}}function ve(e){e.innerHTML=`
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
  `}function Q(e,t=null){const a=K(p.allSignals,p.sortBy),s=a.slice(0,p.displayedCount),n=a.length-p.displayedCount;e.innerHTML=`
    <div class="signals-view">
      <div class="signals-list" id="signals-list">
        ${s.map(l=>J(l,t)).join("")}
      </div>
      ${he(n)}
    </div>
  `}function X(){if(p.isLoading)return;p.isLoading=!0;const e=document.getElementById("load-more-signals"),t=document.getElementById("signals-list");e&&(e.classList.add("loading"),e.disabled=!0,e.innerHTML=`
      <div class="spinner"></div>
      <span class="btn-text">加载中...</span>
    `),setTimeout(()=>{p.displayedCount+=E;const a=K(p.allSignals,p.sortBy),s=a.slice(p.displayedCount-E,p.displayedCount);t&&s.forEach(r=>{const o=document.createElement("div");o.innerHTML=J(r,null),t.appendChild(o.firstElementChild)});const n=a.length-p.displayedCount,l=document.querySelector(".load-more-container");l&&(n<=0?l.outerHTML=`
          <div class="load-more-done">
            <span class="done-text">已加载全部内容</span>
          </div>
        `:l.innerHTML=`
          <button class="load-more-btn" id="load-more-signals">
            <span class="btn-text">加载更多</span>
            <span class="btn-count">(剩余 ${n})</span>
          </button>
        `),p.isLoading=!1;const i=document.getElementById("load-more-signals");i&&i.addEventListener("click",X)},300)}function Z(e){const t=document.getElementById("load-more-signals");t&&t.addEventListener("click",X);const a=document.getElementById("signals-sort");a&&a.addEventListener("change",s=>{p.sortBy=s.target.value,p.displayedCount=E,Q(e,null),Z(e)})}const L=8;let d={allSectors:[],displayedCount:L,sortBy:"change",isLoading:!1};function R(e,t){const a=[...e];switch(t){case"change":a.sort((n,l)=>Math.abs(l.change_pct)-Math.abs(n.change_pct));break;case"sentiment":const s={strong:3,neutral:2,weak:1};a.sort((n,l)=>s[l.sentiment]-s[n.sentiment]);break;case"volatility":a.sort((n,l)=>(l.volatility||0)-(n.volatility||0));break}return a}function fe(e=4){return`
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
  `}function ee(e){return e<=0?`
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
  `}function we(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function ye(e){if(!e)return"";const t=e.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):/);if(t){const[,a,s,n,l,i]=t;return`${a}-${s}-${n} ${l}:${i}`}return e}function ke(e="sectors"){return`
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
  `,label:"信号"}].map(n=>`
        <button class="radar-tab ${n.key===e?"active":""}" data-tab="${n.key}">
          <span class="radar-tab-icon">${n.icon}</span>
          <span class="radar-tab-label">${n.label}</span>
        </button>
      `).join("")}
    </div>
  `}async function $e(e){const t=document.createElement("div");try{return await ge(t),`<div class="radar-content">${t.innerHTML}</div>`}catch(a){return console.error("渲染信号视图失败:",a),'<div class="radar-content"><p class="empty-state">信号视图加载失败</p></div>'}}function U(e){const t=`
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
    `;d.allSectors=e.sectors,d.displayedCount=L,d.sortBy="change";const a=R(d.allSectors,d.sortBy),s=a.slice(0,d.displayedCount),n=a.length-d.displayedCount;return`
    <div class="radar-content" id="sectors-content">
      ${t}
      <div class="sectors-list" id="sectors-list">
        ${s.map(D).join("")}
      </div>
      ${ee(n)}
    </div>
  `}function te(){if(d.isLoading)return;d.isLoading=!0;const e=document.getElementById("load-more-sectors"),t=document.getElementById("sectors-list");e&&(e.classList.add("loading"),e.disabled=!0,e.innerHTML=`
      <div class="spinner"></div>
      <span class="btn-text">加载中...</span>
    `),setTimeout(()=>{d.displayedCount+=L;const a=R(d.allSectors,d.sortBy),s=a.slice(d.displayedCount-L,d.displayedCount);t&&s.forEach(r=>{const o=document.createElement("div");o.innerHTML=D(r),t.appendChild(o.firstElementChild)});const n=a.length-d.displayedCount,l=document.querySelector(".load-more-container");l&&(n<=0?l.outerHTML=`
          <div class="load-more-done">
            <span class="done-text">已加载全部内容</span>
          </div>
        `:l.innerHTML=`
          <button class="load-more-btn" id="load-more-sectors">
            <span class="btn-text">加载更多</span>
            <span class="btn-count">(剩余 ${n})</span>
          </button>
        `),d.isLoading=!1;const i=document.getElementById("load-more-sectors");i&&i.addEventListener("click",te)},300)}function A(){const e=document.getElementById("load-more-sectors");e&&e.addEventListener("click",te);const t=document.getElementById("sectors-sort");t&&t.addEventListener("change",()=>{d.sortBy=t.value,d.displayedCount=L;const a=R(d.allSectors,d.sortBy),s=a.slice(0,d.displayedCount),n=a.length-d.displayedCount,l=document.getElementById("sectors-list");l&&(l.innerHTML=s.map(D).join(""));const i=document.querySelector(".load-more-container");i&&(i.outerHTML=ee(n)),A()})}async function be(e,t,a="sectors"){const s=await re();if(!s){e.innerHTML='<p class="empty-state">暂无雷达数据</p>',t.innerHTML=`
      <h1 class="title">隔夜雷达</h1>
      <p class="slogan">昨夜美股异动，今日A股看点</p>
    `;return}const n={sp500:"标普500",nasdaq:"纳斯达克",dow:"道琼斯"};let l="";for(const[o,c]of Object.entries(n))if(s.market_indices&&s.market_indices[o]){const u=s.market_indices[o].change_pct,m=u>=0?"up":"down",h=u>=0?'<svg class="icon icon-sm" style="color: var(--color-bull);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>':'<svg class="icon icon-sm" style="color: var(--color-bear);" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline><polyline points="17 18 23 18 23 12"></polyline></svg>';l+=`<span class="index-item">${h} ${c}<span class="${m}">${we(u)}</span></span>`}t.innerHTML=`
    <h1 class="title">隔夜雷达</h1>
    <p class="slogan">昨夜美股异动，今日A股看点</p>
    <div class="market-indices">${l}</div>
    <p class="date">${s.market_summary} · ${ye(s.updated_at)}</p>
  `;async function i(o){switch(o){case"signals":return await $e();case"sectors":return U(s);default:return U(s)}}const r=await i(a);e.innerHTML=ke(a)+r,e.querySelectorAll(".radar-tab").forEach(o=>{o.addEventListener("click",async()=>{const c=o.dataset.tab;e.querySelectorAll(".radar-tab").forEach(m=>{m.classList.toggle("active",m.dataset.tab===c)});const u=e.querySelector(".radar-content");u&&(c==="sectors"?u.innerHTML=fe(4):c==="signals"&&(u.innerHTML=P?P(3):'<div class="loading"><div class="loading-spinner"></div></div>'),setTimeout(async()=>{const m=await i(c),h=m.match(/<div class="radar-content">([\s\S]*)<\/div>/);u.innerHTML=h?h[1]:m,c==="sectors"&&A()},200))})}),a==="sectors"&&A()}function _e(e,t=!1){return e==null||isNaN(e)||e===0?"#334155":e>0?"#d32f2f":"#2e7d32"}function Se(e,t){return t==="change_pct"?e.change_pct:e.rel&&t in e.rel?e.rel[t]:null}function Ee(e){return e==null||isNaN(e)?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function Le(e,t,a=!1){const s=Se(e,t),n=_e(s,a),l=Ee(s),i=e.code||e.ticker,r=e.name||"",o=!a&&e.has_cn_mapping?'<span class="wl-cn-badge" title="有A股映射">A</span>':"";return`
    <div class="wl-block${a?" cn":""}" data-code="${i}" style="background-color: ${n}">
      <span class="wl-block-ticker">${i}</span>
      <span class="wl-block-name">${r}</span>
      <span class="wl-block-value">${l}</span>
      ${o}
    </div>
  `}function Ce(e,t){for(const a of Object.values(e)){if(a.etfs){const s=a.etfs.find(n=>n.ticker===t);if(s)return s}if(a.sectors){const s=a.sectors.find(n=>n.code===t);if(s)return s}}return null}function Me(e,t,a,s){let n=a;const l=t.find(o=>o.key===a),i=l?l.desc:"",r=t.map(o=>`<button class="wl-indicator-btn${o.key===a?" active":""}" data-key="${o.key}">${o.label}</button>`).join("");e.innerHTML=`
    <div class="wl-indicators-row">${r}</div>
    <p class="wl-indicator-desc">${i}</p>
  `,e.querySelectorAll(".wl-indicator-btn").forEach(o=>{o.addEventListener("click",()=>{const c=o.dataset.key;if(c===n)return;n=c,e.querySelectorAll(".wl-indicator-btn").forEach(h=>h.classList.remove("active")),o.classList.add("active");const u=t.find(h=>h.key===c),m=e.querySelector(".wl-indicator-desc");m&&u&&(m.textContent=u.desc),s(c)})})}function Te(e,t,a={}){if(!t||t.length<2)return;const s=e.getContext("2d"),n=a.width||e.width||300,l=a.height||e.height||80;e.width=n,e.height=l;const i=Math.min(...t),o=Math.max(...t)-i||1,c=2,u=n-c*2,m=l-c*2,h=t[0],M=t[t.length-1],T=M>=h?"#2e7d32":"#c62828";s.clearRect(0,0,n,l),s.beginPath(),s.strokeStyle=T,s.lineWidth=1.5,s.lineJoin="round";for(let v=0;v<t.length;v++){const $=c+v/(t.length-1)*u,g=c+m-(t[v]-i)/o*m;v===0?s.moveTo($,g):s.lineTo($,g)}s.stroke();const y=s.createLinearGradient(0,0,0,l);y.addColorStop(0,M>=h?"rgba(46,125,50,0.15)":"rgba(198,40,40,0.15)"),y.addColorStop(1,"rgba(255,255,255,0)"),s.lineTo(c+u,l),s.lineTo(c,l),s.closePath(),s.fillStyle=y,s.fill()}let _=null;function k(e){return e==null||isNaN(e)?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function ne(e,t){if(!t)return;if(!e){t.style.display="none",_=null;return}if(_===e.ticker){t.style.display="none",_=null;return}_=e.ticker;const a=e.rel?`
      <div class="wl-rel-grid">
        <div class="wl-rel-item"><span class="wl-rel-label">REL5</span><span class="wl-rel-value">${k(e.rel.rel_5)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL20</span><span class="wl-rel-value">${k(e.rel.rel_20)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL60</span><span class="wl-rel-value">${k(e.rel.rel_60)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL120</span><span class="wl-rel-value">${k(e.rel.rel_120)}</span></div>
      </div>
    `:"",s=e.has_cn_mapping?`
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
      <span class="wl-detail-change">${k(e.change_pct)}</span>
      <span class="wl-detail-ytd">YTD: ${k(e.ytd)}</span>
    </div>
    <canvas id="sparkline-canvas" width="300" height="80"></canvas>
    ${a}
    ${s}
  `,t.style.display="block",document.getElementById("wl-detail-close").addEventListener("click",()=>{t.style.display="none",_=null});const n=document.getElementById("sparkline-canvas");n&&e.history&&e.history.length>=2&&Te(n,e.history,{width:n.parentElement.clientWidth-32}),t.scrollIntoView({behavior:"smooth",block:"nearest"})}function W(e){if(!e)return"";const t=e.match(/(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):/);if(t){const[,a,s,n,l,i]=t;return`${a}-${s}-${n} ${l}:${i}`}return e}const Be=[{key:"change_pct",label:"日涨跌",desc:"当日涨跌幅 (%)"},{key:"rel_5",label:"5日强弱",desc:"近5日相对标普500的超额收益"},{key:"rel_20",label:"20日强弱",desc:"近20日(约1月)相对标普500的超额收益"},{key:"rel_60",label:"60日强弱",desc:"近60日(约1季)相对标普500的超额收益"},{key:"rel_120",label:"120日强弱",desc:"近120日(约半年)相对标普500的超额收益"}];let S="change_pct",B="us",w=null,f=null,H=null;const He=10*60*1e3;function xe(e,t,a){const s=[{key:"us",label:"美股"},{key:"cn",label:"A股"}];e.innerHTML=`
    <div class="wl-market-switcher">
      ${s.map(n=>`
        <button
          class="wl-market-btn ${n.key===t?"active":""}"
          data-market="${n.key}"
        >
          ${n.label}
        </button>
      `).join("")}
    </div>
  `,e.querySelectorAll(".wl-market-btn").forEach(n=>{n.addEventListener("click",()=>{const l=n.dataset.market;console.log("[MarketSwitcher] Button clicked:",l),a(l)})})}async function Ie(e,t){console.log("[HeatmapView] renderHeatmapView called"),w||(console.log("[HeatmapView] Loading US data..."),w=await z(),console.log("[HeatmapView] US data loaded:",w?`${w.total_etfs} etfs`:"null")),console.log("[HeatmapView] Rendering US market view"),await se(e,t,"us")}async function se(e,t,a,s=null){var T,y,v,$;console.log("[MarketView] Switching to market:",a),B=a;const n=a==="cn",l=n?"A股":"美股";t.innerHTML=`
    <h1 class="title">市场观察表</h1>
    <p class="slogan">正在加载${l}数据...</p>
  `,e.innerHTML='<p class="empty-state">加载中...</p>';let i;if(a==="us"?(console.log("[MarketView] Loading US data..."),w||(w=await z()),i=w):(console.log("[MarketView] Loading CN data..."),f||(f=await j()),i=f),console.log("[MarketView] Data loaded:",i?`${i.total_sectors||"?"} sectors`:"null"),!i){t.innerHTML=`
      <h1 class="title">市场观察表</h1>
      <p class="slogan">暂无数据</p>
    `,e.innerHTML='<p class="empty-state">暂无数据</p>';return}const r=W(i.updated_at);t.innerHTML=`
    <div class="wl-header-top">
      <div>
        <h1 class="title">市场观察表</h1>
        <p class="slogan">
          Market Watchlist ·
          ${n?"A股申万板块相对强度热力图":"美股 ETF 相对强度热力图"}
        </p>
        <p class="date">更新时间: ${r||i.date}</p>
      </div>
    </div>
  `;const o='<div id="wl-market-switcher" class="wl-market-switcher-top"></div>',c=`
    <div class="disclaimer wl-top-disclaimer">
      <p>仅供数据参考，不构成投资建议。数据来源：${n?"AkShare":"TheMarketMemo、Yahoo Finance"}。</p>
      <p>REL (相对强度) = ${n?"行业":"ETF"}涨跌幅 - ${n?"基准指数":"标普500"}涨跌幅，正值表示跑赢大盘。</p>
    </div>
  `,u=`
    <div class="wl-main-layout">
      <div class="wl-right-content">
        ${o}
        <nav class="wl-indicators" id="wl-indicators"></nav>
        <div id="wl-heatmap"></div>
      </div>
    </div>
  `,m='<section id="wl-detail" class="wl-detail" style="display:none"></section>';e.innerHTML=c+u+m;const h=document.getElementById("wl-market-switcher");xe(h,B,g=>{h.querySelectorAll(".wl-market-btn").forEach(b=>{b.classList.toggle("active",b.dataset.market===g)}),se(e,t,g)});const M=n?[{key:"change_pct",label:"日涨跌",desc:"当日涨跌幅 (%)",hasBenchmark:!0},{key:"rel_5",label:"5日强弱",desc:`近5日相对${((T=i.benchmark)==null?void 0:T.name)||"沪深300"}的超额收益`},{key:"rel_20",label:"20日强弱",desc:`近20日(约1月)相对${((y=i.benchmark)==null?void 0:y.name)||"沪深300"}的超额收益`},{key:"rel_60",label:"60日强弱",desc:`近60日(约1季)相对${((v=i.benchmark)==null?void 0:v.name)||"沪深300"}的超额收益`},{key:"rel_120",label:"120日强弱",desc:`近120日(约半年)相对${(($=i.benchmark)==null?void 0:$.name)||"沪深300"}的超额收益`}]:Be;Me(document.getElementById("wl-indicators"),M,S,g=>{S=g,x(document.getElementById("wl-heatmap"),i.groups,S,n)}),x(document.getElementById("wl-heatmap"),i.groups,S,n),ne(null,null),H&&clearInterval(H),n&&(H=setInterval(async()=>{if(console.log("[MarketView] A股自动刷新..."),f=await j(),f&&B==="cn"){const g=document.getElementById("wl-heatmap");g&&x(g,f.groups,S,!0);const b=document.querySelector(".wl-header-top .date");if(b){const ae=W(f.updated_at);b.textContent=`更新时间: ${ae||f.date}`}}},He)),console.log("[MarketView] Render complete for market:",a)}function x(e,t,a,s=!1){if(!t){e.innerHTML='<p class="empty-state">暂无数据</p>';return}let n="";for(const l of Object.keys(t)){const i=t[l],r=i.etfs||i.sectors;!r||r.length===0||(n+=`
      <div class="wl-group">
        <h2 class="wl-group-title">${i.display_name}</h2>
        <div class="wl-blocks">
          ${r.map(o=>Le(o,a,s)).join("")}
        </div>
      </div>
    `)}e.innerHTML=n,e.querySelectorAll(".wl-block").forEach(l=>{l.addEventListener("click",()=>{const i=l.dataset.code||l.dataset.ticker,r=Ce(t,i);if(r){const o=document.getElementById("wl-detail");ne(r,o)}})})}console.log("[Main] App starting...");const G={heatmap:Ie,radar:be},I="heatmap";async function Ae(){const e=document.getElementById("app"),t=document.getElementById("loading"),a=document.getElementById("error"),s=document.getElementById("tab-nav");try{le(s,n=>{window.location.hash=`#/${n}`}),window.addEventListener("hashchange",()=>Y()),await Y(),t.style.display="none",e.style.display="block",s.style.display="flex"}catch(n){console.error("Failed to initialize app:",n),t.style.display="none",a.style.display="block"}}async function Y(){const t=(window.location.hash||"").replace("#/","")||I;if(!G[t]){console.warn(`Unknown view: ${t}, falling back to ${I}`),window.location.hash=`#/${I}`;return}const a=document.getElementById("view-container"),s=document.getElementById("app-header");ie(t),await G[t](a,s)}Ae();
