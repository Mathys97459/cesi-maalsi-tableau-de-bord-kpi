import { useState } from "react";
import RateKPIForm from "./components/RateKPIForm";
import KPIList from "./components/KPIList";
import Dashboard from "./components/Dashboard";
import "./App.css";

function App() {
  const [kpiList, setKpiList] = useState([]);
  const [displayDashboard, setDisplayDashboard] = useState(false);
  const handleAdd = (result) => {
    setKpiList((prev) => [...prev, { ...result, id: Date.now() }]);
  };

  const handleDelete = (id) => {
    setKpiList((prev) => prev.filter((kpi) => kpi.id !== id));
  };
  const createDashboard = () => {
    setDisplayDashboard(true);
  };

  return (
    <div className="app">
      {!displayDashboard ? (
        <>
          <RateKPIForm onAdd={handleAdd} />
          {kpiList.length > 0 && (
            <button className="create-dashboard" onClick={createDashboard}>
              Créer un tableau de bord
            </button>
          )}
          <KPIList kpiList={kpiList} onDelete={handleDelete} />
        </>
      ) : (
        <Dashboard kpiList={kpiList} />
      )}
    </div>
  );
}

export default App;
