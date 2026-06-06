import { useState } from 'react';

const APPS = [
  { id: 'macro',     name: 'Loch Macro',     color: '#f97316', sizeMb: 8,  shipped: true,  desc: 'Node-based macro scripting' },
  { id: 'scheduler', name: 'Loch Scheduler', color: '#8b5cf6', sizeMb: 6,  shipped: false, desc: 'Time-aware task orchestration' },
  { id: 'cookbook',  name: 'Loch Cookbook',  color: '#3b82f6', sizeMb: 5,  shipped: false, desc: 'Personal command recipe book' },
  { id: 'hardware',  name: 'Loch Hardware',  color: '#10b981', sizeMb: 7,  shipped: true,  desc: 'Hardware monitoring & control' },
  { id: 'developer', name: 'Loch Developer', color: '#f59e0b', sizeMb: 5,  shipped: false, desc: 'Developer utilities suite' },
  { id: 'finance',   name: 'Loch Finance',   color: '#22d3ee', sizeMb: 6,  shipped: false, desc: 'Local-first personal finance' },
];

export default function SuiteInstallerUI() {
  const [selected, setSelected] = useState<Set<string>>(new Set(['macro']));
  const [generated, setGenerated] = useState(false);

  const toggle = (id: string) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setGenerated(false);
  };

  const totalMb = APPS.filter(a => selected.has(a.id)).reduce((s, a) => s + a.sizeMb, 0);
  const allShipped = [...selected].every(id => APPS.find(a => a.id === id)?.shipped);

  return (
    <div className="suite-installer" style={{ fontFamily: '-apple-system, "Segoe UI Variable Text", "Segoe UI", system-ui, sans-serif' }}>
      {/* App selection */}
      <div className="app-list">
        {APPS.map(app => {
          const checked = selected.has(app.id);
          return (
            <button
              key={app.id}
              onClick={() => toggle(app.id)}
              className={`app-row ${checked ? 'app-row-checked' : ''}`}
              style={{ borderLeftColor: checked ? app.color : 'transparent' }}
            >
              {/* Checkbox */}
              <div
                className="checkbox"
                style={{
                  borderColor: checked ? app.color : 'rgba(255,255,255,0.2)',
                  background:  checked ? `${app.color}22` : 'transparent',
                }}
              >
                {checked && (
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={app.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>

              {/* App icon */}
              <div
                className="app-icon-sm"
                style={{ color: app.color, background: `${app.color}18`, borderColor: `${app.color}30` }}
              >
                {app.name[5]}
              </div>

              {/* Info */}
              <div className="app-info">
                <div className="app-name-row">
                  <span className="app-name">{app.name}</span>
                  {!app.shipped && (
                    <span className="badge-soon">Soon</span>
                  )}
                </div>
                <span className="app-desc">{app.desc}</span>
              </div>

              {/* Size */}
              <span className="app-size">~{app.sizeMb} MB</span>
            </button>
          );
        })}
      </div>

      {/* Summary + generate */}
      <div className="installer-footer">
        <div className="summary">
          <span className="summary-count">
            {selected.size} app{selected.size !== 1 ? 's' : ''} selected
          </span>
          <span className="summary-size">~{totalMb} MB total</span>
        </div>

        <button
          className="generate-btn"
          disabled={selected.size === 0}
          onClick={() => setGenerated(true)}
          style={{ opacity: selected.size === 0 ? 0.4 : 1 }}
        >
          {generated ? '✓ Bundle ready' : 'Generate installer →'}
        </button>
      </div>

      {/* Generated state */}
      {generated && (
        <div className="generated-panel">
          {allShipped ? (
            <>
              <p className="gen-title">Your custom Loch installer is ready.</p>
              <p className="gen-sub">
                The suite installer will download and configure only the apps you selected.
              </p>
              <a
                href="https://github.com/loch-suite/loch-macro-releases/releases/download/v0.2.0/Loch.Macro_0.2.0_x64-setup.exe"
                target="_blank"
                rel="noopener noreferrer"
                className="gen-download-btn"
              >
                Download Bundle →
              </a>
            </>
          ) : (
            <>
              <p className="gen-title">Bundle includes unreleased apps.</p>
              <p className="gen-sub">
                Some apps you selected are still in development. The installer will include only
                shipped apps now and auto-update as others release.
              </p>
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <a
                  href="https://github.com/loch-suite/loch-macro-releases/releases/download/v0.2.0/Loch.Macro_0.2.0_x64-setup.exe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gen-download-btn"
                  style={{ flex: 1, textAlign: 'center' }}
                >
                  Download Available Apps →
                </a>
              </div>
            </>
          )}
          <p className="gen-concept">
            ⚠ Suite installer is a concept prototype — individual downloads are available below.
          </p>
        </div>
      )}

      <style>{`
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
      `}</style>
    </div>
  );
}
