export const KFC_IMPACT = {
  employees: 12000,
  rgms: 180,
  cohorts: 3,
  months: 4,
  showQuote: false,
} as const;

const formatter = new Intl.NumberFormat("en-US");

export function impactValue(value: number, prefix = "") {
  return `${prefix}${formatter.format(value)}`;
}
