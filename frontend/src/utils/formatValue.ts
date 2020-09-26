const formatValue = (value: number): string =>
  Intl.NumberFormat('BRL', { style: 'currency', currency: 'BRL' }).format(
    value,
  ); // TODO

export default formatValue;
