import { Journey } from "./Journey";
import type { StackCard } from "./JourneyStack";
import { philosophy } from "@/data/philosophy";
import { images } from "@/lib/image-assets";

// Every line on the cards comes from the EhsanX philosophy (src/data/philosophy.ts): each element
// card carries the element's own descriptor, and the text-led card after it a related statement
// from the same source.
const descriptor = (title: string) =>
  philosophy.stages.find((stage) => stage.title === title)?.descriptor ?? "";
const belief = (title: string) =>
  philosophy.beliefs.find((item) => item.title === title)?.sentence ?? "";
const entrepreneurial =
  philosophy.model.foundations.find((item) => item.id === "entrepreneurial")?.role ?? "";

const cards: StackCard[] = [
  {
    name: "Leadership",
    lead: descriptor("Leadership"),
    tone: "navy",
    photo: {
      asset: images.eplus_leadership,
      alt: "A facilitator leads a discussion with KFC managers during an entrepreneurial leadership programme",
      position: "42% 40%",
      layout: "panel",
    },
    aside: { statement: belief("Excellence Through Service"), tone: "paper" },
  },
  {
    name: "Innovation",
    lead: descriptor("Innovation"),
    tone: "teal",
    photo: {
      asset: images.eplus_innovation,
      alt: "Participants build prototypes from modelling clay and spaghetti during a design workshop",
      position: "62% 50%",
      layout: "panel",
    },
    aside: { statement: entrepreneurial, tone: "gold" },
  },
  {
    name: "Value Creation",
    lead: descriptor("Value Creation"),
    tone: "paper",
    photo: {
      asset: images.eplus_value,
      alt: "Dr Shahid Qureshi presents the results of a KFC leadership programme to a room of managers",
      position: "38% 45%",
      layout: "panel",
    },
    aside: { statement: philosophy.intro.pullSentence, tone: "navy" },
  },
  {
    name: "Institutional Transformation",
    lead: descriptor("Institutional Transformation"),
    tone: "teal",
    photo: {
      asset: images.eplus_institutions,
      alt: "KFC restaurant managers work through an improvement plan together on coloured flip-chart sheets",
      position: "50% 45%",
      layout: "bleed",
    },
    aside: { statement: belief("People Before Processes"), tone: "gold" },
  },
  {
    name: "Human Flourishing",
    lead: descriptor("Human Flourishing"),
    note: philosophy.tagline,
    tone: "paper",
    photo: {
      asset: images.eplus_flourishing,
      alt: "Students gather around a bonfire on a university campus in the evening",
      position: "center 40%",
      layout: "full",
    },
  },
];

export function EPlus() {
  return (
    <Journey
      layout="stack"
      eyebrow="Our Philosophy"
      title="The E-Plus Model"
      subtitle="From leadership to human flourishing."
      intro="Every engagement is built on EhsanX’s own philosophy: the E-Plus Model. Explore how purpose, character, and entrepreneurial capability come together to create value that outlasts any single project."
      cards={cards}
      cta={{ label: "Explore the Full Model", to: "/philosophy" }}
    />
  );
}
