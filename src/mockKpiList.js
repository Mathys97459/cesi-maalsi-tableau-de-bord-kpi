// mockKpiList.js
export const mockKpiList = [
  // — TECHNIQUES —
  {
    id: 1,
    kpiName: "Error Rate",
    kpiTypeKey: "RATE",
    kpiType: "Rate (Division)",
    result: 0.04,
    values: { numerator: 48000, denominator: 1200000 },
  },
  {
    id: 2,
    kpiName: "Avg Response Time",
    kpiTypeKey: "AVERAGE",
    kpiType: "Average (Moyenne)",
    result: 670.0,
    values: { sum: 8710, count: 13 },
  },
  {
    id: 3,
    kpiName: "P95 Latency",
    kpiTypeKey: "PERCENTILE",
    kpiType: "Percentile (P95)",
    result: 1800,
    values: {
      values: "120, 140, 150, 200, 250, 300, 350, 400, 500, 800, 1200, 1800, 2500",
      percentile: "95",
    },
  },
  {
    id: 4,
    kpiName: "Uptime",
    kpiTypeKey: "PERCENTAGE",
    kpiType: "Percentage (%)",
    result: 99.1,
    values: { value: 7135, total: 7200 },
  },
  {
    id: 5,
    kpiName: "MTTR",
    kpiTypeKey: "AVERAGE",
    kpiType: "Average (Moyenne)",
    result: 97.5,
    values: { sum: 390, count: 4 },
  },

  // — PROJET —
  {
    id: 6,
    kpiName: "Vélocité (évolution)",
    kpiTypeKey: "TREND",
    kpiType: "Trend (Évolution)",
    result: -5,
    values: { values: "35, 30, 25" },
  },
  {
    id: 7,
    kpiName: "Fix Rate",
    kpiTypeKey: "PERCENTAGE",
    kpiType: "Percentage (%)",
    result: 56.25,
    values: { value: 180, total: 320 },
  },
  {
    id: 8,
    kpiName: "Bug Rate",
    kpiTypeKey: "RATE",
    kpiType: "Rate (Division)",
    result: 1.333,
    values: { numerator: 320, denominator: 240 },
  },

  // — DEVOPS —
  {
    id: 9,
    kpiName: "Change Failure Rate",
    kpiTypeKey: "PERCENTAGE",
    kpiType: "Percentage (%)",
    result: 30,
    values: { value: 12, total: 40 },
  },
  {
    id: 10,
    kpiName: "Lead Time",
    kpiTypeKey: "AVERAGE",
    kpiType: "Average (Moyenne)",
    result: 5,
    values: { sum: 5, count: 1 },
  },

  // — BUSINESS —
  {
    id: 11,
    kpiName: "Churn Rate",
    kpiTypeKey: "PERCENTAGE",
    kpiType: "Percentage (%)",
    result: 16.67,
    values: { value: 20000, total: 120000 },
  },
  {
    id: 12,
    kpiName: "Conversion Rate",
    kpiTypeKey: "PERCENTAGE",
    kpiType: "Percentage (%)",
    result: 4,
    values: { value: 8000, total: 200000 },
  },
  {
    id: 13,
    kpiName: "ARPU",
    kpiTypeKey: "RATE",
    kpiType: "Rate (Division)",
    result: 8.33,
    values: { numerator: 1000000, denominator: 120000 },
  },
  {
    id: 14,
    kpiName: "Retention Rate",
    kpiTypeKey: "PERCENTAGE",
    kpiType: "Percentage (%)",
    result: 83.33,
    values: { value: 100000, total: 120000 },
  },
];