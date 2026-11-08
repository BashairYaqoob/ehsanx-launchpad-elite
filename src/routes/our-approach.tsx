import { createFileRoute } from "@tanstack/react-router";
import { ApproachPage } from "@/components/approach/ApproachPage";
import { approach } from "@/data/approach";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/our-approach")({
  head: () =>
    pageHead(approach.meta.title, approach.meta.description, "/our-approach", [
      // Montserrat Light/Medium (brand-approved weights) for large editorial statements.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap",
      },
    ]),
  component: ApproachPage,
});
