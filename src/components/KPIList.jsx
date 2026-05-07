import "./KPIList.css";

export default function KPIList({ kpiList, onDelete }) {
  if (kpiList.length === 0) return null;

  return (
    <div className="kpi-list">
      <div className="kpi-list-header">
        <span>KPI créés</span>
        <span className="kpi-count">{kpiList.length}</span>
      </div>
      <div className="kpi-columns">
        <span>Nom</span>
        <span>Type</span>
        <span>Résultat</span>
        <span>Actions</span>
      </div>
      {kpiList.map((kpi) => (
        <div key={kpi.id} className="kpi-row">
          <span className="kpi-name">{kpi.kpiName}</span>
          <span className="kpi-type">{kpi.kpiType}</span>
          <span className="kpi-result">{kpi.result}</span>
          <span className="kpi-delete">
            <button onClick={() => onDelete(kpi.id)} aria-label="Supprimer">
              Supprimer
            </button>
          </span>
        </div>
      ))}
    </div>
  );
}
