import { describe, expect, it } from "vitest";
import { clientImpact, combinedImpact } from "@/data/clientImpact";

describe("Client Impact supplied data", () => {
  it("sums 180 KFC and approximately 50 PCI participants to ~230", () => {
    expect(combinedImpact().leaders).toMatchObject({ value: 230, display: "~230" });
  });
  it("shows an exact leader total when every participant count is exact", () => {
    const exact = clientImpact.map((client) => ({ ...client, participantsApproximate: false }));
    expect(combinedImpact(exact).leaders.display).toBe("230");
  });
  it("aggregates approximately 12,000 employees", () => {
    expect(combinedImpact().employees).toMatchObject({ value: 12000, display: "~12,000" });
  });
  it("counts three unique delivery cities", () => {
    expect(clientImpact[0]?.cities).toEqual(["Karachi", "Lahore", "Islamabad"]);
    expect(combinedImpact().cities).toMatchObject({ value: 3, display: "3" });
    expect(
      combinedImpact([...clientImpact, { name: "Additional", logo: "", cities: ["Karachi"] }])
        .cities.value,
    ).toBe(3);
  });
  it("updates participant totals when Ahmad Jamal has participants", () => {
    const updated = clientImpact.map((client) =>
      client.name === "Ahmad Jamal" ? { ...client, participants: 20 } : client,
    );
    expect(combinedImpact(updated).leaders.value).toBe(250);
  });
  it("retains KFC's delivery, duration and reach", () => {
    expect(clientImpact[0]).toMatchObject({
      participants: 180,
      participantRole: "Restaurant General Managers",
      delivery: "3 regional cohorts",
      duration: "4-month leadership journey",
      directReach: { value: 180, label: "leaders" },
      indirectImpact: { value: 12000, approximate: true, label: "employees influenced" },
    });
  });
  it("keeps Ahmad Jamal participant count absent", () => {
    expect(clientImpact[2]?.participants).toBeUndefined();
  });
  it("uses KFC's approximately 12,000 employees", () => {
    expect(clientImpact[0]?.primary).toEqual({
      value: 12000,
      prefix: "~",
      label: "Employees Influenced",
    });
  });
  it("uses KFC's 180 leaders", () => {
    expect(clientImpact[0]?.secondary).toEqual({ value: 180, label: "Leaders" });
  });
  it("uses PCI's approximately 50 senior and middle managers", () => {
    expect(clientImpact[1]).toMatchObject({ participants: 50, participantsApproximate: true });
    expect(clientImpact[1]?.primary).toEqual({
      value: 50,
      prefix: "~",
      label: "Participants: Senior & Middle Managers",
    });
  });
  it("uses the supplied PCI industry", () => {
    expect(clientImpact[1]?.details?.[0]?.value).toBe("Automotive Manufacturing");
  });
  it("uses PCI's seven departments from the company profile", () => {
    const departments = [
      "Operations",
      "Production",
      "Engineering",
      "Quality",
      "Supply Chain",
      "HR",
      "Administration",
    ];
    expect(clientImpact[1]?.departments).toEqual(departments);
    expect(clientImpact[1]?.details?.[1]).toEqual({ label: "Departments", chips: departments });
  });
  it("uses the supplied PCI approach", () => {
    expect(clientImpact[1]?.details?.[2]?.value).toBe(
      "Learning + Workplace Application + Coaching",
    );
  });
  it("keeps Ahmad Jamal figures and details empty", () => {
    const client = clientImpact[2];
    expect(client?.name).toBe("Ahmad Jamal");
    expect(client?.primary).toBeUndefined();
    expect(client?.secondary).toBeUndefined();
    expect(client?.details).toBeUndefined();
  });
});
