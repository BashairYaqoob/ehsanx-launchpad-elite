// Detailed case-study copy for the /client-impact page.
// Home's combinedImpact() keeps reading src/data/clientImpact.ts unchanged.

export const impactHero = {
  eyebrow: "CLIENT IMPACT",
  title: "Real Organizations. Real Challenges. Meaningful Change.",
  intro:
    "Every organization has its own challenges, ambitions, and opportunities. Through leadership development, entrepreneurial thinking, and practical application, EhsanX works with organizations to develop people, strengthen capabilities, and create meaningful impact.",
  alt: "EhsanX programme participants gathered for a group photograph outside a training venue",
};

export const engagementIndex = [
  { id: "kfc", name: "KFC Pakistan", descriptor: "Entrepreneurial Leadership", logo: "kfc" },
  { id: "pci", name: "PCI Automotive", descriptor: "Automotive Manufacturing", logo: "pci" },
  { id: "ahmad-jamal", name: "Ahmad Jamal Textile Processing", descriptor: "Executive Leadership Dialogue", logo: "aj" },
] as const;

export type Metric = { value: string; label: string; note?: string };

export const kfcCase = {
  id: "kfc",
  eyebrow: "KFC PAKISTAN · ENTREPRENEURIAL LEADERSHIP",
  title: "Transforming Restaurant Managers into Entrepreneurial Leaders.",
  challenge: [
    "KFC wanted to strengthen the entrepreneurial mindset, leadership capability and innovation capacity of its Restaurant General Managers (RGMs).",
    "These experienced leaders managed restaurant operations, customer experience, profitability and teams of approximately 50–100 people. The objective was to build sustained motivation, continuous improvement, ownership and innovation.",
  ],
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
    { value: "180", label: "RGMs" },
    { value: "3", label: "Regional cohorts" },
    { value: "4", label: "Months" },
    { value: "~12,000", label: "Employees indirectly influenced", note: "Through participating managers, not direct participants" },
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
  departments: ["Operations", "Production", "Engineering", "Quality", "Supply Chain", "HR", "Administration"],
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
    { value: "~50", label: "Managers" },
    { value: "7", label: "Departments" },
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
  dialogueTopics: ["Effectuation.", "Innovation.", "Entrepreneurial leadership.", "Long-term growth.", "Community impact."],
  takeawayLabel: "Editorial takeaway",
  takeaway:
    "Entrepreneurial leadership begins when leaders stop waiting for perfect conditions and start creating opportunities with the people, resources, and relationships they already have.",
};
