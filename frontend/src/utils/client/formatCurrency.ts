export function formatCurrency(
  amount: number,
  locale: string = "en-US",
  currency: string = "USD",
): string {
  return amount.toLocaleString(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  });
}
