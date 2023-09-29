const valueCents = (value) => {
  const valueString = String(value);
  const valueSplitComma = valueString.split(',');
  const valueSplitPoint = valueString.split('.');
  if (valueSplitComma.length > 1 || valueSplitPoint.length > 1) {
    const cleanValue = valueString.replace(/\D/g, '');
    return Number(cleanValue);
  }

  return value;
};

module.exports = valueCents;
