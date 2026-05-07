import { useState } from 'react'
import RateKPIForm from './components/RateKPIForm'
import KPIList from './components/KPIList'
import './App.css'

function App() {
  const [kpiList, setKpiList] = useState([])

  const handleAdd = (result) => {
    setKpiList((prev) => [...prev, { ...result, id: Date.now() }])
  }

  const handleDelete = (id) => {
    setKpiList((prev) => prev.filter((kpi) => kpi.id !== id))
  }

  return (
    <div className="app">
      <RateKPIForm onAdd={handleAdd} />
      <KPIList kpiList={kpiList} onDelete={handleDelete} />
    </div>
  )
}

export default App