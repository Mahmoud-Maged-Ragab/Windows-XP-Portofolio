import { LucideIcon } from "lucide-react";

/** An XP artwork path under /public, or a lucide-react icon. */
export type IconSource = string | LucideIcon;

export type AppId =
  | "about"
  | "cv"
  | "projects"
  | "skills"
  | "contact"
  | "certificates"
  | "myComputer"
  | "myDocuments"
  | "notepad"
  | "controlPanel"
  | "systemProperties"
  | "search"
  | "helpAndSupport"
  | "calculator"
  | "paint"
  | "commandPrompt";

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
  icon: IconSource;
  defaultSize: { width: number; height: number };
  minSize?: { width: number; height: number };
  /** Defaults to true — set false to keep an app Start-Menu-only (no desktop icon). */
  showOnDesktop?: boolean;
}

export interface DocumentEntry {
  id: string;
  name: string;
  kind: string;
  content: string;
}

export interface CVContact {
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
}

export interface CVSkillGroup {
  label: string;
  items: string[];
}

export interface CVExperienceItem {
  role: string;
  company: string;
  period: string;
  bullets: string[];
  /** Clarifying note that the CV itself carries. */
  note?: string;
}

export interface CVProjectItem {
  name: string;
  tagline: string;
  description: string;
  github?: string;
  live?: string;
}

export interface CVEducationItem {
  credential: string;
  /** Institution, when the CV names one. */
  institution?: string;
  period: string;
}

export interface CVData {
  name: string;
  title: string;
  contact: CVContact;
  summary: string;
  skills: CVSkillGroup[];
  experience: CVExperienceItem[];
  projects: CVProjectItem[];
  education: CVEducationItem[];
  certifications: string[];
  languages: string;
  /** External link (Google Drive) to the CV document. */
  url: string;
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

export interface CertificateCategory {
  id: string;
  label: string;
}

export interface Certificate {
  id: string;
  /** Title exactly as it appears on the certificate. */
  title: string;
  /** Original Arabic course title, when the certificate shows one. */
  titleArabic?: string;
  /** Issuing body named on the certificate. */
  organization: string;
  /** Training provider named on the certificate, when different from the issuing body. */
  provider?: string;
  /** Co-branding institution shown on the certificate (e.g. a sponsoring bank). */
  partner?: string;
  /** Instructor or signatory named on the certificate. */
  instructor?: string;
  /**
   * Completion date, only as precise as the certificate states it:
   * "YYYY-MM-DD" or "YYYY-MM". Omitted when the certificate shows no date.
   */
  date?: string;
  /** Must match a CertificateCategory id in data/certificates.ts */
  category: string;
  /** Path (under /public) to the real certificate file. */
  file: string;
  fileType: "pdf" | "image";
  /** Description drawn from what the certificate itself states. */
  description: string;
  credentialId?: string;
}
