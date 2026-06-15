import { Project } from "@/types";

export const PROJECTS: Project[] = [
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
    github: "https://github.com/yourusername/xp-portfolio",
    live: "https://yourportfolio.com",
    icon: "🖥️",
  },
  {
    id: "Social Hub",
    name: "Social Hub",
    description:
      "Social Hub is a social media platform inspired by Facebook, allowing users to create profiles, share posts, interact through likes/comments, and connect with others through a modern responsive interface.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    features: [
      "User profiles and authentication",
      "Create, edit & delete posts",
      "Likes, comments, and interactions",
      "Real-time messaging system",
      "Personalized social feed",
    ],
    github:
      "https://github.com/Mahmoud-Maged-Ragab/SocialHub--Your-place-for-communication",
    live: "https://mahmoud-maged-ragab.github.io/SocialHub--Your-place-for-communication/",
    icon: "/Social_Hub.png",
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
];
