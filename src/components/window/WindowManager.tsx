"use client";

import { useWindowStore } from "@/store/windowStore";
import Window from "./Window";
import AboutWindow from "@/components/apps/AboutWindow";
import CVWindow from "@/components/apps/CVWindow";
import ProjectsWindow from "@/components/apps/ProjectsWindow";
import SkillsWindow from "@/components/apps/SkillsWindow";
import ContactWindow from "@/components/apps/ContactWindow";
import CertificatesWindow from "@/components/apps/CertificatesWindow";
import MyComputerWindow from "@/components/apps/MyComputerWindow";
import MyDocumentsWindow from "@/components/apps/MyDocumentsWindow";
import NotepadViewer from "@/components/apps/NotepadViewer";
import ControlPanelWindow from "@/components/apps/ControlPanelWindow";
import SystemPropertiesWindow from "@/components/apps/SystemPropertiesWindow";
import SearchWindow from "@/components/apps/SearchWindow";
import HelpAndSupportWindow from "@/components/apps/HelpAndSupportWindow";
import CalculatorWindow from "@/components/apps/CalculatorWindow";
import PaintWindow from "@/components/apps/PaintWindow";
import CommandPromptWindow from "@/components/apps/CommandPromptWindow";
import { AppId } from "@/types";

function AppContent({ appId }: { appId: AppId }) {
  switch (appId) {
    case "about":
      return <AboutWindow />;
    case "cv":
      return <CVWindow />;
    case "projects":
      return <ProjectsWindow />;
    case "skills":
      return <SkillsWindow />;
    case "contact":
      return <ContactWindow />;
    case "certificates":
      return <CertificatesWindow />;
    case "myComputer":
      return <MyComputerWindow />;
    case "myDocuments":
      return <MyDocumentsWindow />;
    case "notepad":
      return <NotepadViewer />;
    case "controlPanel":
      return <ControlPanelWindow />;
    case "systemProperties":
      return <SystemPropertiesWindow />;
    case "search":
      return <SearchWindow />;
    case "helpAndSupport":
      return <HelpAndSupportWindow />;
    case "calculator":
      return <CalculatorWindow />;
    case "paint":
      return <PaintWindow />;
    case "commandPrompt":
      return <CommandPromptWindow />;
    default:
      return null;
  }
}

export default function WindowManager() {
  const windows = useWindowStore((s) => s.windows);

  return (
    <>
      {windows.map((win) => (
        <Window key={win.id} window={win}>
          <AppContent appId={win.appId} />
        </Window>
      ))}
    </>
  );
}
