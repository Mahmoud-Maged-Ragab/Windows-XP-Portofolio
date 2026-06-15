import { AppDefinition } from "@/types";

export const APP_REGISTRY: AppDefinition[] = [
  {
    id: "about",
    title: "About Me",
    icon: "/hWgjp1e.png",
    defaultSize: { width: 580, height: 440 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: "cv",
    title: "CV.txt",
    icon: "/WordImg.png",
    defaultSize: { width: 620, height: 500 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: "projects",
    title: "Projects",
    icon: "/FolderIcon.png",
    defaultSize: { width: 680, height: 480 },
    minSize: { width: 500, height: 350 },
  },
  {
    id: "skills",
    title: "Skills",
    icon: "/FolderIcon.png",
    defaultSize: { width: 560, height: 460 },
    minSize: { width: 400, height: 300 },
  },
  {
    id: "contact",
    title: "Contact",
    icon: "/tumblr_28f7d41869ff8aec052777020eeb6242_385b0d2b_540.png",
    defaultSize: { width: 520, height: 440 },
    minSize: { width: 380, height: 300 },
  },
];
