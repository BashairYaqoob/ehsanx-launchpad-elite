// Single source for Client Impact content: the Home totals and the /client-impact case studies
// both read from here, and every figure shown is derived from the client records below.
// Facts are checked against the EhsanX Company Profile (pp. 11–14). Ahmad Jamal Textile
// Processing is qualitative only: never add figures for it.
import kfc from "@/assets/kfc-logo.webp";
import pci from "@/assets/pci-logo.png";
import aj from "@/assets/aj-logo.webp";

export type ImpactFigure = { value: number; prefix?: string; label: string };
export type ImpactClient = {
  name: string;
  logo: string;
  multiply?: boolean;
  employeesInfluenced?: { value: number; approximate?: boolean };
  participants?: number;
  /** The participant count is an approximation ("approximately 50"). */
  participantsApproximate?: boolean;
  participantRole?: string;
  cities?: string[];
  cohorts?: number;
  months?: number;
  departments?: string[];
  delivery?: string;
  duration?: string;
  directReach?: { value: number; label: string };
  indirectImpact?: { value: number; approximate: boolean; label: string };
  summary?: string;
  primary?: ImpactFigure;
  secondary?: ImpactFigure;
  details?: { label: string; value?: string; chips?: string[] }[];
};

const kfcClient: ImpactClient = {
  name: "KFC Pakistan",
  logo: kfc,
  employeesInfluenced: { value: 12000, approximate: true },
  participants: 180,
  participantRole: "Restaurant General Managers",
  cities: ["Karachi", "Lahore", "Islamabad"],
  cohorts: 3,
  months: 4,
  delivery: "3 regional cohorts",
  duration: "4-month leadership journey",
  directReach: { value: 180, label: "leaders" },
  indirectImpact: { value: 12000, approximate: true, label: "employees influenced" },
  primary: { value: 12000, prefix: "~", label: "Employees Influenced" },
  secondary: { value: 180, label: "Leaders" },
};

// Profile p. 12: "approximately 50 senior and middle managers from seven different departments
// i.e. operations, production, engineering, quality, supply chain, HR, and administration".
const pciDepartments = [
  "Operations",
  "Production",
  "Engineering",
  "Quality",
  "Supply Chain",
  "HR",
  "Administration",
];
const pciClient: ImpactClient = {
  name: "PCI",
  logo: pci,
  multiply: true,
  participants: 50,
  participantsApproximate: true,
  participantRole: "Senior & Middle Managers",
  departments: pciDepartments,
  primary: { value: 50, prefix: "~", label: "Participants: Senior & Middle Managers" },
  details: [
    { label: "Industry", value: "Automotive Manufacturing" },
    { label: "Departments", chips: pciDepartments },
    { label: "Approach", value: "Learning + Workplace Application + Coaching" },
  ],
};

const ajClient: ImpactClient = {
  name: "Ahmad Jamal",
  logo: aj,
  summary:
    "Dr. Shahid facilitated an Executive Leadership Dialogue with the founders and family leadership team, introducing the principles of Entrepreneurial Leadership, Innovation, and Effectuation. Through interactive discussions and practical business examples, participants explored how entrepreneurial thinking can strengthen leadership, improve decision-making, and unlock opportunities using existing organizational resources.",
};

export const clientImpact: ImpactClient[] = [kfcClient, pciClient, ajClient];

const totalsFormatter = new Intl.NumberFormat("en-US");

/** Formats a count, prefixing "~" when the source gives it as an approximation. */
export function formatCount(value: number, approximate = false) {
  return `${approximate ? "~" : ""}${totalsFormatter.format(value)}`;
}

