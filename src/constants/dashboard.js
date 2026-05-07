export const THRESHOLDS = {
  1: {
    label: "seuil < 1%",
    status: (v) => (v < 1 ? "ok" : v < 3 ? "warning" : "danger"),
    display: (v) => `${v}%`,
    bar: (v) => Math.min(v * 25, 100),
  },
  2: {
    label: "seuil < 500ms",
    status: (v) => (v < 500 ? "ok" : v < 1000 ? "warning" : "danger"),
    display: (v) => `${v}ms`,
    bar: (v) => Math.min((v / 2500) * 100, 100),
  },
  3: {
    label: "seuil > 99.5%",
    status: (v) => (v >= 99.5 ? "ok" : v >= 99 ? "warning" : "danger"),
    display: (v) => `${v}%`,
    bar: (v) => v,
  },
  4: {
    label: "seuil < 60min",
    status: (v) => (v < 60 ? "ok" : v < 90 ? "warning" : "danger"),
    display: (v) => `${v}min`,
    bar: (v) => Math.min((v / 120) * 100, 100),
  },
  6: {
    label: "seuil < 5%",
    status: (v) => (v < 5 ? "ok" : v < 10 ? "warning" : "danger"),
    display: (v) => `${v}%`,
    bar: (v) => Math.min(v * 5, 100),
  },
  7: {
    label: "seuil > 80%",
    status: (v) => (v >= 80 ? "ok" : v >= 60 ? "warning" : "danger"),
    display: (v) => `${v}%`,
    bar: (v) => v,
  },
  8: {
    label: "bugs/livraison",
    status: (v) => (v < 0.5 ? "ok" : v < 1 ? "warning" : "danger"),
    display: (v) => `${v}`,
    bar: (v) => Math.min(v * 50, 100),
  },
  9: {
    label: "DORA < 15%",
    status: (v) => (v < 15 ? "ok" : v < 25 ? "warning" : "danger"),
    display: (v) => `${v}%`,
    bar: (v) => Math.min(v * 2, 100),
  },
  10: {
    label: "DORA < 1j",
    status: (v) => (v <= 1 ? "ok" : v <= 3 ? "warning" : "danger"),
    display: (v) => `${v}j`,
    bar: (v) => Math.min((v / 7) * 100, 100),
  },
  11: {
    label: "seuil < 5%",
    status: (v) => (v < 5 ? "ok" : v < 10 ? "warning" : "danger"),
    display: (v) => `${v}%`,
    bar: (v) => Math.min(v * 5, 100),
  },
  12: {
    label: "seuil > 5%",
    status: (v) => (v >= 5 ? "ok" : v >= 3 ? "warning" : "danger"),
    display: (v) => `${v}%`,
    bar: (v) => v * 10,
  },
  13: {
    label: "abonnement 9.99€",
    status: () => "neutral",
    display: (v) => `${v}€`,
    bar: (v) => (v / 9.99) * 100,
  },
  14: {
    label: "seuil > 90%",
    status: (v) => (v >= 90 ? "ok" : v >= 80 ? "warning" : "danger"),
    display: (v) => `${v}%`,
    bar: (v) => v,
  },
};

export const ALERTS = [
  {
    id: 11,
    icon: "ti-alert-circle",
    level: "danger",
    message: (kpi) =>
      `Churn Rate ${kpi.result}% — seuil critique > 5%. 20 000 utilisateurs perdus.`,
  },
  {
    id: 9,
    icon: "ti-alert-circle",
    level: "danger",
    message: (kpi) =>
      `Change Failure Rate ${kpi.result}% — norme DORA < 15%. ${kpi.values.numerator} déploiements échoués.`,
  },
  {
    id: 2,
    icon: "ti-alert-circle",
    level: "danger",
    message: (kpi) => `P95 Latency ${kpi.result}ms — seuil acceptable < 500ms.`,
  },
  {
    id: 6,
    icon: "ti-alert-triangle",
    level: "warning",
    message: () =>
      "Vélocité en chute — 35 → 30 → 25 pts/sprint. −5 pts par sprint.",
  },
];

export const SECTIONS = [
  { label: "Business", ids: [11, 14, 12, 13] },
  { label: "Technique", ids: [1, 2, 3, 4] },
  { label: "DevOps · Projet", ids: [9, 10, 7, 8], cols: 3 },
];