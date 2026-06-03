import{j as e}from"./jsx-runtime.TBa3i5EZ.js";import{r as l}from"./index.CVf8TyFT.js";const n=[{id:"macro",name:"Loom Macro",color:"#f97316",sizeMb:8,shipped:!0,desc:"Node-based macro scripting"},{id:"scheduler",name:"Loom Scheduler",color:"#8b5cf6",sizeMb:6,shipped:!1,desc:"Time-aware task orchestration"},{id:"cookbook",name:"Loom Cookbook",color:"#10b981",sizeMb:5,shipped:!1,desc:"Personal command recipe book"},{id:"hardware",name:"Loom Hardware",color:"#3b82f6",sizeMb:7,shipped:!1,desc:"Hardware monitoring & control"},{id:"developer",name:"Loom Developer",color:"#f59e0b",sizeMb:5,shipped:!1,desc:"Developer utilities suite"},{id:"finance",name:"Loom Finance",color:"#22d3ee",sizeMb:6,shipped:!1,desc:"Local-first personal finance"}];function x(){const[o,d]=l.useState(new Set(["macro"])),[t,i]=l.useState(!1),c=s=>{d(r=>{const a=new Set(r);return a.has(s)?a.delete(s):a.add(s),a}),i(!1)},p=n.filter(s=>o.has(s.id)).reduce((s,r)=>s+r.sizeMb,0),g=[...o].every(s=>n.find(r=>r.id===s)?.shipped);return e.jsxs("div",{className:"suite-installer",style:{fontFamily:'-apple-system, "Segoe UI Variable Text", "Segoe UI", system-ui, sans-serif'},children:[e.jsx("div",{className:"app-list",children:n.map(s=>{const r=o.has(s.id);return e.jsxs("button",{onClick:()=>c(s.id),className:`app-row ${r?"app-row-checked":""}`,style:{borderLeftColor:r?s.color:"transparent"},children:[e.jsx("div",{className:"checkbox",style:{borderColor:r?s.color:"rgba(255,255,255,0.2)",background:r?`${s.color}22`:"transparent"},children:r&&e.jsx("svg",{width:"9",height:"9",viewBox:"0 0 9 9",fill:"none",children:e.jsx("path",{d:"M1.5 4.5L3.5 6.5L7.5 2.5",stroke:s.color,strokeWidth:"1.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),e.jsx("div",{className:"app-icon-sm",style:{color:s.color,background:`${s.color}18`,borderColor:`${s.color}30`},children:s.name[5]}),e.jsxs("div",{className:"app-info",children:[e.jsxs("div",{className:"app-name-row",children:[e.jsx("span",{className:"app-name",children:s.name}),!s.shipped&&e.jsx("span",{className:"badge-soon",children:"Soon"})]}),e.jsx("span",{className:"app-desc",children:s.desc})]}),e.jsxs("span",{className:"app-size",children:["~",s.sizeMb," MB"]})]},s.id)})}),e.jsxs("div",{className:"installer-footer",children:[e.jsxs("div",{className:"summary",children:[e.jsxs("span",{className:"summary-count",children:[o.size," app",o.size!==1?"s":""," selected"]}),e.jsxs("span",{className:"summary-size",children:["~",p," MB total"]})]}),e.jsx("button",{className:"generate-btn",disabled:o.size===0,onClick:()=>i(!0),style:{opacity:o.size===0?.4:1},children:t?"✓ Bundle ready":"Generate installer →"})]}),t&&e.jsxs("div",{className:"generated-panel",children:[g?e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"gen-title",children:"Your custom Loom installer is ready."}),e.jsx("p",{className:"gen-sub",children:"The suite installer will download and configure only the apps you selected."}),e.jsx("a",{href:"https://github.com/vidathegoat/loom-macro/releases/latest",target:"_blank",rel:"noopener noreferrer",className:"gen-download-btn",children:"Download Bundle →"})]}):e.jsxs(e.Fragment,{children:[e.jsx("p",{className:"gen-title",children:"Bundle includes unreleased apps."}),e.jsx("p",{className:"gen-sub",children:"Some apps you selected are still in development. The installer will include only shipped apps now and auto-update as others release."}),e.jsx("div",{style:{display:"flex",gap:8,marginTop:12},children:e.jsx("a",{href:"https://github.com/vidathegoat/loom-macro/releases/latest",target:"_blank",rel:"noopener noreferrer",className:"gen-download-btn",style:{flex:1,textAlign:"center"},children:"Download Available Apps →"})})]}),e.jsx("p",{className:"gen-concept",children:"⚠ Suite installer is a concept prototype — individual downloads are available below."})]}),e.jsx("style",{children:`
        .suite-installer {
          background: var(--bg-raised, #18181c);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 10px;
          overflow: hidden;
        }
        .app-list { display: flex; flex-direction: column; }
        .app-row {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border: none;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          border-left: 3px solid transparent;
          background: transparent;
          cursor: pointer;
          text-align: left;
          transition: background 80ms;
        }
        .app-row:last-child { border-bottom: none; }
        .app-row:hover { background: rgba(255,255,255,0.03); }
        .app-row-checked { background: rgba(255,255,255,0.02); }
        .checkbox {
          width: 16px; height: 16px;
          border-radius: 3px;
          border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          transition: all 120ms;
        }
        .app-icon-sm {
          width: 28px; height: 28px;
          border-radius: 6px;
          border: 1px solid;
          display: flex; align-items: center; justify-content: center;
          font-size: 13px; font-weight: 700;
          flex-shrink: 0;
        }
        .app-info { flex: 1; min-width: 0; }
        .app-name-row { display: flex; align-items: center; gap: 6px; }
        .app-name { font-size: 13px; font-weight: 600; color: #f5f5f7; }
        .badge-soon {
          font-size: 9px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          padding: 1px 5px; border-radius: 3px;
          background: rgba(255,255,255,0.06);
          color: rgba(245,245,247,0.35);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .app-desc { font-size: 11px; color: rgba(245,245,247,0.4); }
        .app-size { font-size: 11px; color: rgba(245,245,247,0.3); flex-shrink: 0; font-variant-numeric: tabular-nums; }

        .installer-footer {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 12px 16px;
          background: rgba(0,0,0,0.2);
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .summary { display: flex; flex-direction: column; gap: 2px; }
        .summary-count { font-size: 12px; font-weight: 600; color: #f5f5f7; }
        .summary-size  { font-size: 10px; color: rgba(245,245,247,0.4); }
        .generate-btn {
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.35);
          color: #f97316;
          cursor: pointer;
          transition: background 180ms;
        }
        .generate-btn:hover:not(:disabled) { background: rgba(249,115,22,0.22); }
        .generate-btn:disabled { cursor: default; }

        .generated-panel {
          padding: 16px;
          border-top: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.15);
        }
        .gen-title { font-size: 13px; font-weight: 600; color: #f5f5f7; margin-bottom: 4px; }
        .gen-sub   { font-size: 12px; color: rgba(245,245,247,0.5); line-height: 1.5; }
        .gen-download-btn {
          display: inline-block;
          margin-top: 12px;
          padding: 8px 18px;
          border-radius: 6px;
          font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
          background: rgba(249,115,22,0.12);
          border: 1px solid rgba(249,115,22,0.35);
          color: #f97316;
          text-decoration: none;
          transition: background 180ms;
        }
        .gen-download-btn:hover { background: rgba(249,115,22,0.22); }
        .gen-concept {
          margin-top: 10px;
          font-size: 10px;
          color: rgba(245,245,247,0.25);
          letter-spacing: 0.02em;
        }
      `})]})}export{x as default};
