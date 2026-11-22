import { createFileRoute } from "@tanstack/react-router";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { CONTACT_EMAIL } from "@/lib/contact";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageHead(
      "Contact | EhsanX",
      "Contact EhsanX about leadership development and organizational transformation: send an enquiry, email us or message us on WhatsApp.",
      "/contact",
    ),
  component: ContactPage,
});

// Uses the normal root footer; no FinalCta here. The same editorial masthead as the other inner
// pages (navy band behind the navigation, page name on a rule, a large navy headline), with the
// enquiry form beside the invitation so it is in reach on the first screen.
function ContactPage() {
  return (
    <div className="overflow-x-clip bg-paper">
      <div aria-hidden="true" className="h-[calc(5rem+32px)] bg-navy-deep" />
      <section
        aria-labelledby="page-title"
        className="mx-auto w-full max-w-[1280px] px-6 pb-20 pt-10 md:px-10 md:pb-28 md:pt-14"
      >
        <div className="flex items-center justify-between gap-6 border-b border-navy/15 pb-4">
          <p className="flex items-center gap-3 font-display text-[12px] font-semibold uppercase tracking-[0.16em] text-teal md:text-[13px]">
            <span aria-hidden="true" className="h-px w-8 shrink-0 bg-gold" />
            Contact
          </p>
          <p className="hidden font-display text-[13px] font-semibold text-navy/60 md:block">
            {CONTACT_EMAIL}
          </p>
        </div>
        {/* Phones: invitation, form, then the direct lines. From lg: invitation and direct lines on
            the left, the form spanning both rows on the right. */}
        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-14 lg:gap-y-12">
          <div className="lg:col-span-5">
            <h1
              id="page-title"
              className="max-w-[12ch] font-display text-[clamp(2.4rem,4.2vw,3.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-navy [text-wrap:balance]"
            >
              Let's Start a Conversation.
            </h1>
            <p className="mt-8 max-w-[44ch] border-l-[3px] border-gold pl-6 font-[Inter] text-[18px] leading-[1.65] text-ink">
              Whether you're looking to strengthen leadership, develop your people, or explore new
              possibilities for your organization, we'd be glad to hear from you.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <EnquiryForm />
          </div>
          <div className="lg:col-span-5">
            <h2 className="font-[Montserrat] text-[15px] font-semibold text-navy">
              Or reach us directly
            </h2>
            <div className="mt-4">
              <ContactMethods />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
