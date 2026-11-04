import { createFileRoute } from "@tanstack/react-router";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("Contact | EhsanX", "Contact EhsanX for leadership development and organizational solutions by WhatsApp, email or enquiry form.", "/contact"),
  component: ContactPage,
});

// Uses the normal root footer; no FinalCta here.
function ContactPage() {
  return (
    <div className="overflow-x-clip bg-wash">
      <section className="pb-16 pt-[calc(5rem+48px)] md:pb-24 md:pt-[calc(5rem+88px)]">
        <div className="mx-auto grid w-full max-w-[1280px] gap-12 px-6 md:px-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-[Inter] text-[13px] font-semibold uppercase tracking-[0.14em] text-teal">Contact</p>
            <h1 className="mt-5 font-[Montserrat] text-[clamp(2.2rem,4.4vw,3.75rem)] font-bold leading-[1.1] text-navy [text-wrap:balance]">Let's Start a Conversation.</h1>
            <div aria-hidden="true" className="mt-8 h-px w-16 bg-gold" />
            <p className="mt-8 max-w-[52ch] font-[Inter] text-[18px] leading-[1.7] text-ink">
              Whether you're looking to strengthen leadership, develop your people, or explore new possibilities for your organization, we'd be glad to hear from you.
            </p>
            <div className="mt-10"><ContactMethods /></div>
          </div>
          <div className="min-w-0 lg:col-span-7"><EnquiryForm /></div>
        </div>
      </section>
    </div>
  );
}
