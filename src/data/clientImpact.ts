import kfc from "@/assets/kfc-logo.asset.json";
import pci from "@/assets/pci-logo.asset.json";
import aj from "@/assets/aj-logo.asset.json";

export type ImpactFigure = { value: number; prefix?: string; label: string };
export type ImpactClient = {
  name: string; logo: string; multiply?: boolean;
  employeesInfluenced?: { value: number; approximate?: boolean };
  participants?: number;
  primary?: ImpactFigure; secondary?: ImpactFigure;
  details?: { label: string; value?: string; chips?: string[] }[];
};
export const clientImpact: ImpactClient[] = [
  { name: "KFC", logo: kfc.url, employeesInfluenced: { value: 12000, approximate: true }, participants: 180, primary: { value: 12000, prefix: "~", label: "Employees Influenced" }, secondary: { value: 180, label: "Leaders" } },
  { name: "PCI", logo: pci.url, multiply: true, participants: 50, primary: { value: 50, label: "Participants: Senior & Middle Managers" }, details: [
    { label: "Industry", value: "Automotive Manufacturing" },
    { label: "Functions", chips: ["Operations", "Engineering", "Production", "Quality", "Supply Chain", "HR & Administration"] },
    { label: "Approach", value: "Learning + Workplace Application + Coaching" },
  ] },
  { name: "Ahmad Jamal", logo: aj.url },
];

const totalsFormatter = new Intl.NumberFormat("en-US");

export function combinedImpact() {
  const leaders = clientImpact.reduce((sum, c) => sum + (c.participants ?? 0), 0);
  let employees = 0;
  let approximate = false;
  for (const c of clientImpact) {
    if (c.employeesInfluenced) {
      employees += c.employeesInfluenced.value;
      approximate = approximate || !!c.employeesInfluenced.approximate;
    }
  }
  return {
    leaders: { value: leaders, label: "Leaders and managers developed", display: totalsFormatter.format(leaders) },
    employees: { value: employees, label: "Employees influenced", display: `${approximate ? "~" : ""}${totalsFormatter.format(employees)}` },
  };
}
