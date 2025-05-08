// src/utils/utils.js
export function formatCurrency(amount, currencyCode) {
  if (!amount || isNaN(amount)) return `0 ${currencyCode}`;
  
  const formatter = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  });
  
  return `${formatter.format(amount)} ${currencyCode}`;
}

export function convertCurrency(amount, fromRate, toRate) {
  if (!amount || !fromRate || !toRate) return 0;
  return (amount / fromRate) * toRate;
}