import kfc from "@/assets/kfc-logo.webp";
import pci from "@/assets/pci-logo.png";
import aj from "@/assets/aj-logo.webp";

export type ImpactFigure = { value: number; prefix?: string; label: string };
export type ImpactClient = {
  name: string; logo: string; multiply?: boolean;
  employeesInfluenced?: { value: number; approximate?: boolean };
  participants?: number;
  participantRole?: string;
  cities?: string[];
  delivery?: string;
  duration?: string;
  directReach?: { value: number; label: string };
  indirectImpact?: { value: number; approximate: boolean; label: string };
  summary?: string;
  primary?: ImpactFigure; secondary?: ImpactFigure;
  details?: { label: string; value?: string; chips?: string[] }[];
};
export const clientImpact: ImpactClient[] = [
  { name: "KFC Pakistan", logo: kfc, employeesInfluenced: { value: 12000, approximate: true }, participants: 180, participantRole: "Restaurant General Managers", cities: ["Karachi", "Lahore", "Islamabad"], delivery: "3 regional cohorts", duration: "4-month leadership journey", directReach: { value: 180, label: "leaders" }, indirectImpact: { value: 12000, approximate: true, label: "employees influenced" }, primary: { value: 12000, prefix: "~", label: "Employees Influenced" }, secondary: { value: 180, label: "Leaders" } },
  { name: "PCI", logo: pci, multiply: true, participants: 50, participantRole: "Senior & Middle Managers", primary: { value: 50, label: "Participants: Senior & Middle Managers" }, details: [
    { label: "Industry", value: "Automotive Manufacturing" },
    { label: "Functions", chips: ["Operations", "Engineering", "Production", "Quality", "Supply Chain", "HR & Administration"] },
    { label: "Approach", value: "Learning + Workplace Application + Coaching" },
  ] },
  { name: "Ahmad Jamal", logo: aj, summary: "Dr. Shahid facilitated an Executive Leadership Dialogue with the founders and family leadership team, introducing the principles of Entrepreneurial Leadership, Innovation, and Effectuation. Through interactive discussions and practical business examples, participants explored how entrepreneurial thinking can strengthen leadership, improve decision-making, and unlock opportunities using existing organizational resources." },
];

const totalsFormatter = new Intl.NumberFormat("en-US");

export function combinedImpact(clients: readonly ImpactClient[] = clientImpact) {
  const leaders = clients.reduce((sum, c) => sum + (c.participants ?? 0), 0);
  let employees = 0;
  let approximate = false;
  for (const c of clients) {
    if (c.employeesInfluenced) {
      employees += c.employeesInfluenced.value;
      approximate = approximate || !!c.employeesInfluenced.approximate;
    }
  }
  const cities = new Set(clients.flatMap((client) => client.cities ?? [])).size;
  return {
    cities: { value: cities, label: "Cities reached", display: `${totalsFormatter.format(cities)}+` },
    leaders: { value: leaders, label: "Leaders and managers developed", display: totalsFormatter.format(leaders) },
    employees: { value: employees, label: "Employees influenced", display: `${approximate ? "~" : ""}${totalsFormatter.format(employees)}` },
  };
}
