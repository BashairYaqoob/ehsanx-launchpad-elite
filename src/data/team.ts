export type ProfileBlock =
  | { kind: "text"; label: string; paragraphs: string[] }
  | { kind: "list"; label: string; intro?: string; items: string[]; after?: string[]; columns?: 1 | 2 };

export type Leader = {
  id: string;
  name: string;
  title: string;
  expertise?: string[];
  overview: string;
  portraitAlt: string;
  blocks: ProfileBlock[];
};

export const teamHero = {
  eyebrow: "TEAM EHSANX",
  title: "Leadership shaped by experience. Transformation grounded in people.",
  intro:
    "EhsanX is led by Dr Muhammad Shahid Qureshi and Dr Ambreen Rasheed Khan, who bring together industry, academic and corporate training experience in leadership, entrepreneurship and learning design.",
};

export const founder: Leader = {
  id: "dr-shahid",
  name: "Engr. Prof. Dr. Muhammad Shahid Qureshi",
  title: "Founder, EhsanX",
  expertise: ["Entrepreneurial Leadership", "Corporate Strategy", "Innovation", "High-Performance Teams", "Organizational Transformation"],
  overview:
    "Dr Shahid brings more than 30 years of experience across industry, corporate management, higher education and organizational transformation. He is an internationally experienced entrepreneurship educator, strategic advisor, executive trainer and institutional leader.",
  portraitAlt: "Portrait of Engr. Prof. Dr. Muhammad Shahid Qureshi, Founder of EhsanX",
  blocks: [
    {
      kind: "text",
      label: "Industrial and Corporate Experience",
      paragraphs: [
        "He began his career at WAPDA and subsequently worked at Kot Addu Power Company (KAPCO), contributing to strategic planning, management, operations and organizational performance.",
        "His work also involves CEOs, senior executives, entrepreneurs, family businesses, SMEs and corporations.",
      ],
    },
    {
      kind: "list",
      label: "International Teaching and Executive Education",
      intro: "His teaching and professional contributions include:",
      items: [
        "Technical University of Berlin",
        "ESCP Business School Berlin",
        "Frankfurt School of Finance & Management",
        "Kempten University of Applied Sciences",
        "SP Jain School of Global Management, Dubai",
        "Toulouse Business School",
        "IBA Karachi",
      ],
      columns: 2,
      after: [
        "His teaching areas include strategic management, entrepreneurship, entrepreneurial marketing, innovation, leadership and business transformation.",
        "At ESCP Berlin, he contributed to executive education for directors and senior professionals from Eastern Europe.",
        "His corporate programme experience includes work with KFC Pakistan, covering entrepreneurial leadership, operational excellence, customer value, high-performance teams, cost management and profitability.",
      ],
    },
    {
      kind: "text",
      label: "Institutional Leadership",
      paragraphs: [
        "From 2010 to 2022, he served as Director of the Centre for Entrepreneurial Development (CED) and Professor at IBA Karachi.",
        "Under his leadership, CED received the USASBE Outstanding Entrepreneurship Program Award in 2017 and 2021.",
        "He later served as Professor of Entrepreneurship and Rector (Vice Chancellor) at GIFT University, Gujranwala. His initiatives focused on entrepreneurial culture, leadership, faculty capacity, innovation and institutional transformation within a university community of approximately 8,000 students.",
        "His research and international engagement includes work with Prof. Sarfraz Mian, international networks, Global Entrepreneurship Monitor Pakistan and entrepreneurship development, SME and leadership initiatives across countries.",
      ],
    },
    {
      kind: "list",
      label: "Academic Credentials and Distinctions",
      items: [
        "PhD in Entrepreneurship and Innovation — Technical University of Berlin.",
        "MBA — Lahore University of Management Sciences (LUMS).",
        "MSc in Industrial and Manufacturing Systems Engineering — Asian Institute of Technology, Thailand.",
        "BSc in Mechanical Engineering — University of Engineering and Technology (UET), Lahore.",
        "Babson Fellow.",
        "Specialized training in entrepreneurship education and pedagogy.",
        "Harvard Business School professional development in participant-centered learning and case-method approaches.",
      ],
    },
    {
      kind: "list",
      label: "EhsanX Focus Areas",
      items: [
        "Corporate Strategy and Business Growth.",
        "Entrepreneurial Leadership and Innovation.",
        "High-Performance Teams.",
        "Operational and Business Excellence.",
        "Leadership and Organizational Transformation.",
      ],
    },
  ],
};

export const director: Leader = {
  id: "dr-ambreen",
  name: "Engr. Dr. Ambreen Rasheed Khan",
  title: "Director, Learning Design & Corporate Training",
  overview:
    "Dr Ambreen leads learning design, corporate training and capacity development at EhsanX, bringing together technical rigor, academic depth, entrepreneurial thinking and hands-on training.",
  portraitAlt: "Portrait of Engr. Dr. Ambreen Rasheed Khan, Director, Learning Design & Corporate Training at EhsanX",
  blocks: [
    {
      kind: "list",
      label: "Academic Background",
      items: [
        "BS in Computer Systems Engineering — Sir Syed University of Engineering and Technology (SSUET).",
        "MBA in Corporate Management — IBA Karachi.",
        "PhD in Entrepreneurship Management — Putra Business School, Malaysia.",
      ],
    },
    {
      kind: "list",
      label: "Professional Experience and Engagements",
      intro:
        "She has designed and delivered entrepreneurship, leadership, innovation, life skills, marketing, negotiation and capacity-building programmes across academia, corporate training and the development sector. Her engagements include:",
      items: ["IBA Karachi", "SZABIST", "IoBM", "IIEE", "KFC Pakistan", "SMEDA", "UNDP", "GIZ", "Dalda Foundation", "Akhuwat Institute, Kasur"],
      columns: 2,
    },
    {
      kind: "text",
      label: "Learning Design",
      paragraphs: [
        "She has developed programmes from the ground up, integrating entrepreneurial mindset, confidence, resilience, communication, leadership, creativity, business fundamentals and personal development.",
      ],
    },
    {
      kind: "list",
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
      columns: 2,
    },
    { kind: "list", label: "Entrepreneurial Work", items: ["Founder, AURA360.", "Co-founder, Hijab-al-Firdaus."] },
    {
      kind: "text",
      label: "Her Role at EhsanX",
      paragraphs: [
        "At EhsanX, she designs practical, high-engagement learning experiences that strengthen entrepreneurial mindset, leadership, resilience, innovation and purposeful action.",
      ],
    },
  ],
};
