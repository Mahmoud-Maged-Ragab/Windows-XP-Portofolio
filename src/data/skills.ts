import { SkillGroup } from "@/types";
import { CodeXml, Wrench, Zap, CircleCheckBig, Rocket } from "lucide-react";

export const SKILLS: SkillGroup[] = [
  {
    category: "Frontend",
    icon: CodeXml,
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
    ],
  },
  {
    category: "Tools & Workflow",
    icon: Wrench,
    skills: ["Git", "GitHub", "VS Code", "Figma", "npm / pnpm"],
  },
  {
    category: "Backend Knowledge",
    icon: Zap,
    skills: ["REST APIs", "Authentication (JWT/OAuth)"],
  },
  {
    category: "Testing & Quality",
    icon: CircleCheckBig,
    skills: [
      "Jest",
      "React Testing Library",
      "Playwright",
      "Cypress",
      "Lighthouse",
    ],
  },
  {
    category: "Deployment",
    icon: Rocket,
    skills: ["Vercel", "GitHub Actions", "Docker (basics)"],
  },
];
