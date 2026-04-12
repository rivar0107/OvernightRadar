(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))l(n);new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function a(n){const s={};return n.integrity&&(s.integrity=n.integrity),n.referrerPolicy&&(s.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?s.credentials="include":n.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function l(n){if(n.ep)return;n.ep=!0;const s=a(n);fetch(n.href,s)}})();function A(e,t){e.querySelectorAll(".tab-item").forEach(a=>{a.addEventListener("click",()=>{const l=a.dataset.view;t(l)})})}function R(e){const t=document.getElementById("tab-nav");t&&t.querySelectorAll(".tab-item").forEach(a=>{a.classList.toggle("active",a.dataset.view===e)})}const x="/OvernightRadar/data/";async function M(e,t=7){const a=[],l=new Date;for(let n=0;n<t;n++){const s=new Date(l);s.setDate(s.getDate()-n),a.push(C(s))}for(const n of a)try{const s=await fetch(`${x}${e}/${n}.json`);if(s.ok)return await s.json()}catch{}return null}function C(e){const t=e.getFullYear(),a=String(e.getMonth()+1).padStart(2,"0"),l=String(e.getDate()).padStart(2,"0");return`${t}-${a}-${l}`}function B(){return M("watchlist")}function D(){return M("results")}const k={4:{label:"🔴 强烈看多",cssClass:"sentiment-label-4"},3:{label:"🔴 偏多",cssClass:"sentiment-label-3"},2:{label:"⚪ 中性",cssClass:"sentiment-label-2"},1:{label:"🟢 偏空",cssClass:"sentiment-label-1"},0:{label:"🟢 强烈看空",cssClass:"sentiment-label-0"}};function E(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function F(e){const t=e.us_change_pct>=0?"up":"down",a=k[e.sentiment_level]||k[2],l=e.relative_strength>=0?"跑赢大盘":"跑输大盘",n=e.relative_strength>=0?"+":"",s=e.volatility.is_abnormal?`异常波动 ${e.volatility.vol_multiple}σ`:"正常波动";let i="平盘";e.trend.direction==="up"&&e.trend.consecutive_days>0?i=`连涨${e.trend.consecutive_days}天+${e.trend.cumulative_pct}%`:e.trend.direction==="down"&&e.trend.consecutive_days>0&&(i=`连跌${e.trend.consecutive_days}天${e.trend.cumulative_pct}%`);const r=e.supply_chain.map(c=>{const m=c.change_pct!==null&&c.change_pct!==void 0?c.change_pct>=0?"up":"down":"na";return`<div class="stock-item">
      <span class="stock-name">${c.name}(${c.code})</span>
      <span class="stock-change ${m}">${E(c.change_pct)}</span>
    </div>`}).join("");let d="";return e.cn_etf_code&&(d=`<span class="card-cn-etf">${e.cn_etf_name}(${e.cn_etf_code})</span>`),`
    <div class="card sentiment-${e.sentiment_level}">
      <div class="card-sentiment ${a.cssClass}">${a.label}</div>
      <div class="card-header">
        <span class="card-us">${e.us_etf} ${e.us_name}</span>
        <span class="card-change ${t}">${E(e.us_change_pct)}</span>
      </div>
      <div class="card-detail">
        <span class="card-rs">${l}${n}${e.relative_strength.toFixed(1)}%</span>
      </div>
      <div class="card-detail">${s} · ${i}</div>
      <div class="card-cn">→ A股${e.cn_name} ${d}</div>
      <div class="card-stocks">${r}</div>
    </div>
  `}function N(e){return e==null?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}async function O(e,t){const a=await D();if(!a){e.innerHTML='<p class="empty-state">暂无雷达数据</p>',t.innerHTML=`
      <h1 class="title">隔夜雷达</h1>
      <p class="slogan">昨夜美股异动，今日A股看点</p>
    `;return}const l={sp500:"标普",nasdaq:"纳指",dow:"道指"};let n="";for(const[s,i]of Object.entries(l))if(a.market_indices&&a.market_indices[s]){const r=a.market_indices[s].change_pct,d=r>=0?"up":"down";n+=`<span class="index-item">${i}<span class="${d}">${N(r)}</span></span>`}t.innerHTML=`
    <h1 class="title">隔夜雷达</h1>
    <p class="slogan">昨夜美股异动，今日A股看点</p>
    <div class="market-indices">${n}</div>
    <p class="date">${a.market_summary} · ${a.date} ${a.weekday}</p>
  `,!a.sectors||a.sectors.length===0?e.innerHTML='<p class="empty-state">暂无板块数据</p>':e.innerHTML=a.sectors.map(F).join(""),e.innerHTML+=`
    <footer class="disclaimer">
      <p class="disclaimer-title">⚠️ 免责声明</p>
      <p>本工具仅供数据参考，不构成任何投资建议或投资指导。</p>
      <p>数据来源：Yahoo Finance、AKShare、公开市场数据。</p>
      <p>股市有风险，投资需谨慎。</p>
    </footer>
  `}function V(e){return e==null||isNaN(e)?"#e8e8e8":e>=5?"#1b7a1b":e>=2?"#3ba53b":e>=.5?"#81c784":e>0?"#c8e6c9":e===0?"#e8e8e8":e>-.5?"#ffcdd2":e>-2?"#e57373":e>-5?"#d32f2f":"#b71c1c"}function W(e,t){return t==="change_pct"?e.change_pct:e.rel&&t in e.rel?e.rel[t]:null}function j(e){return e==null||isNaN(e)?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function q(e,t){const a=W(e,t),l=V(a),n=j(a),s=e.has_cn_mapping?'<span class="wl-cn-badge" title="有A股映射">A</span>':"";return`
    <div class="wl-block" data-ticker="${e.ticker}" style="background-color: ${l}">
      <span class="wl-block-ticker">${e.ticker}</span>
      <span class="wl-block-value">${n}</span>
      ${s}
    </div>
  `}function P(e,t){for(const a of Object.values(e)){if(!a.etfs)continue;const l=a.etfs.find(n=>n.ticker===t);if(l)return l}return null}function U(e,t,a,l){const n=t.map(s=>`<button class="wl-tab${s.key===a?" active":""}" data-key="${s.key}">${s.label}</button>`).join("");e.innerHTML=n,e.querySelectorAll(".wl-tab").forEach(s=>{s.addEventListener("click",()=>{const i=s.dataset.key;i!==a&&(e.querySelectorAll(".wl-tab").forEach(r=>r.classList.remove("active")),s.classList.add("active"),l(i))})})}function Y(e,t,a={}){if(!t||t.length<2)return;const l=e.getContext("2d"),n=a.width||e.width||300,s=a.height||e.height||80;e.width=n,e.height=s;const i=Math.min(...t),d=Math.max(...t)-i||1,c=2,m=n-c*2,y=s-c*2,$=t[0],v=t[t.length-1],S=v>=$?"#2e7d32":"#c62828";l.clearRect(0,0,n,s),l.beginPath(),l.strokeStyle=S,l.lineWidth=1.5,l.lineJoin="round";for(let u=0;u<t.length;u++){const _=c+u/(t.length-1)*m,b=c+y-(t[u]-i)/d*y;u===0?l.moveTo(_,b):l.lineTo(_,b)}l.stroke();const g=l.createLinearGradient(0,0,0,s);g.addColorStop(0,v>=$?"rgba(46,125,50,0.15)":"rgba(198,40,40,0.15)"),g.addColorStop(1,"rgba(255,255,255,0)"),l.lineTo(c+m,s),l.lineTo(c,s),l.closePath(),l.fillStyle=g,l.fill()}let h=null;function p(e){return e==null||isNaN(e)?"—":`${e>=0?"+":""}${e.toFixed(2)}%`}function I(e,t){if(!t)return;if(!e){t.style.display="none",h=null;return}if(h===e.ticker){t.style.display="none",h=null;return}h=e.ticker;const a=e.rel?`
      <div class="wl-rel-grid">
        <div class="wl-rel-item"><span class="wl-rel-label">REL5</span><span class="wl-rel-value">${p(e.rel.rel_5)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL20</span><span class="wl-rel-value">${p(e.rel.rel_20)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL60</span><span class="wl-rel-value">${p(e.rel.rel_60)}</span></div>
        <div class="wl-rel-item"><span class="wl-rel-label">REL120</span><span class="wl-rel-value">${p(e.rel.rel_120)}</span></div>
      </div>
    `:"",l=e.has_cn_mapping?`
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
      <span class="wl-detail-change">${p(e.change_pct)}</span>
      <span class="wl-detail-ytd">YTD: ${p(e.ytd)}</span>
    </div>
    <canvas id="sparkline-canvas" width="300" height="80"></canvas>
    ${a}
    ${l}
  `,t.style.display="block",document.getElementById("wl-detail-close").addEventListener("click",()=>{t.style.display="none",h=null});const n=document.getElementById("sparkline-canvas");if(n&&e.price){const s=G(e);Y(n,s,{width:n.parentElement.clientWidth-32})}t.scrollIntoView({behavior:"smooth",block:"nearest"})}function G(e){const t=e.price/(1+e.change_pct/100),a=20,l=[];for(let n=0;n<=a;n++){const s=(Math.random()-.5)*t*.01,i=e.change_pct/100*t*(n/a);l.push(t+i+s)}return l}const z=[{key:"change_pct",label:"1D%"},{key:"rel_5",label:"REL5"},{key:"rel_20",label:"REL20"},{key:"rel_60",label:"REL60"},{key:"rel_120",label:"REL120"}],J=["broad","equal_weighted","market_cap_weighted","factors","growth","thematic","ark"];let f="change_pct",o=null;async function K(e,t){if(o||(o=await B()),!o){t.innerHTML=`
      <h1 class="title">市场观察表</h1>
      <p class="slogan">Market Watchlist · 美股 ETF 相对强度热力图</p>
    `,e.innerHTML='<p class="empty-state">暂无热力图数据</p>';return}t.innerHTML=`
    <h1 class="title">市场观察表</h1>
    <p class="slogan">Market Watchlist · 美股 ETF 相对强度热力图</p>
    <p class="date">更新时间: ${o.updated_at||o.date}</p>
  `;const a='<nav class="wl-indicators" id="wl-indicators"></nav>',l='<div id="wl-heatmap"></div>',n='<section id="wl-detail" class="wl-detail" style="display:none"></section>',s=`
    <footer class="disclaimer">
      <p class="disclaimer-title">⚠️ 免责声明</p>
      <p>本工具仅供数据参考，不构成任何投资建议。</p>
      <p>数据来源：TheMarketMemo Market Watchlist、Yahoo Finance。</p>
      <p>REL (相对强度) = ETF 涨跌幅 - 标普500 涨跌幅。</p>
    </footer>
  `;e.innerHTML=a+l+n+s,U(document.getElementById("wl-indicators"),z,f,i=>{f=i,L(document.getElementById("wl-heatmap"),o.groups,f)}),L(document.getElementById("wl-heatmap"),o.groups,f),I(null,null)}function L(e,t,a){if(!t){e.innerHTML='<p class="empty-state">暂无数据</p>';return}let l="";for(const n of J){const s=t[n];!s||!s.etfs||s.etfs.length===0||(l+=`
      <div class="wl-group">
        <h2 class="wl-group-title">${s.display_name}</h2>
        <div class="wl-blocks">
          ${s.etfs.map(i=>q(i,a)).join("")}
        </div>
      </div>
    `)}e.innerHTML=l,e.querySelectorAll(".wl-block").forEach(n=>{n.addEventListener("click",()=>{const s=n.dataset.ticker,i=P(t,s);if(i){const r=document.getElementById("wl-detail");I(i,r)}})})}const T={heatmap:K,radar:O},w="heatmap";async function Q(){const e=document.getElementById("app"),t=document.getElementById("loading"),a=document.getElementById("error"),l=document.getElementById("tab-nav");try{A(l,n=>{window.location.hash=`#/${n}`}),window.addEventListener("hashchange",()=>H()),await H(),t.style.display="none",e.style.display="block",l.style.display="flex"}catch(n){console.error("Failed to initialize app:",n),t.style.display="none",a.style.display="block"}}async function H(){const t=(window.location.hash||"").replace("#/","")||w;if(!T[t]){console.warn(`Unknown view: ${t}, falling back to ${w}`),window.location.hash=`#/${w}`;return}const a=document.getElementById("view-container"),l=document.getElementById("app-header");R(t),await T[t](a,l)}Q();
