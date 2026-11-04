import { describe, expect, it } from "vitest";
import { buildEnquiryMailto, validateEnquiry } from "./enquiry";

const ok = { name: "Sara Khan", organization: "Acme", email: "sara@acme.com", message: "Hello" };

describe("enquiry", () => {
  it("requires all four fields", () => {
    expect(Object.keys(validateEnquiry({ name: "", organization: "", email: "", message: "" })).sort()).toEqual(["email", "message", "name", "organization"]);
  });
  it("rejects an invalid email", () => {
    expect(validateEnquiry({ ...ok, email: "sara@acme" }).email).toBeDefined();
  });
  it("accepts a complete enquiry", () => {
    expect(validateEnquiry(ok)).toEqual({});
  });
  it("addresses the mail draft to the EhsanX inbox with all details", () => {
    const url = buildEnquiryMailto(ok);
    expect(url.startsWith("mailto:ehsanx.transform@gmail.com?")).toBe(true);
    const body = decodeURIComponent(url.split("body=")[1] ?? "");
    expect(body).toContain("Organization: Acme");
    expect(body).toContain("Email: sara@acme.com");
  });
});
