import { describe, expect, it } from "vitest";
import { clientImpact, combinedImpact } from "@/data/clientImpact";

describe("Client Impact supplied data", () => {
  it("sums 180 KFC and 50 PCI participants to 230", () => {
    expect(combinedImpact().leaders.value).toBe(230);
  });
  it("aggregates approximately 12,000 employees", () => {
    expect(combinedImpact().employees).toMatchObject({ value: 12000, display: "~12,000" });
  });
  it("counts three unique delivery cities", () => {
    expect(clientImpact[0]?.cities).toEqual(["Karachi", "Lahore", "Islamabad"]);
    expect(combinedImpact().cities).toMatchObject({ value: 3, display: "3+" });
    expect(combinedImpact([...clientImpact, { name: "Additional", logo: "", cities: ["Karachi"] }]).cities.value).toBe(3);
  });
  it("updates participant totals when Ahmad Jamal has participants", () => {
    const updated = clientImpact.map(client => client.name === "Ahmad Jamal" ? { ...client, participants: 20 } : client);
    expect(combinedImpact(updated).leaders.value).toBe(250);
  });
  it("retains KFC's delivery, duration and reach", () => {
    expect(clientImpact[0]).toMatchObject({ participants: 180, participantRole: "Restaurant General Managers", delivery: "3 regional cohorts", duration: "4-month leadership journey", directReach: { value: 180, label: "leaders" }, indirectImpact: { value: 12000, approximate: true, label: "employees influenced" } });
  });
  it("keeps Ahmad Jamal participant count absent", () => {
    expect(clientImpact[2]?.participants).toBeUndefined();
  });
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