import type { Product } from "./types";

const priceFormat = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const percentFormat = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const units: { [unit: string]: string } = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export function formatPrice(value: number): string {
  return `${priceFormat.format(value)} টাকা`;
}

export function formatChange(change: Product["change"]): string {
  const sign = change.dir === "up" ? "▲ " : change.dir === "down" ? "▼ " : "—";
  return `${sign}${percentFormat.format(Math.abs(change.pct))}%`;
}

export function unitLabel(unit: string): string {
  return units[unit] ?? unit;
}
