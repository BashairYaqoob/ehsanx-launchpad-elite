import { describe, expect, it } from "vitest";
import { KFC_IMPACT, impactValue } from "@/lib/client-impact";

describe("KFC impact values", () => {
  it("reports approximately 12,000 employees", () => { expect(impactValue(KFC_IMPACT.employees, "~")).toBe("~12,000"); });
  it("reports 180 RGMs", () => { expect(KFC_IMPACT.rgms).toBe(180); });
  it("reports 3 regional cohorts", () => { expect(KFC_IMPACT.cohorts).toBe(3); });
  it("reports a 4-month journey", () => { expect(KFC_IMPACT.months).toBe(4); });
  it("keeps the unattributed quote hidden", () => { expect(KFC_IMPACT.showQuote).toBe(false); });
});