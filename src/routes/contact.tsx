import { createFileRoute } from "@tanstack/react-router";
import { ContactMethods } from "@/components/contact/ContactMethods";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => pageHead("Contact | EhsanX", "Contact EhsanX for leadership development and organizational solutions by WhatsApp, email or enquiry form.", "/contact"),
  component: ContactPage,
});

// Uses the normal root footer; no FinalCta here. A navy panel carries the invitation and the
// direct contact methods; the enquiry form sits on white beside it (below it on small screens).
function ContactPage() {
  return (
    <div className="overflow-x-clip bg-paper">
      <div aria-hidden="true" className="hidden h-20 bg-navy-deep lg:block" />
      <section>
        <div className="mx-auto grid w-full max-w-[1280px] lg:grid-cols-12">
          <div className="relative isolate bg-navy-deep px-6 pb-14 pt-[calc(5rem+48px)] text-paper md:px-10 md:pb-16 lg:col-span-5 lg:bg-transparent lg:py-24 lg:pr-14 before:absolute before:inset-y-0 before:right-0 before:-z-10 before:hidden before:w-[100vw] before:bg-navy-deep lg:before:block">
            <span aria-hidden="true" className="block h-px w-16 bg-gold" />
            <h1 className="mt-8 font-[Montserrat] text-[clamp(2.4rem,4.4vw,3.75rem)] font-bold leading-[1.08] text-paper [text-wrap:balance]">Let's Start a Conversation.</h1>
            <p className="mt-8 max-w-[44ch] font-[Inter] text-[18px] leading-[1.7] text-paper/90">
              Whether you're looking to strengthen leadership, develop your people, or explore new possibilities for your organization, we'd be glad to hear from you.
            </p>
            <div className="mt-12"><ContactMethods /></div>
          </div>
          <div className="min-w-0 px-6 py-14 md:px-10 md:py-16 lg:col-span-7 lg:py-24 lg:pl-16 xl:pl-20">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
