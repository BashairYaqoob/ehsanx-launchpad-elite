import { createFileRoute } from "@tanstack/react-router";
import { PhilosophyPage } from "@/components/philosophy/PhilosophyPage";
import { philosophy } from "@/data/philosophy";
import { pageHead } from "@/lib/site";

export const Route = createFileRoute("/philosophy")({
  head: () =>
    pageHead(philosophy.meta.title, philosophy.meta.description, "/philosophy", [
      // Montserrat Light/Medium (brand-approved weights) for large editorial statements.
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Montserrat:wght@300;500&display=swap",
      },
    ]),
  component: PhilosophyPage,
});
