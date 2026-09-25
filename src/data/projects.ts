import { Project } from "@/types";

export const PROJECTS: Project[] = [
  {
    id: "nbe-financial-inclusion",
    name: "NBE Financial Inclusion",
    description:
      "Built during my Credit Administration internship at the National Bank of Egypt: a web app that presents financial inclusion awareness content alongside NBE's related achievements.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    features: [
      "Financial inclusion awareness content",
      "NBE's financial inclusion achievements",
      "Internship project at National Bank of Egypt",
    ],
    github: "https://github.com/Mahmoud-Maged-Ragab/NBE-Financial-Inclusion",
    live: "https://nbe-financial-inclusion.vercel.app/en",
    icon: "/NBEFinancialInclusionLogo.png",
  },
  {
    id: "beeviro-erp",
    name: "BeeViro Financial ERP System",
    description:
      "A financial ERP system covering a full accounting suite — invoicing, expense tracking, and financial reporting — with role-based permissions controlling who can see and do what.",
    tech: ["Vite", "Node.js", "Fastify"],
    features: [
      "Invoicing",
      "Expense tracking",
      "Financial reporting",
      "Role-based permissions",
    ],
    live: "https://bee-viro-erp-system.vercel.app/login",
    icon: "/RevLab360Logo.ico",
  },
  {
    id: "revlab360-support",
    name: "Revenue Lab 360 Support",
    description:
      "A self-service customer support portal that lists common issues and their solutions, and lets users submit unresolved problems directly through the site so the support team is notified automatically.",
    tech: ["Next.js", "Supabase"],
    features: [
      "Browsable common issues and solutions",
      "Submit unresolved problems from the site",
      "Automatic notifications to the support team",
    ],
    live: "https://help.revenuelab360.com",
    icon: "/RevLab360Logo.ico",
  },
  {
    id: "Fresh Cart",
    name: "Fresh Cart",
    description:
      "Fresh Cart is an e-commerce platform inspired by Amazon, allowing users to browse products, search and filter items, manage their cart, and complete purchases through a modern responsive shopping experience.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    features: [
      "Product catalog with search & filtering",
      "Shopping cart management",
      "User authentication",
      "Product details and reviews",
      "Order tracking and history",
    ],
    github: "https://github.com/Mahmoud-Maged-Ragab/Fresh-Cart",
    live: "https://fresh-cart-8dia.vercel.app",
    icon: "/FreshCartLogo.png",
  },
  {
    id: "Social Hub",
    name: "Social Hub",
    description:
      "Social Hub is a social media platform inspired by Facebook, allowing users to create profiles, share posts, interact through likes/comments, and connect with others through a modern responsive interface.",
    tech: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vite"],
    features: [
      "User profiles and authentication",
      "Create, edit & delete posts",
      "Likes, comments, and interactions",
      "Personalized social feed",
      "Responsive social-platform UI",
    ],
    github:
      "https://github.com/Mahmoud-Maged-Ragab/SocialHub--Your-place-for-communication",
    live: "https://mahmoud-maged-ragab.github.io/SocialHub--Your-place-for-communication/",
    icon: "/Social_Hub.png",
  },
  {
    id: "xp-portfolio",
    name: "Windows XP Portfolio",
    description:
      "An interactive personal portfolio website built as a Windows XP desktop simulation. Features draggable windows, a working taskbar and start menu, and multiple app windows for showcasing work.",
    tech: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Zustand",
    ],
    features: [
      "Draggable and resizable windows",
      "Working taskbar with minimize/restore",
      "Animated Start Menu",
      "Window z-index management",
      "Responsive mobile layout",
    ],
    github: "https://github.com/Mahmoud-Maged-Ragab/Windows-XP-Portofolio",
    icon: "/WindowsXPICon.png",
  },
];