export function combinedImpact(clients: readonly ImpactClient[] = clientImpact) {
  let leaders = 0;
  let leadersApproximate = false;
  let employees = 0;
  let employeesApproximate = false;
  for (const c of clients) {
    if (c.participants !== undefined) {
      leaders += c.participants;
      leadersApproximate = leadersApproximate || !!c.participantsApproximate;
    }
    if (c.employeesInfluenced) {
      employees += c.employeesInfluenced.value;
      employeesApproximate = employeesApproximate || !!c.employeesInfluenced.approximate;
    }
  }
  // Only cities named in the records are counted, so the figure is shown exactly (no "+").
  const cities = new Set(clients.flatMap((client) => client.cities ?? [])).size;
  return {
    cities: { value: cities, label: "Cities reached", display: formatCount(cities) },
    leaders: {
      value: leaders,
      label: "Leaders and managers developed",
      display: formatCount(leaders, leadersApproximate),
    },
    employees: {
      value: employees,
      label: "Employees influenced",
      display: formatCount(employees, employeesApproximate),
    },
  };
}

// ---- /client-impact case studies ----

export const impactHero = {
  eyebrow: "CLIENT IMPACT",
  title: "Real Organizations. Real Challenges. Meaningful Change.",
  intro:
    "Every organization has its own challenges, ambitions, and opportunities. Through leadership development, entrepreneurial thinking, and practical application, EhsanX works with organizations to develop people, strengthen capabilities, and create meaningful impact.",
  alt: "EhsanX programme participants gathered with Dr Shahid Qureshi for a group photograph at a venue entrance",
};

export const engagementIndex = [
  {
    id: "kfc",
    name: "KFC Pakistan",
    short: "KFC",
    descriptor: "Entrepreneurial Leadership",
    logo: "kfc",
  },
  {
    id: "pci",
    name: "PCI Automotive",
    short: "PCI",
    descriptor: "Automotive Manufacturing",
    logo: "pci",
  },
  {
    id: "ahmad-jamal",
    name: "Ahmad Jamal Textile Processing",
    short: "Ahmad Jamal",
    descriptor: "Executive Leadership Dialogue",
    logo: "aj",
  },
] as const;

export type Metric = { value: string; label: string; note?: string };

const kfcEmployees = kfcClient.employeesInfluenced ?? { value: 0 };

export const kfcCase = {
  id: "kfc",
  eyebrow: "KFC PAKISTAN · ENTREPRENEURIAL LEADERSHIP",
  title: "Transforming Restaurant Managers into Entrepreneurial Leaders.",
  challenge: [
    "KFC wanted to strengthen the entrepreneurial mindset, leadership capability and innovation capacity of its Restaurant General Managers (RGMs).",
    "These experienced leaders managed restaurant operations, customer experience, profitability and teams of approximately 50–100 people. The objective was to build sustained motivation, continuous improvement, ownership and innovation.",
  ],
  /** The cohort cities, from the client record (the programme sentence names the same three). */
  cities: kfcClient.cities ?? [],
  /** Restates "teams of approximately 50–100 people" from the challenge as a figure. */
  teamSize: { value: "50–100", label: "People in each RGM's team", note: "Approximately" },
  programme:
    "A customized Entrepreneurial Leadership and Innovation programme, rolled out nationally across three regional cohorts in Karachi, Lahore and Islamabad.",
  learningAreasLabel: "Eight Learning Areas",
  learningAreas: [
    "Entrepreneurial Mindset & Ownership",
    "Leadership & Team Development",
    "Innovation Under Constraints",
    "Customer Experience",
    "Operational Excellence",
    "Commercial Awareness",
    "Personal Leadership",
    "Continuous Improvement",
  ],
  learningByDoing:
    "Participants applied the learning between sessions in their restaurants. They worked on improvement initiatives, conducted experiments, coached their teams and applied new approaches to operational challenges.",
  metrics: [
    { value: formatCount(kfcClient.participants ?? 0), label: "RGMs" },
    { value: formatCount(kfcClient.cohorts ?? 0), label: "Regional cohorts" },
    { value: formatCount(kfcClient.months ?? 0), label: "Months" },
    {
      value: formatCount(kfcEmployees.value, kfcEmployees.approximate),
      label: "Employees indirectly influenced",
      note: "Through participating managers, not direct participants",
    },
  ] as Metric[],
  whyItWorked: [
    "Entrepreneurial mindset rather than conventional training alone.",
    "Real workplace projects and practical application.",
    "Coaching, experimentation and ownership.",
    "A focus on sustainable leadership and organizational impact.",
  ],
  takeawayLabel: "Editorial takeaway",
  takeaway:
    "Every Restaurant General Manager became more than an operational manager — they became a coach, an innovator, and a developer of people.",
  imageAlt: "KFC Pakistan Restaurant General Managers during an EhsanX programme session",
};

