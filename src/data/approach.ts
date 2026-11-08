// Our Approach — "How does EhsanX put its beliefs into practice?"
// Every statement is existing site copy or taken from the EhsanX Company Profile (page noted as
// "p.N"). Lines marked TRANSITION or HEADING are new connective/structural wording written for this
// page from those sources; they introduce no new process, service, timeline or outcome.
import { images } from "@/lib/image-assets";
import type { SitePath } from "@/lib/site";

export type ApproachPhase = "insight" | "action" | "reflection";
export type ApproachStep = {
  number: string;
  id: string;
  title: string;
  phase: ApproachPhase;
  /** The stage's purpose, as stated in the profile's method diagram (p.9). */
  purpose: string;
  /** What the stage involves, drawn from the profile pages noted per line. */
  involves: string[];
  /** Optional supporting list shown with the stage. */
  list?: { label: string; items: string[] };
  /** TRANSITION: how this stage leads into the next. */
  leadsTo: { number: string; title: string; text: string };
};

const steps: ApproachStep[] = [
  {
    number: "01",
    id: "listen",
    title: "Listen",
    phase: "insight",
    purpose: "Understand the organization's context, challenges, aspiration, and opportunities.",
    involves: [
      // p.3
      "Each Executive Leadership Dialogue is designed specifically around the organization's context, challenges, and strategic priorities.",
      // p.3
      "Executive Leadership Dialogues create strategic alignment among senior decision-makers around the opportunities and challenges facing the organization.",
    ],
    leadsTo: {
      number: "02",
      title: "Diagnose",
      text: "What is learned about the organization’s context, challenges and aspirations becomes the basis for the diagnosis.",
    },
  },
  {
    number: "02",
    id: "diagnose",
    title: "Diagnose",
    phase: "insight",
    purpose: "Identify critical areas where improvement can create value.",
    involves: [
      // p.2
      "Many organizations struggle with challenges such as:",
    ],
    list: {
      label: "Common challenges",
      // p.2 "Why Organizations Struggle"
      items: [
        "Limited ownership, initiative, and entrepreneurial thinking",
        "Short-term leadership and limited future readiness",
        "Siloed teams and weak collaboration",
        "Resource constraints that limit innovation and growth",
        "Weak engagement, purpose, and innovation culture",
        "Difficulty adapting to technological and AI-driven change",
      ],
    },
    leadsTo: {
      number: "03",
      title: "Design",
      text: "The critical areas identified here set the priorities each intervention is designed around.",
    },
  },
  {
    number: "03",
    id: "design",
    title: "Design",
    phase: "action",
    purpose: "Develop customized interventions aligned with organizational priorities.",
    involves: [
      // p.4
      "Every programme is customized to the organization's strategy, industry, challenges, and transformation priorities.",
      // p.3
      "EhsanX works closely with owners and senior decision-makers to design and facilitate each intervention.",
    ],
    list: {
      label: "Executive interventions may take the form of",
      // p.3
      items: [
        "A focused leadership dialogue",
        "An executive workshop",
        "A strategy session",
        "A leadership retreat",
      ],
    },
    leadsTo: {
      number: "04",
      title: "Implement",
      text: "Each intervention is then delivered as practical learning linked to participants’ real responsibilities.",
    },
  },
  {
    number: "04",
    id: "implement",
    title: "Implement",
    phase: "action",
    purpose: "Engage participants in practical learning linked to real responsibilities.",
    involves: [
      // p.4
      "Rather than conventional management training, participants work on real organizational challenges, applying new ideas and tools directly within their workplace and learning from the results.",
      // p.4
      "Between workshops, participants apply their learning to real workplace challenges and experiment with new approaches.",
      // p.6
      "Programmes are supported through coaching, mentoring, and follow-up.",
    ],
    leadsTo: {
      number: "05",
      title: "Reflect & Improve",
      text: "Progress made in real work settings is then reviewed, and the lessons are captured.",
    },
  },
  {
    number: "05",
    id: "reflect",
    title: "Reflect & Improve",
    phase: "reflection",
    purpose: "Review progress, capture lessons, and build continuous improvement capabilities.",
    involves: [
      // p.4
      "Participants reflect on results and bring their experiences back to subsequent sessions. This creates a continuous cycle of Learn → Apply → Reflect → Improve, enabling learning to translate into meaningful changes in individual behavior, team performance, and organizational outcomes.",
      // p.5
      "Through continued coaching, reflection, experimentation, and implementation, EhsanX helps leaders solve real business challenges, embed new ways of working, and build a lasting culture of purpose, entrepreneurial thinking, innovation, collaboration, and service.",
    ],
    leadsTo: {
      number: "01",
      title: "Listen",
      text: "Lessons carry into the next cycle, building the internal capability needed for continuous improvement.",
    },
  },
];

