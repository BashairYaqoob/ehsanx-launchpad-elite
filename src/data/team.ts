// Single source for the Meet the Team page. The wording follows the approved biographies; entries
// are split into fields (a degree and its institution, a role and its venture) only so the page
// can set them differently. Do not add facts that are not in the biographies.

export type ProfileLink = {
  label: string;
  href: string;
};

/** A degree split into its level (set large), the field and the awarding institution. */
export type Degree = { level: string; field: string; institution: string };

/** "PhD in Entrepreneurship and Innovation", rebuilt from its parts. */
export const degreeName = (degree: Degree) =>
  degree.field ? `${degree.level} in ${degree.field}` : degree.level;

export type CareerMilestone = {
  period: string;
  role: string;
  institution: string;
  paragraphs: string[];
  /** A recognition earned in this role, shown against it on the timeline. */
  award?: { period: string; title: string; text: string };
};

/** A fact from the biography set as a figure, with the sentence it comes from as its label. */
export type Highlight = { value: string; label: string };

type BaseLeader = {
  id: string;
  name: string;
  title: string;
  overview: string;
  portraitAlt: string;
  affiliations: string[];
  links: ProfileLink[];
};

export type Founder = BaseLeader & {
  expertise: string[];
  highlights: Highlight[];
  milestones: CareerMilestone[];
  credentials: { label: string; degrees: Degree[]; distinctions: string[] };
  teaching: {
    label: string;
    intro: string;
    /** Grouped by the country each institution is in. */
    regions: { region: string; institutions: string[] }[];
    areas: string;
    executive: string;
  };
  corporate: { label: string; paragraphs: string[] };
  research: { label: string; text: string };
  focusAreas: { label: string; items: string[] };
};

export type Director = BaseLeader & {
  role: { label: string; text: string };
  learningDesign: { label: string; text: string };
  engagements: { label: string; intro: string; items: string[] };
  ventures: {
    label: string;
    /** `site` names where the link goes, so a reader knows before following it. */
    items: { role: string; name: string; href: string; site: string }[];
  };
  background: { label: string; degrees: Degree[] };
  expertise: { label: string; items: string[] };
};

export const teamHero = {
  eyebrow: "TEAM EHSANX",
  title: "Leadership shaped by experience. Transformation grounded in people.",
  intro:
    "EhsanX is led by Dr Muhammad Shahid Qureshi and Dr Ambreen Rasheed Khan, who bring together industry, academic and corporate training experience in leadership, entrepreneurship and learning design.",
  alt: "Dr Muhammad Shahid Qureshi and Dr Ambreen Rasheed Khan, the leadership team of EhsanX",
};

export const founder: Founder = {
  id: "dr-shahid",
  name: "Engr. Prof. Dr. Muhammad Shahid Qureshi",
  title: "Founder, EhsanX",
  expertise: [
    "Entrepreneurial Leadership",
    "Corporate Strategy",
    "Innovation",
    "High-Performance Teams",
    "Organizational Transformation",
  ],
  overview:
    "Dr Shahid brings more than 30 years of experience across industry, corporate management, higher education and organizational transformation. He is an internationally experienced entrepreneurship educator, strategic advisor, executive trainer and institutional leader.",
  portraitAlt: "Portrait of Engr. Prof. Dr. Muhammad Shahid Qureshi, Founder of EhsanX",
  affiliations: ["IBA Karachi", "Babson Fellow", "Technical University of Berlin"],
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dr-shahid-qureshi-87431717/" },
    { label: "Academic website", href: "https://drshahidqureshi.com/" },
  ],
  // Each figure restates a sentence below: the overview, the IBA and GIFT milestones and the award.
  highlights: [
    { value: "30+", label: "Years across industry, corporate management and higher education" },
    { value: "2010–2022", label: "Director, Centre for Entrepreneurial Development, IBA Karachi" },
    { value: "2017 & 2021", label: "USASBE Outstanding Entrepreneurship Program Award for CED" },
    { value: "~8,000", label: "Students in the GIFT University community he led as Rector" },
  ],
  milestones: [
    {
      period: "Early career",
      role: "Strategic planning, management and operations",
      institution: "WAPDA · Kot Addu Power Company (KAPCO)",
      paragraphs: [
        "He began his career at WAPDA and subsequently worked at Kot Addu Power Company (KAPCO), contributing to strategic planning, management, operations and organizational performance.",
      ],
    },
    {
      period: "2010 — 2022",
      role: "Director, Centre for Entrepreneurial Development (CED) & Professor",
      institution: "IBA Karachi",
      paragraphs: [
        "From 2010 to 2022, he served as Director of the Centre for Entrepreneurial Development (CED) and Professor at IBA Karachi.",
      ],
      award: {
        period: "2017 & 2021",
        title: "USASBE Outstanding Entrepreneurship Program Award",
        text: "Under his leadership, CED received the USASBE Outstanding Entrepreneurship Program Award in 2017 and 2021.",
      },
    },
    {
      period: "Later appointment",
      role: "Professor of Entrepreneurship & Rector (Vice Chancellor)",
      institution: "GIFT University, Gujranwala",
      paragraphs: [
        "He later served as Professor of Entrepreneurship and Rector (Vice Chancellor) at GIFT University, Gujranwala. His initiatives focused on entrepreneurial culture, leadership, faculty capacity, innovation and institutional transformation within a university community of approximately 8,000 students.",
      ],
    },
  ],
  credentials: {
    label: "Academic Credentials and Distinctions",
    degrees: [
      {
        level: "PhD",
        field: "Entrepreneurship and Innovation",
        institution: "Technical University of Berlin",
      },
      { level: "MBA", field: "", institution: "Lahore University of Management Sciences (LUMS)" },
      {
        level: "MSc",
        field: "Industrial and Manufacturing Systems Engineering",
        institution: "Asian Institute of Technology, Thailand",
      },
      {
        level: "BSc",
        field: "Mechanical Engineering",
        institution: "University of Engineering and Technology (UET), Lahore",
      },
    ],
    distinctions: [
      "Babson Fellow.",
      "Specialized training in entrepreneurship education and pedagogy.",
      "Harvard Business School professional development in participant-centered learning and case-method approaches.",
    ],
  },
  teaching: {
    label: "International Teaching and Executive Education",
    intro: "His teaching and professional contributions include:",
    regions: [
      {
        region: "Germany",
        institutions: [
          "Technical University of Berlin",
          "ESCP Business School Berlin",
          "Frankfurt School of Finance & Management",
          "Kempten University of Applied Sciences",
        ],
      },
      {
        region: "United Arab Emirates",
        institutions: ["SP Jain School of Global Management, Dubai"],
      },
      { region: "France", institutions: ["Toulouse Business School"] },
      { region: "Pakistan", institutions: ["IBA Karachi"] },
    ],
    areas:
      "His teaching areas include strategic management, entrepreneurship, entrepreneurial marketing, innovation, leadership and business transformation.",
    executive:
      "At ESCP Berlin, he contributed to executive education for directors and senior professionals from Eastern Europe.",
  },
  corporate: {
    label: "Corporate and Executive Work",
    paragraphs: [
      "His corporate programme experience includes work with KFC Pakistan, covering entrepreneurial leadership, operational excellence, customer value, high-performance teams, cost management and profitability.",
      "His work also involves CEOs, senior executives, entrepreneurs, family businesses, SMEs and corporations.",
    ],
  },
  research: {
    label: "Research and International Engagement",
    text: "His research and international engagement includes work with Prof. Sarfraz Mian, international networks, Global Entrepreneurship Monitor Pakistan and entrepreneurship development, SME and leadership initiatives across countries.",
  },
  focusAreas: {
    label: "EhsanX Focus Areas",
    items: [
      "Corporate Strategy and Business Growth.",
      "Entrepreneurial Leadership and Innovation.",
      "High-Performance Teams.",
      "Operational and Business Excellence.",
      "Leadership and Organizational Transformation.",
    ],
  },
};

