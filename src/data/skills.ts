import { SkillGroup } from "@/types";
import { CodeXml, Wrench, Zap, CircleCheckBig, Rocket } from "lucide-react";

export const SKILLS: SkillGroup[] = [
  {
    category: "Frontend Development",
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
      "shadcn/ui",
      "HeroUI",
    ],
  },
  {
    category: "Backend & Systems",
    icon: Zap,
    skills: [
      "PHP",
      "Laravel",
      "Node.js",
      "REST APIs",
      "Authentication & Authorization",
      "CRUD Systems",
      "System Architecture",
      "Automation Workflows",
    ],
  },
  {
    category: "Databases & Data",
    icon: CircleCheckBig,
    skills: [
      "MySQL",
      "PostgreSQL",
      "Supabase",
      "Prisma ORM",
      "Database Design",
      "Relational Databases",
    ],
  },
  {
    category: "Tools & Workflow",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Figma",
      "npm / pnpm",
      "Postman",
      "Claude Code",
    ],
  },
  {
    category: "Deployment & DevOps",
    icon: Rocket,
    skills: [
      "Vercel",
      "GitHub Actions",
      "Docker",
      "Environment Configuration",
      "CI/CD Basics",
    ],
  },
];
