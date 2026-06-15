"use client";

import { useWindowStore } from "@/store/windowStore";
import Window from "./Window";
import AboutWindow from "@/components/apps/AboutWindow";
import CVWindow from "@/components/apps/CVWindow";
import ProjectsWindow from "@/components/apps/ProjectsWindow";
import SkillsWindow from "@/components/apps/SkillsWindow";
import ContactWindow from "@/components/apps/ContactWindow";
import SocialWindow from "@/components/apps/SocialWindow";
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
    case "social":
      return <SocialWindow />;
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
