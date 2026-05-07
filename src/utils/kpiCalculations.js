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
  }
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


