import { describe, expect, it } from "vitest";
import { clientImpact, combinedImpact, kfcCase, pciCase } from "@/data/clientImpact";

const metric = (metrics: { value: string; label: string }[], label: string) =>
  metrics.find((m) => m.label === label)?.value;

describe("Client Impact case studies share the Home data source", () => {
  it("reports KFC's 180 RGMs, 3 cohorts, 4 months and ~12,000 employees", () => {
    expect(metric(kfcCase.metrics, "RGMs")).toBe("180");
    expect(metric(kfcCase.metrics, "Regional cohorts")).toBe("3");
    expect(metric(kfcCase.metrics, "Months")).toBe("4");
    expect(metric(kfcCase.metrics, "Employees indirectly influenced")).toBe("~12,000");
  });
  it("reports PCI's ~50 managers across 7 departments", () => {
    expect(metric(pciCase.metrics, "Managers")).toBe("~50");
    expect(metric(pciCase.metrics, "Departments")).toBe("7");
    expect(pciCase.departments).toHaveLength(7);
  });
  it("keeps case-study figures consistent with the Home totals", () => {
    const [kfc, pci] = clientImpact;
    expect(pciCase.departments).toBe(pci?.departments);
    expect(
      Number(metric(kfcCase.metrics, "RGMs")) +
        Number(metric(pciCase.metrics, "Managers")?.replace("~", "")),
    ).toBe(combinedImpact().leaders.value);
    expect(metric(kfcCase.metrics, "Employees indirectly influenced")).toBe(
      combinedImpact().employees.display,
    );
    expect(kfc?.cities).toHaveLength(combinedImpact().cities.value);
  });
});
