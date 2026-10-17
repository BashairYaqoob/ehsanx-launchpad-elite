import kfc from "@/assets/kfc-logo.asset.json";
import pci from "@/assets/pci-logo.asset.json";
import aj from "@/assets/aj-logo.asset.json";

export type ImpactFigure = { value: number; prefix?: string; label: string };
export type ImpactClient = {
  name: string; logo: string; multiply?: boolean;
  primary?: ImpactFigure; secondary?: ImpactFigure;
  details?: { label: string; value?: string; chips?: string[] }[];
};
export const clientImpact: ImpactClient[] = [
  { name: "KFC", logo: kfc.url, primary: { value: 12000, prefix: "~", label: "Employees Influenced" }, secondary: { value: 180, label: "Leaders" } },
  { name: "PCI", logo: pci.url, multiply: true, primary: { value: 50, label: "Participants: Senior & Middle Managers" }, details: [
    { label: "Industry", value: "Automotive Manufacturing" },
    { label: "Functions", chips: ["Operations", "Engineering", "Production", "Quality", "Supply Chain", "HR & Administration"] },
    { label: "Approach", value: "Learning + Workplace Application + Coaching" },
  ] },
  { name: "Ahmad Jamal", logo: aj.url },
];
