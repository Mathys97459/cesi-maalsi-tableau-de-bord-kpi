export const kpiTypes = {
  RATE: {
    name: 'Rate (Division)',
    fields: ['numerator', 'denominator'],
    labels: ['Valeur 1', 'Valeur 2'],
    calculate: (values) => values.numerator / values.denominator
  },
  AVERAGE: {
    name: 'Average (Moyenne)',
    fields: ['sum', 'count'],
    labels: ['Somme', 'Nombre d\'éléments'],
    calculate: (values) => values.sum / values.count
  },
  PERCENTAGE: {
    name: 'Percentage (%)',
    fields: ['value', 'total'],
    labels: ['Valeur', 'Total'],
    calculate: (values) => (values.value / values.total) * 100
  },
  PERCENTILE: {
    name: 'Percentile (P95)',
    fields: ['values', 'percentile'],
    labels: ['Valeurs (séparées par des virgules)', 'Percentile (ex: 95)'],
    calculate: (values) => {
      const nums = values.values
        .split(',')
        .map(v => parseFloat(v.trim()))
        .sort((a, b) => a - b);
      const index = Math.ceil((values.percentile / 100) * nums.length) - 1;
      return nums[Math.max(0, index)];
    }
  },
  TREND: {
    name: 'Trend (Évolution)',
    fields: ['values'],
    labels: ['Valeurs (séparées par des virgules)'],
    calculate: (values) => {
      const nums = values.values.split(',').map(v => parseFloat(v.trim()));
      if (nums.length < 2) return 0;
      const first = nums[0];
      const last = nums[nums.length - 1];
      return (last - first) / (nums.length - 1);
    }
  },
};

export const calculateKPI = (kpiName, kpiType, values) => {
  const typeConfig = kpiTypes[kpiType];

  if (!typeConfig) {
    return {
      error: true,
      message: `Type de KPI "${kpiType}" non reconnu`
    };
  }

  try {
    const result = typeConfig.calculate(values);

    return {
      kpiName,
      kpiType: typeConfig.name,
      values,
      result: parseFloat(result.toFixed(4)),
      valid: true
    };
  } catch (error) {
    return {
      error: true,
      message: `Erreur lors du calcul: ${error.message}`
    };
  }
};


