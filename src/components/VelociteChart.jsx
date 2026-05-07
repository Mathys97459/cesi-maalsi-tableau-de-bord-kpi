import { useEffect, useRef } from "react";
import {
  Chart, LineController, LineElement, PointElement,
  CategoryScale, LinearScale, Tooltip, Legend,
} from "chart.js";

Chart.register(LineController, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function VelociteChart() {
  const ref = useRef(null);

  useEffect(() => {
    const existing = Chart.getChart(ref.current);
    if (existing) existing.destroy();

    const chart = new Chart(ref.current, {
      type: "line",
      data: {
        labels: ["Sprint 1", "Sprint 2", "Sprint 3"],
        datasets: [
          {
            label: "Réalisé",
            data: [35, 30, 25],
            borderColor: "#333",
            borderWidth: 2,
            pointBackgroundColor: "#333",
            pointRadius: 5,
            fill: true,
            backgroundColor: "rgba(0,0,0,0.04)",
            tension: 0.3,
          },
          {
            label: "Objectif",
            data: [50, 50, 50],
            borderColor: "#ccc",
            borderWidth: 1.5,
            borderDash: [5, 4],
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
          tooltip: { callbacks: { label: (c) => ` ${c.dataset.label}: ${c.parsed.y} pts` } },
        },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: "#555" } },
          y: { min: 0, max: 60, grid: { color: "#eee" }, ticks: { font: { size: 11 }, color: "#777", stepSize: 10 } },
        },
      },
    });

    return () => chart.destroy();
  }, []);

  return (
    <div className="dash2-chart-wrap">
      <canvas ref={ref} />
    </div>
  );
}