export type Offering = {
  id: string;
  numeral: string;
  color: "navy" | "teal" | "gold";
  title: string;
  subtitle: string;
  paragraphs: string[];
  listLabel: string;
  list: string[];
  closing: string;
  learnLine?: string;
};

export const solutionsHero = {
  eyebrow: "SOLUTIONS",
  title: "From training to transformation.",
  imageAlt: "A glowing light bulb with a brain inside, held above an open hand",
};

export const solutionsIntro =
  "Unlike traditional training providers, EhsanX combines leadership development, entrepreneurial thinking, organizational transformation, and practical implementation into an integrated approach.";

export const offerings: Offering[] = [
  {
    id: "dialogues",
    numeral: "01",
    color: "navy",
    title: "Executive Leadership Dialogues",
    subtitle: "Inspiring Entrepreneurial Leaders",
    paragraphs: [
      "Designed for owners, CEOs, boards, and senior executives, these high-impact executive sessions help leadership teams rethink the future of their organizations, challenge conventional assumptions, and explore new approaches to leadership, innovation, AI, and institutional transformation.",
      "The dialogues create strategic alignment among senior decision-makers around the opportunities and challenges facing the organization and can serve as the starting point for deeper organizational transformation.",
    ],
    listLabel: "Topics include:",
    list: [
      "Entrepreneurial Leadership",
      "Leading Through Uncertainty",
      "Innovation Begins with People",
      "Building Purpose-Driven Organizations",
      "AI and the Future of Work",
      "The Future-Ready Organization: AI-Enabled Transformation",
    ],
    closing:
      "Each Executive Leadership Dialogue is designed specifically around the organization's context, challenges, and strategic priorities. EhsanX works closely with owners and senior decision-makers to design and facilitate the intervention, which may take the form of a focused leadership dialogue, executive workshop, strategy session, or leadership retreat.",
  },
  {
    id: "programmes",
    numeral: "02",
    color: "teal",
    title: "Leadership Development & Transformation Programmes",
    subtitle: "Developing Entrepreneurial Leaders and High-Performance Teams",
    paragraphs: [
      "These customized organizational learning journeys are designed for senior and middle management to develop entrepreneurial thinking, strengthen leadership capabilities, and build high-performing teams capable of driving innovation, transformation, and sustainable growth.",
      "Rather than conventional management training, participants work on real organizational challenges, applying new ideas and tools directly within their workplace and learning from the results.",
    ],
    listLabel: "Learning areas may include:",
    list: [
      "Entrepreneurial Mindset",
      "Entrepreneurial Leadership & Innovation",
      "Strategic Thinking",
      "Operational Excellence",
      "Financial Literacy for Managers",
      "Leading & Developing People",
      "Innovation & Design Thinking",
      "Customer Experience",
      "AI for Business & AI as a Capability Builder",
      "Strategic Resourcefulness",
    ],
    closing:
      "Every programme is customized to the organization's strategy, industry, challenges, and transformation priorities. Programmes typically combine a series of highly interactive workshops conducted bi-weekly over two to four months, allowing participants to move continuously between learning and application.",
    learnLine: "Learn → Apply → Reflect → Improve.",
  },
  {
    id: "partnerships",
    numeral: "03",
    color: "gold",
    title: "Organizational Transformation Partnerships",
    subtitle: "Building Entrepreneurial Organizations",
    paragraphs: [
      "Sustainable transformation requires more than training. It requires leadership commitment, continued application, coaching, and sustained implementation. EhsanX partners with organizations over an extended period to embed entrepreneurial leadership, strengthen organizational culture, develop internal capabilities, and translate learning into measurable organizational and business outcomes.",
    ],
    listLabel: "Partnership activities may include:",
    list: [
      "Executive Coaching",
      "Leadership Mentoring",
      "Team Coaching",
      "Innovation Initiatives",
      "Cross-Functional Collaboration",
      "Action Learning Projects",
      "Cultural Transformation",
      "Capability Development",
      "Organizational Change Support",
    ],
    closing:
      "Transformation Partnerships are typically longer-term engagements, often building upon an initial two- to three-month Leadership Development & Transformation Programme.",
  },
];

/** Each strand: tangled and fan paths share 4 cubic segments, anchored at the knot centre (500,140). */
export const strandPaths = [
  {
    tangled: "M500 140 C560 60 620 140 560 190 C500 240 420 200 440 140 C460 80 540 90 530 150 C520 210 450 230 470 170",
    fan: "M500 140 C470 200 400 230 340 270 C280 310 220 340 195 370 C180 390 172 405 170 415 C170 420 170 425 170 430",
    mobile: "M470 60 C470 100 470 100 470 120 C470 140 470 140 470 160 C470 180 470 180 470 200 C470 210 470 215 470 220",
  },
  {
    tangled: "M500 140 C440 70 380 130 420 180 C460 230 560 220 550 160 C540 100 450 110 470 170 C490 230 560 200 540 130",
    fan: "M500 140 C500 200 500 250 500 290 C500 330 500 360 500 380 C500 400 500 410 500 418 C500 422 500 426 500 430",
    mobile: "M500 60 C500 100 500 100 500 120 C500 140 500 140 500 160 C500 180 500 180 500 200 C500 210 500 215 500 220",
  },
  {
    tangled: "M500 140 C520 220 600 200 590 140 C580 80 470 60 450 120 C430 180 520 230 560 170 C600 110 520 90 490 100",
    fan: "M500 140 C530 200 600 230 660 270 C720 310 780 340 805 370 C820 390 828 405 830 415 C830 420 830 425 830 430",
    mobile: "M530 60 C530 100 530 100 530 120 C530 140 530 140 530 160 C530 180 530 180 530 200 C530 210 530 215 530 220",
  },
];

export const nodePositions = ["17%", "50%", "83%"];
