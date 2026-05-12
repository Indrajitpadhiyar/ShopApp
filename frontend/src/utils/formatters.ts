export function formatCurrency(value: number) {
  return `Rs ${value.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
}
