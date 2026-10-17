import { describe, expect, it } from "vitest";
import { clientImpact } from "@/data/clientImpact";

describe("Client Impact supplied data", () => {
  it("uses KFC's approximately 12,000 employees", () => {
    expect(clientImpact[0]?.primary).toEqual({ value: 12000, prefix: "~", label: "Employees Influenced" });
  });
  it("uses KFC's 180 leaders", () => {
    expect(clientImpact[0]?.secondary).toEqual({ value: 180, label: "Leaders" });
  });
  it("uses PCI's 50 senior and middle managers", () => {
    expect(clientImpact[1]?.primary).toEqual({ value: 50, label: "Participants: Senior & Middle Managers" });
  });
  it("uses the supplied PCI industry", () => {
    expect(clientImpact[1]?.details?.[0]?.value).toBe("Automotive Manufacturing");
  });
  it("uses all supplied PCI functions in order", () => {
    expect(clientImpact[1]?.details?.[1]?.chips).toEqual(["Operations", "Engineering", "Production", "Quality", "Supply Chain", "HR & Administration"]);
  });
  it("uses the supplied PCI approach", () => {
    expect(clientImpact[1]?.details?.[2]?.value).toBe("Learning + Workplace Application + Coaching");
  });
  it("keeps Ahmad Jamal figures and details empty", () => {
    const client = clientImpact[2];
    expect(client?.name).toBe("Ahmad Jamal");
    expect(client?.primary).toBeUndefined();
    expect(client?.secondary).toBeUndefined();
    expect(client?.details).toBeUndefined();
  });
});