export const approach = {
  meta: {
    title: "Our Approach | Listen, Diagnose, Design, Implement | EhsanX",
    description:
      "A practical, collaborative and reflective process that moves organizations from insight to action and builds lasting internal capability.",
  },
  hero: {
    eyebrow: "Our Approach",
    title: "How We Work",
    line: "At EhsanX, transformation begins with understanding.",
    // p.9 "a practical, collaborative, and reflective process"
    qualities: ["Practical", "Collaborative", "Reflective"],
    image: {
      ...images.approach_dialogue,
      alt: "Dr Shahid Qureshi facilitating a dialogue with seated participants in an EhsanX session.",
    },
  },
  intro: {
    eyebrow: "The Approach",
    // p.9
    text: "At EhsanX, transformation begins with understanding. Our approach is designed to move organizations from insight to action through a practical, collaborative, and reflective process. Each step helps leaders and teams identify what matters most, design meaningful interventions, apply learning in real work settings, and build the internal capability needed for continuous improvement.",
  },
  bridge: {
    eyebrow: "Rooted in our philosophy",
    // p.2
    statement:
      "At EhsanX, we believe that sustainable institutional transformation begins by developing people.",
    // p.8
    text: "The E-Plus Model guides how EhsanX develops purpose-driven leaders, entrepreneurial teams, and institutions capable of creating meaningful value.",
    link: { label: "Read our philosophy", to: "/philosophy" as SitePath },
  },
  method: {
    eyebrow: "The Method",
    title: "Listen. Diagnose. Design. Implement. Reflect & Improve.",
    // HEADING: phase labels taken from the intro, "from insight to action through a … reflective process" (p.9)
    phases: [
      { id: "insight" as const, label: "Insight", steps: ["01", "02"] },
      { id: "action" as const, label: "Action", steps: ["03", "04"] },
      { id: "reflection" as const, label: "Reflection", steps: ["05"] },
    ],
    stagesEyebrow: "Stage by stage", // HEADING
  },
  steps,
  practice: {
    eyebrow: "In practice", // HEADING
    title: "Learning applied where the work happens.", // HEADING (summarises the case studies' "Learning by Doing")
    link: { label: "See all client impact", to: "/client-impact" as SitePath },
  },
  engagements: {
    eyebrow: "Working with EhsanX", // HEADING
    title: "How engagements unfold", // HEADING
    // p.6
    intro:
      "Unlike traditional training providers, EhsanX combines leadership development, entrepreneurial thinking, organizational transformation, and practical implementation into an integrated approach.",
    items: [
      {
        name: "Executive Leadership Dialogues",
        // p.3
        audience: "Owners, CEOs, boards, and senior executives",
        format:
          "A focused leadership dialogue, executive workshop, strategy session, or leadership retreat",
        role: "Can serve as the starting point for deeper organizational transformation.",
      },
      {
        name: "Leadership Development & Transformation Programmes",
        // p.4
        audience: "Senior and middle management",
        format:
          "A series of highly interactive workshops, conducted bi-weekly over two to four months",
        role: "Participants move continuously between learning and application.",
      },
      {
        name: "Organizational Transformation Partnerships",
        // p.5
        audience: "Leadership teams, as long-term transformation partners",
        format:
          "Executive coaching, team coaching, action learning projects and organizational change support",
        role: "Typically longer-term engagements, often building upon an initial two- to three-month programme.",
      },
    ],
    link: { label: "Explore our solutions", to: "/solutions" as SitePath },
  },
  difference: {
    eyebrow: "The EhsanX Difference",
    // p.10
    title: "From Capability Building to Human Flourishing",
    intro:
      "We believe organizations perform at their best when people grow, contribute, and find meaning in their work.",
    shifts: [
      {
        from: "Training",
        to: "Transformation",
        text: "We focus on sustained change rather than isolated events.",
      },
      {
        from: "Generic Content",
        to: "Customized Solutions",
        text: "Every engagement is designed around the client's context.",
      },
      {
        from: "Theory",
        to: "Application",
        text: "Participants address real organizational challenges.",
      },
      {
        from: "External Dependency",
        to: "Internal Capability",
        text: "We help organizations build their own change agents.",
      },
      {
        from: "Profit Alone",
        to: "Purpose and Performance",
        text: "We believe organizations perform best when excellence is aligned with meaning and contribution.",
      },
    ],
  },
  principle: {
    eyebrow: "Why it works",
    title: "Grounded in your real context. Connected to practical outcomes.",
    // p.9
    copy: "This process ensures that every engagement is grounded in the organization's real context and connected to practical outcomes. By combining reflection, implementation, and capability building, EhsanX helps transformation continue beyond the program itself.",
  },
};
