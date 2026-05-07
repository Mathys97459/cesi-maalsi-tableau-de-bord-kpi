import { useState } from "react";
import { calculateKPI, kpiTypes } from "../utils/kpiCalculations";
import "./RateKPIForm.css";

export default function RateKPIForm() {
  const [selectedType, setSelectedType] = useState("RATE");
  const [kpiName, setKpiName] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [result, setResult] = useState(null);

  const typeConfig = kpiTypes[selectedType];

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setInputValues({});
    setResult(null);
  };

  const handleInputChange = (field, value) => {
    setInputValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCalculate = () => {
    if (!kpiName.trim()) {
      alert("Veuillez entrer un nom pour le KPI");
      return;
    }

    const emptyFields = typeConfig.fields.filter(
      (field) => !inputValues[field],
    );
    if (emptyFields.length > 0) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    const numValues = {};
    typeConfig.fields.forEach((field) => {
      numValues[field] =
        field === "values" || field === "percentile"
          ? inputValues[field]
          : parseFloat(inputValues[field]);
    });

    const calcResult = calculateKPI(kpiName, selectedType, numValues);

    if (calcResult.error) {
      alert(`Erreur: ${calcResult.message}`);
      return;
    }

    setResult(calcResult);

    console.log("KPI CALCULÉ");
    console.log(`Nom: ${calcResult.kpiName}`);
    console.log(`Type: ${calcResult.kpiType}`);
    console.log(`Données d'entrée:`, calcResult.values);
    console.log(`Résultat: ${calcResult.result}`);
  };

  const handleReset = () => {
    setKpiName("");
    setInputValues({});
    setResult(null);
    setSelectedType("RATE");
  };

  return (
    <div className="kpi-container">
      <div className="form-group">
        <label htmlFor="kpiType">Type de KPI:</label>
        <select id="kpiType" value={selectedType} onChange={handleTypeChange}>
          {Object.entries(kpiTypes).map(([key, config]) => (
            <option key={key} value={key}>
              {config.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="kpiName">Nom du KPI:</label>
        <input
          id="kpiName"
          type="text"
          value={kpiName}
          onChange={(e) => setKpiName(e.target.value)}
          placeholder="Ex: Error Rate, Churn Rate..."
        />
      </div>

      <div className="dynamic-inputs">
        {typeConfig.fields.map((field, index) => (
          <div key={field} className="form-group">
            <label htmlFor={field}>{typeConfig.labels[index]}:</label>
            <input
              id={field}
              type="text"
              value={inputValues[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={field === "values" ? "10, 20, 30..." : "0"}
            />
          </div>
        ))}
      </div>

      <div className="button-group">
        <button className="btn-calculate" onClick={handleCalculate}>
          Calculer
        </button>
        <button className="btn-reset" onClick={handleReset}>
          Réinitialiser
        </button>
      </div>

      {result && (
        <div className="result-card">
          <h2>Résultat</h2>
          <div className="result-item">
            <span className="label">Nom KPI:</span>
            <span className="value">{result.kpiName}</span>
          </div>
          <div className="result-item">
            <span className="label">Type:</span>
            <span className="value">{result.kpiType}</span>
          </div>
          <div className="result-item">
            <span className="label">Résultat:</span>
            <span className="value">{result.result}</span>
          </div>
        </div>
      )}
    </div>
  );
}