export const pciCase = {
  id: "pci",
  eyebrow: "PCI AUTOMOTIVE · MANUFACTURING",
  title: "Developing Entrepreneurial Leaders in Manufacturing.",
  challenge: [
    "PCI, a leading automotive spare parts manufacturer, wanted to strengthen leadership, cross-functional collaboration and innovation in the face of competition, operational pressures and resource constraints.",
    "Managers needed to develop entrepreneurial thinking, ownership and the ability to create value using the resources and capabilities already available to them.",
  ],
  programme:
    "A customized Entrepreneurial Leadership and Innovation Programme for approximately 50 senior and middle managers across seven departments.",
  departments: pciDepartments,
  learningAreasLabel: "Seven Learning Areas",
  learningAreas: [
    "Entrepreneurial Mindset & Effectual Thinking",
    "Leadership & Ownership",
    "Innovation Under Constraints",
    "Team Collaboration & Communication",
    "Strategic Resourcefulness",
    "Problem Solving",
    "Continuous Improvement",
  ],
  learningByDoing:
    "Participants worked with real organizational challenges, explored practical improvements, strengthened cross-functional collaboration and applied learning in their workplace.",
  metrics: [
    {
      value: formatCount(pciClient.participants ?? 0, pciClient.participantsApproximate),
      label: "Managers",
    },
    { value: formatCount(pciDepartments.length), label: "Departments" },
    { value: "Automotive", label: "Manufacturing" },
    { value: "Learning", label: "+ Workplace Application + Coaching" },
  ] as Metric[],
  whyItWorked: [
    "Entrepreneurial mindset and ownership.",
    "Stronger cross-functional collaboration.",
    "Practical innovation.",
    "Making better use of existing resources, knowledge, people and capabilities.",
  ],
  takeawayLabel: "Key takeaway",
  takeaway:
    "Innovation does not always require additional resources. It often begins with using existing knowledge, people, relationships and capabilities more effectively.",
  imageAlt: "PCI Automotive managers taking part in an EhsanX leadership programme",
};

export const ajCase = {
  id: "ahmad-jamal",
  eyebrow: "AHMAD JAMAL TEXTILE PROCESSING · EXECUTIVE LEADERSHIP DIALOGUE",
  title: "Creating New Perspectives on Entrepreneurial Leadership.",
  challenge:
    "A leading textile processing company was preparing its leaders for a competitive, uncertain and changing environment. Founders and next-generation family leaders sought fresh perspectives on entrepreneurial leadership, innovation and sustainable growth.",
  engagement: [
    "Dr Shahid facilitated an Executive Leadership Dialogue with the founders and family leadership.",
    "The dialogue introduced Entrepreneurial Leadership, Innovation and Effectuation, supported by discussions and business examples around leadership, decision-making and recognizing opportunities through existing resources.",
  ],
  dialogueIntro: "An executive dialogue and organizational reflection covering:",
  dialogueTopics: [
    "Effectuation.",
    "Innovation.",
    "Entrepreneurial leadership.",
    "Long-term growth.",
    "Community impact.",
  ],
  takeawayLabel: "Editorial takeaway",
  takeaway:
    "Entrepreneurial leadership begins when leaders stop waiting for perfect conditions and start creating opportunities with the people, resources, and relationships they already have.",
};
