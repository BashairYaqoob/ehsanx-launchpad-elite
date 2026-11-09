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
      alt: "A participant adds notes to a wall of ideas during a training session on innovation, leadership and entrepreneurship",
      position: "30% center",
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
      alt: "Students present a windmill they built from newspaper during an entrepreneurial development workshop",
      position: "40% center",
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
      alt: "A participant presents an idea to a seated cohort during an entrepreneurship bootcamp",
      position: "60% center",
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
      alt: "The EhsanX team with a Pakistani university delegation outside Yeditepe University in Istanbul",
      position: "100% 65%",
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
