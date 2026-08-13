export interface ExperienceEntry {
  title: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    title: "Senior Product Designer",
    company: "Evertec",
    period: "July – Present",
    location: "Remote Belo Horizonte, MG",
    bullets: [
      "Leading product design and AI-assisted frontend development, as Product Engineer, for a real-time monitoring and incident-resolution platform for Pix transactions, working alongside a squad of PM and two tech leads.",
    ],
  },
  {
    title: "Senior Product Designer",
    company: "Evertec - Itaú Bank",
    period: "January – July",
    location: "Remote Belo Horizonte, MG",
    bullets: [
      "Led the redesign and evolution of the closed private pension onboarding system, improving flow clarity and reducing friction throughout the journey.",
      "Drove discovery and delivery in partnership with PMs and engineering, transforming regulatory requirements into user-centered solutions.",
      "Created and maintained scalable components and flows within the design system.",
    ],
  },
  {
    title: "Product Designer",
    company: "Inter - Digital Bank",
    period: "May 2021 - Apryl 2025",
    location: "Belo Horizonte, MG",
    bullets: [
      "Worked across the full design cycle, from conception to delivery, on web and mobile products.",
      "Contributed to marketplace and e-commerce initiatives, designing scalable, business-oriented experiences.",
      "Conducted user research and usability testing to validate hypotheses and improve conversion metrics.",
      "Developed interactive flows and prototypes aligned with product goals.",
    ],
  },
  {
    title: "Designer",
    company: "Freelancer",
    period: "October 2016 - March 2018",
    location: "Belo Horizonte, MG",
    bullets: [
      "Created visual identities and printed materials for small businesses, ensuring visual consistency and graphic quality.",
    ],
  },
];

export interface SkillGroup {
  label: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    label: "Project Design",
    items: [
      "Visual Design",
      "UX Design and UI Design",
      "Prototyping",
      "Information Architecture",
      "Research",
      "Advanced Figma",
      "Analytics",
      "AI",
    ],
  },
  {
    label: "Communication & Collaboration",
    items: [
      "Cross-Functional Team Leadership",
      "Client Relationship Management",
      "Stakeholder Communication",
    ],
  },
  {
    label: "Strategic & Creative Oversight",
    items: [
      "Creative Strategy Development",
      "Talent Relations & Management",
      "Creative Direction Oversight",
    ],
  },
];

export const education = {
  degree: "Graduation in Design",
  school: "UNIBH",
};

export interface Certification {
  title: string;
  school: string;
}

export const certifications: Certification[] = [
  { title: "BASE Product Design", school: "Aprender Design" },
  { title: "Digital Product Strategy", school: "Aprender Design" },
  { title: "Product Led Growth Design", school: "BTX Escola de Design" },
  { title: "User Experience", school: "FIAP" },
];