export const director: Director = {
  id: "dr-ambreen",
  name: "Engr. Dr. Ambreen Rasheed Khan",
  title: "Director, Learning Design & Corporate Training",
  overview:
    "Dr Ambreen leads learning design, corporate training and capacity development at EhsanX, bringing together technical rigor, academic depth, entrepreneurial thinking and hands-on training.",
  portraitAlt:
    "Portrait of Engr. Dr. Ambreen Rasheed Khan, Director, Learning Design & Corporate Training at EhsanX",
  affiliations: ["IBA Karachi", "Putra Business School"],
  links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/ambreenrkhan/" }],
  role: {
    label: "Her Role at EhsanX",
    text: "At EhsanX, she designs practical, high-engagement learning experiences that strengthen entrepreneurial mindset, leadership, resilience, innovation and purposeful action.",
  },
  learningDesign: {
    label: "Learning Design",
    text: "She has developed programmes from the ground up, integrating entrepreneurial mindset, confidence, resilience, communication, leadership, creativity, business fundamentals and personal development.",
  },
  engagements: {
    label: "Professional Experience and Engagements",
    intro:
      "She has designed and delivered entrepreneurship, leadership, innovation, life skills, marketing, negotiation and capacity-building programmes across academia, corporate training and the development sector. Her engagements include:",
    items: [
      "IBA Karachi",
      "SZABIST",
      "IoBM",
      "IIEE",
      "KFC Pakistan",
      "SMEDA",
      "UNDP",
      "GIZ",
      "Dalda Foundation",
      "Akhuwat Institute, Kasur",
    ],
  },
  ventures: {
    label: "Entrepreneurial Work",
    items: [
      { role: "Founder", name: "AURA360", href: "https://aura360.org/", site: "aura360.org" },
      {
        role: "Co-founder",
        name: "Hijab-al-Firdaus",
        href: "https://www.instagram.com/hijabalfirdaus/",
        site: "Instagram",
      },
    ],
  },
  background: {
    label: "Academic Background",
    degrees: [
      {
        level: "BS",
        field: "Computer Systems Engineering",
        institution: "Sir Syed University of Engineering and Technology (SSUET)",
      },
      { level: "MBA", field: "Corporate Management", institution: "IBA Karachi" },
      {
        level: "PhD",
        field: "Entrepreneurship Management",
        institution: "Putra Business School, Malaysia",
      },
    ],
  },
  expertise: {
    label: "Areas of Expertise",
    items: [
      "Curriculum and programme design.",
      "Workshop facilitation.",
      "Teacher development.",
      "Startup mentoring.",
      "Entrepreneurial marketing.",
      "Leadership and negotiation.",
      "Innovation and capacity building.",
      "Customer-service mindset.",
      "Performance management.",
      "Coaching and resilience.",
    ],
  },
};
