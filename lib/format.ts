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

export function formatPriceNumber(value: number): string {
  return priceFormat.format(value);
}

export function formatChange(
  change: Product["change"],
  percentGap = false,
): string {
  const sign = change.dir === "up" ? "▲ " : change.dir === "down" ? "▼ " : "—";
  const gap = percentGap ? " " : "";
  return `${sign}${percentFormat.format(Math.abs(change.pct))}${gap}%`;
}

export function unitLabel(unit: string): string {
  return units[unit] ?? unit;
}

const shortUnits: { [unit: string]: string } = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function shortUnitLabel(unit: string): string {
  return shortUnits[unit] ?? unit;
}

export function changeColorClass(dir: Product["change"]["dir"]): string {
  return dir === "up"
    ? "text-error"
    : dir === "down"
      ? "text-primary"
      : "text-base-content/60";
}

export function formatToday(): string {
  const now = new Date();
  const options = { timeZone: "Asia/Dhaka" } as const;
  const weekday = new Intl.DateTimeFormat("bn-BD", { ...options, weekday: "long" }).format(now);
  const day = new Intl.DateTimeFormat("bn-BD", { ...options, day: "numeric" }).format(now);
  const month = new Intl.DateTimeFormat("bn-BD", { ...options, month: "long" }).format(now);
  const year = new Intl.DateTimeFormat("bn-BD", { ...options, year: "numeric" }).format(now);
  return `${weekday}, ${day} ${month}, ${year}`;
}

export function initialsOf(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");
}
