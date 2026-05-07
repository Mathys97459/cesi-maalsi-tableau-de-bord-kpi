import "./Dashboard.css";
import VelociteChart from "./VelociteChart";
import LatenceChart from "./LatenceChart";
import { THRESHOLDS, SECTIONS, ALERTS } from "../constants/dashboard";

function KPICard({ kpi }) {
  const t = THRESHOLDS[kpi.id];
  if (!t) return null;
  const status = t.status(kpi.result);
  const barWidth = t.bar(kpi.result);
  const barColor = {
    ok: "#639922",
    warning: "#BA7517",
    danger: "#E24B4A",
    neutral: "#888",
  }[status];

  return (
    <div className={`dash2-card ${status}`}>
      <div className={`dash2-label ${status}`}>{kpi.kpiName}</div>
      <div className={`dash2-val ${status}`}>{t.display(kpi.result)}</div>
      <div className={`dash2-threshold ${status}`}>{t.label}</div>
      <div className="dash2-bar-wrap">
        <div
          className="dash2-bar-fill"
          style={{ width: `${Math.min(barWidth, 100)}%`, background: barColor }}
        />
      </div>
    </div>
  );
}

export default function Dashboard({ kpiList }) {
  if (kpiList.length === 0) return null;

  const byId = Object.fromEntries(kpiList.map((k) => [k.id, k]));
  const kpiP95 = kpiList.find((k) => k.kpiTypeKey === "PERCENTILE");
  const kpiTrend = kpiList.find((k) => k.kpiTypeKey === "TREND");
  const critiques = ALERTS.filter((a) => byId[a.id] || a.id === 6).length;
  const warnings = ALERTS.filter(
    (a) => a.level === "warning" && (byId[a.id] || a.id === 6),
  ).length;

  return (
    <div className="dash2">
      <div className="dash2-top">
        <div>
          <div className="dash2-title">StreamFlow — Pilotage</div>
          <div className="dash2-sub">
            Données du mois en cours · {kpiList.length} KPI surveillés
          </div>
        </div>
        <div className="dash2-badges">
          {critiques > 0 && (
            <span className="badge danger">
              <i className="ti ti-alert-triangle" /> {critiques} critiques
            </span>
          )}
          {warnings > 0 && (
            <span className="badge warning">{warnings} alertes</span>
          )}
        </div>
      </div>

      <div className="dash2-section">
        <div className="dash2-section-label">Alertes prioritaires</div>
        {ALERTS.map((a) => {
          const kpi = byId[a.id];
          if (!kpi && a.id !== 6) return null;
          return (
            <div key={a.id} className={`dash2-alert ${a.level}`}>
              <i className={`ti ${a.icon}`} aria-hidden="true" />
              <span
                dangerouslySetInnerHTML={{ __html: a.message(kpi || {}) }}
              />
            </div>
          );
        })}
      </div>

      {SECTIONS.map((section) => (
        <div key={section.label} className="dash2-section">
          <div className="dash2-section-label">{section.label}</div>
          <div className={`dash2-grid cols-${section.cols ?? 4}`}>
            {section.ids.map((id) =>
              byId[id] ? <KPICard key={id} kpi={byId[id]} /> : null,
            )}
          </div>
        </div>
      ))}

      <div className="dash2-section">
        <div className="dash2-section-label">Zoom · Vélocité</div>
        <div className="dash2-chart-card">
          <div className="dash2-chart-head">
            <span className="dash2-chart-title">Vélocité par sprint</span>
            <span className="badge warning">−5 pts/sprint</span>
          </div>
          <p className="dash2-chart-sub">
            3 derniers sprints · objectif 50 pts
          </p>
          <div className="dash2-chart-wrap">
            <VelociteChart kpi={kpiTrend} />
          </div>
        </div>
      </div>

      <div className="dash2-section">
        <div className="dash2-section-label">Zoom · Latence</div>
        <div className="dash2-chart-card">
          <div className="dash2-chart-head">
            <span className="dash2-chart-title">
              Distribution des temps de réponse
            </span>
            <span className="badge danger">P95 = {byId[2]?.result}ms</span>
          </div>
          <p className="dash2-chart-sub">
            13 échantillons · seuil acceptable 500ms
          </p>
          <div className="dash2-chart-wrap">
            <LatenceChart kpi={kpiP95} />
          </div>
        </div>
      </div>
    </div>
  );
}
