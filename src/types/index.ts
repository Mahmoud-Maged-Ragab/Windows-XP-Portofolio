import { LucideIcon } from "lucide-react";

export type AppId =
  | "about"
  | "cv"
  | "projects"
  | "skills"
  | "contact"
  | "social"
  | "myComputer";

export interface WindowState {
  id: string;
  appId: AppId;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AppDefinition {
  id: AppId;
  title: string;
  icon: string;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech: string[];
  features: string[];
  github?: string;
  live?: string;
  icon: string;
}

export interface SkillGroup {
  category: string;
  icon: LucideIcon;
  skills: string[];
}
