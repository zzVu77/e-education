import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
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
