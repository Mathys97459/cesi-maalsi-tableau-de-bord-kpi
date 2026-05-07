import { useEffect, useRef } from "react";
import {
  Chart, BarController, BarElement, LineController, LineElement, PointElement,
  CategoryScale, LinearScale, Tooltip, Legend,
} from "chart.js";

Chart.register(BarController, BarElement, LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function LatenceChart({ kpi }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!kpi?.values?.values) return;

    const existing = Chart.getChart(ref.current);
    if (existing) existing.destroy();

    const latencies = kpi.values.values
      .split(",").map((v) => parseFloat(v.trim())).sort((a, b) => a - b);
    const p95 = kpi.result;
    const seuil = 500;

    const chart = new Chart(ref.current, {
      type: "bar",
      data: {
        labels: latencies.map((_, i) => `v${i + 1}`),
        datasets: [
          {
            type: "bar",
            label: "Temps de réponse",
            data: latencies,
            backgroundColor: latencies.map((v) =>
              v <= seuil ? "#639922" : v <= p95 ? "#BA7517" : "#E24B4A"
            ),
            borderRadius: 2,
            borderSkipped: false,
          },
          {
            type: "line",
            label: "Seuil 500ms",
            data: latencies.map(() => seuil),
            borderColor: "#639922",
            borderDash: [4, 3],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
          {
            type: "line",
            label: `P${kpi.values.percentile} — ${p95}ms`,
            data: latencies.map(() => p95),
            borderColor: "#E24B4A",
            borderDash: [4, 3],
            borderWidth: 1.5,
            pointRadius: 0,
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: true, labels: { font: { size: 11 }, color: "#555", boxWidth: 12, padding: 12 } },
          tooltip: { callbacks: { label: (c) => ` ${c.dataset.label}: ${c.parsed.y}ms` } },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: "#777" } },
          y: { grid: { color: "#eee" }, ticks: { font: { size: 11 }, color: "#777", callback: (v) => `${v}ms` } },
        },
      },
    });

    return () => chart.destroy();
  }, [kpi]);

  return (
    <div className="dash2-chart-wrap">
      <canvas ref={ref} />
    </div>
  );
}