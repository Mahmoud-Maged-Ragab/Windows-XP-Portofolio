import { CVData } from "@/types";

/**
 * Transcribed from the latest CV (Google Drive, linked via CV_URL) — the section order,
 * wording, and dates all follow that document. The only additions are the
 * education institutions, which the CV states in its own summary and
 * certifications sections rather than next to each credential.
 *
 * This is the single source of truth: the CV window and the About window both
 * read from it.
 */
/** The CV lives on Google Drive; every CV/resume link opens it in a new tab. */
export const CV_URL =
  "https://drive.google.com/file/d/1xcPDDQv0g2FpAe3avZrx25I8ydcP8tE1/view?usp=sharing";

export const CV: CVData = {
  name: "Mahmoud Maged Ragab",
  title: "Software Engineer | Full-Stack Development & Business Technology",
  contact: {
    phone: "+20 106 885 0668",
    email: "Mahmoud.m.Ragab06@gmail.com",
    linkedin: "linkedin.com/in/mahmoud-ragab-5485652a1",
    github: "github.com/Mahmoud-Maged-Ragab",
    portfolio: "mahmoud-maged-portofolio.vercel.app",
    location: "Cairo, Egypt",
  },
  summary:
    "Business Information Systems (BIS) student at AASTMT (expected 2027) and full-stack developer working with React.js, Next.js, JavaScript (ES6+), PHP, Laravel, Node.js, Fastify, and Supabase. Projects include a financial ERP system and a customer support platform. Backend experience comes from a PHP/Laravel internship and from automation, web development, and AI chatbot work at Beeviro. Internships at Commercial International Bank (CIB) and in Credit Administration at the National Bank of Egypt added hands-on exposure to banking and business operations, alongside coursework in business process analysis, systems analysis and design, database management, and ERP. Looking for Software Engineer, Full-Stack Developer, or Business Technology Analyst roles in software, banking technology, and FinTech.",
  skills: [
    { label: "Languages", items: ["JavaScript (ES6+)", "PHP", "SQL"] },
    {
      label: "Frontend",
      items: [
        "React.js",
        "Next.js",
        "HTML5",
        "CSS3",
        "Responsive Web Design",
        "UI/UX Implementation",
      ],
    },
    {
      label: "Backend",
      items: [
        "Laravel (PHP framework)",
        "Node.js",
        "Fastify",
        "REST-based application structure",
      ],
    },
    { label: "Databases", items: ["SQL", "Supabase"] },
    { label: "Tools", items: ["Git", "GitHub", "Version Control"] },
    {
      label: "Business & Enterprise Systems",
      items: [
        "Business Process Analysis",
        "Systems Analysis & Design",
        "Database Management",
        "ERP Concepts",
        "Business Intelligence",
        "Data Analysis",
      ],
    },
    {
      label: "Banking & Finance Exposure",
      items: [
        "Credit Administration",
        "Banking Operations",
        "Financial Inclusion",
        "Business Analysis",
      ],
    },
  ],
  experience: [
    {
      role: "Frontend Developer (Freelance)",
      company: "Self-Employed",
      period: "2025 – Present",
      bullets: [
        "Built and maintained responsive client web applications using React.js and Next.js, from initial development through deployment and ongoing maintenance.",
        "Implemented UI/UX improvements and resolved usability issues based on client and user feedback.",
        "Optimized frontend performance and page responsiveness across devices.",
      ],
    },
    {
      role: "PHP Laravel Intern",
      company: "Pan Arab Media",
      period: "2026",
      bullets: [
        "Gained hands-on backend development exposure using PHP and the Laravel framework.",
        "Built and maintained web application features within an existing production codebase, working with Laravel's MVC structure and routing.",
      ],
    },
    {
      role: "Customer Support & Automation (Part-Time)",
      company: "Beeviro",
      period: "2026 – Present",
      bullets: [
        "Support and maintain the company's web-builder platform and automation workflows.",
        "Work with AI chatbot tooling to streamline customer interactions and reduce manual support workload.",
        "Handle customer support operations, applying platform and automation knowledge to resolve technical and user issues.",
      ],
    },
    {
      role: "Intern, Credit Administration",
      company: "National Bank of Egypt (Bank Al-Ahly / NBE)",
      period: "August – September 2026",
      bullets: [
        "Completed an internship within the Credit Administration section, gaining direct exposure to core banking processes, credit workflows, and operational documentation.",
        "Built an internal web application on Financial Inclusion awareness and NBE achievements as part of the internship (see Projects).",
        "Built practical understanding of banking business processes relevant to future banking-technology and FinTech-focused roles.",
      ],
      note: "Business/operations internship, not an IT/software placement.",
    },
    {
      role: "Business Operations Intern",
      company: "Commercial International Bank (CIB)",
      period: "2025",
      bullets: [
        "Analyzed internal business workflows and monitored day-to-day operations to identify inefficiencies.",
        "Assisted in identifying and recommending process improvements across operational teams.",
        "Evaluated operational data to support data-driven optimization initiatives.",
      ],
    },
  ],
  projects: [
    {
      name: "NBE Financial Inclusion, Awareness & Achievements Web App",
      tagline: "Internship Project, National Bank of Egypt",
      description:
        "Built during the Credit Administration internship at National Bank of Egypt: a web app presenting financial inclusion awareness content and NBE's related achievements. Developed using Next.js.",
      github: "https://github.com/Mahmoud-Maged-Ragab/NBE-Financial-Inclusion",
      live: "https://nbe-financial-inclusion.vercel.app/en",
    },
    {
      name: "BeeViro Financial ERP System",
      tagline: "Accounting-Suite ERP",
      description:
        "Built a full accounting-suite ERP system with invoicing, expense tracking, financial reporting, and role-based permissions. Developed using Vite, Node.js, and Fastify.",
      live: "https://bee-viro-erp-system.vercel.app/login",
    },
    {
      name: "Revenue Lab 360 Support",
      tagline: "Customer Support Tool",
      description:
        "Built a self-service support portal listing common issues and solutions, allowing users to submit unresolved problems directly through the site, with automatic notifications to the support team. Developed using Next.js with Supabase for database and backend services.",
      live: "https://help.revenuelab360.com",
    },
    {
      name: "Fresh Cart",
      tagline: "E-commerce Web Application",
      description:
        "Built with Next.js; implements product browsing, cart, and e-commerce workflows.",
      github: "https://github.com/Mahmoud-Maged-Ragab/Fresh-Cart",
      live: "https://fresh-cart-8dia.vercel.app",
    },
    {
      name: "Social Hub",
      tagline: "Social Networking Web App",
      description:
        "Built with React.js, HTML5, and CSS3, implementing responsive social-platform UI and interaction patterns.",
      github:
        "https://github.com/Mahmoud-Maged-Ragab/SocialHub--Your-place-for-communication",
    },
    {
      name: "Windows XP Portfolio",
      tagline: "Interactive Developer Portfolio",
      description:
        "Built with Next.js as an interactive, OS-themed portfolio site to showcase projects.",
      github: "https://github.com/Mahmoud-Maged-Ragab/Windows-XP-Portofolio",
    },
  ],
  education: [
    {
      credential: "Bachelor of Business Information Systems (BIS)",
      institution: "AASTMT",
      period: "Expected 2027",
    },
    {
      credential: "Front-End Diploma",
      institution: "Route Learning Academy",
      period: "2026",
    },
    {
      credential: "English Diploma",
      institution: "The American University in Cairo (AUC)",
      period: "2024",
    },
  ],
  certifications: [
    "Frontend Development Diploma, React.js, Next.js, JavaScript (Route Learning Academy)",
    "Full Stack Track, Google Developer Group On Campus, AASTMT Cairo (2025–2026)",
    "Cybersecurity Track, Google Developer Group On Campus, AASTMT Cairo (2025–2026)",
    "Financial Inclusion, National Bank of Egypt (Bank Al-Ahly) / almentor",
    "NBE Internship Program, National Bank of Egypt (Bank Al-Ahly), Certificate of Completion (2026)",
    "CCNA: Introduction to Networks",
    "CCNA: Switching, Routing, and Wireless Essentials",
    "CCNA: Enterprise Networking, Security, and Automation",
    "AUC English Diploma",
  ],
  languages: "Arabic: Native  |  English: Professional Working Proficiency",
  url: CV_URL,
};
