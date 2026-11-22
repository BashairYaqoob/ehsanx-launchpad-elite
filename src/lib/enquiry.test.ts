import { describe, expect, it, vi } from "vitest";
import {
  emptyEnquiry,
  firstInvalidField,
  sendEnquiry,
  validateEnquiry,
  type Enquiry,
} from "./enquiry";

const ok: Enquiry = {
  name: "Sara Khan",
  email: "sara@acme.com",
  organization: "",
  topic: "leadership-programmes",
  message: "We would like to discuss a programme for our managers.",
};

const reply = (status: number, body: unknown) =>
  vi.fn().mockResolvedValue(new Response(JSON.stringify(body), { status }));

describe("enquiry validation", () => {
  it("requires name, email, topic and message, but not organization", () => {
    expect(Object.keys(validateEnquiry(emptyEnquiry)).sort()).toEqual([
      "email",
      "message",
      "name",
      "topic",
    ]);
  });
  it("accepts a complete enquiry without an organization", () => {
    expect(validateEnquiry(ok)).toEqual({});
  });
  it("rejects invalid email addresses, including header-injection attempts", () => {
    expect(validateEnquiry({ ...ok, email: "sara@acme" }).email).toBeDefined();
    expect(validateEnquiry({ ...ok, email: "sara@acme.com\nBcc: x@y.com" }).email).toBeDefined();
    expect(validateEnquiry({ ...ok, email: "a@b.com, c@d.com" }).email).toBeDefined();
  });
  it("accepts only the offered topics", () => {
    expect(validateEnquiry({ ...ok, topic: "anything" }).topic).toBeDefined();
  });
  it("enforces message length", () => {
    expect(validateEnquiry({ ...ok, message: "Hi" }).message).toBeDefined();
    expect(validateEnquiry({ ...ok, message: "x".repeat(2001) }).message).toBeDefined();
  });
  it("points at the first invalid field in form order", () => {
    expect(firstInvalidField({ message: "x", email: "y" })).toBe("email");
  });
});

describe("sending", () => {
  it("reports sent only when the server confirms acceptance", async () => {
    const fetcher = reply(200, { ok: true, reference: "AB12CD34" });
    expect(await sendEnquiry(ok, { elapsed: 9000, fetcher })).toEqual({
      kind: "sent",
      reference: "AB12CD34",
    });
    const [, init] = fetcher.mock.calls[0] as [string, RequestInit];
    expect((init.headers as Record<string, string>)["X-EhsanX-Enquiry"]).toBe("1");
    expect(JSON.parse(init.body as string)).toMatchObject({
      topic: "leadership-programmes",
      website: "",
      elapsed: 9000,
    });
  });
  it("never treats a 200 without ok:true as sent", async () => {
    expect(
      (await sendEnquiry(ok, { elapsed: 9000, fetcher: reply(200, { ok: false }) })).kind,
    ).toBe("failed");
    expect((await sendEnquiry(ok, { elapsed: 9000, fetcher: reply(200, "<html>") })).kind).toBe(
      "failed",
    );
  });
  it("returns the server's field errors", async () => {
    const result = await sendEnquiry(ok, {
      elapsed: 9000,
      fetcher: reply(422, { ok: false, message: "Check", errors: { email: "Bad email" } }),
    });
    expect(result).toEqual({ kind: "invalid", errors: { email: "Bad email" }, message: "Check" });
  });
  it("turns SMTP failures, rate limits and network errors into a retryable failure", async () => {
    expect(
      await sendEnquiry(ok, {
        elapsed: 9000,
        fetcher: reply(502, { ok: false, message: "SMTP down" }),
      }),
    ).toEqual({
      kind: "failed",
      message: "SMTP down",
    });
    expect(
      (
        await sendEnquiry(ok, {
          elapsed: 9000,
          fetcher: reply(429, { ok: false, message: "Slow down" }),
        })
      ).kind,
    ).toBe("failed");
    const offline = vi.fn().mockRejectedValue(new TypeError("Failed to fetch"));
    expect((await sendEnquiry(ok, { elapsed: 9000, fetcher: offline })).kind).toBe("failed");
  });
});
