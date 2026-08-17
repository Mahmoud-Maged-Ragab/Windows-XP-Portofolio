import { CVData } from "@/types";

/**
 * Transcribed from cv/Mahmoud_Maged_Ragab_CV_SWE.docx — the section order,
 * wording, and dates all follow that document. The only additions are the
 * education institutions, which the CV states in its own summary and
 * certifications sections rather than next to each credential.
 *
 * This is the single source of truth: the CV window and the About window both
 * read from it.
 */
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
    "Business Information Systems (BIS) student at AASTMT (expected 2027) building toward a career in full-stack software engineering. Hands-on experience developing production web applications with React.js and Next.js, with backend exposure through a PHP/Laravel internship. Currently working part-time on automation, web-builder platforms, and AI chatbot tooling at Beeviro. Combines this technical foundation with direct exposure to banking and business operations through internships at Commercial International Bank (CIB) and National Bank of Egypt (Credit Administration), plus coursework in business process analysis, systems analysis and design, and database management. Targeting entry-level software engineering, full-stack, or business-technology roles in software companies, banking technology, and FinTech.",
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
      items: ["Laravel (PHP framework)", "REST-based application structure"],
    },
    { label: "Databases", items: ["SQL"] },
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
      period: "August 2026 – Present",
      bullets: [
        "Completing an internship within the Credit Administration section, gaining direct exposure to core banking processes, credit workflows, and operational documentation.",
        "Building practical understanding of banking business processes relevant to future banking-technology and FinTech-focused roles.",
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
    "Financial Inclusion, National Bank of Egypt / almentor",
    "CCNA: Introduction to Networks",
    "CCNA: Switching, Routing, and Wireless Essentials",
    "CCNA: Enterprise Networking, Security, and Automation",
    "AUC English Diploma",
  ],
  languages: "Arabic: Native  |  English: Professional Working Proficiency",
  file: "/cv/Mahmoud_Maged_Ragab_CV.pdf",
};
