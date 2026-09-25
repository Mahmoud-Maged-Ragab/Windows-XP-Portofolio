"use client";

import { useState } from "react";
import { CircleHelp, Info, Keyboard, Mail, Search } from "lucide-react";
import { IconSource } from "@/types";
import AppIcon from "@/components/system/AppIcon";

interface HelpTopic {
  id: string;
  title: string;
  icon: IconSource;
  body: string;
}

const TOPICS: HelpTopic[] = [
  {
    id: "how-it-works",
    title: "How this desktop works",
    icon: "/Windows_XP_My_Computer_Icon.png",
    body: `This portfolio is built like a real desktop operating system.

Double-click a desktop icon to open an app in its own window. Drag a window by its title bar to move it, use the minimize/maximize/close buttons in the top-right corner, and click a running app in the taskbar to switch to it or minimize it.

Right-click the desktop, an icon, or the taskbar to see more options — just like a real Windows desktop.`,
  },
  {
    id: "keyboard",
    title: "Keyboard shortcuts & accessibility",
    icon: Keyboard,
    body: `Escape closes the active dialog or context menu.

Tab moves focus between buttons and links, and focus is always visible.

Control Panel → Accessibility has a "large text" option that scales the whole desktop's text up for readability.

Control Panel → Sounds lets you mute the interface chimes entirely.`,
  },
  {
    id: "find-things",
    title: "Finding things quickly",
    icon: Search,
    body: `Use Start → Search to look across projects, skills, and documents at once.

Or use Start → Run to jump straight to an app by typing its name — try "calc", "notepad", or "projects".`,
  },
  {
    id: "contact",
    title: "Getting in touch with Mahmoud",
    icon: Mail,
    body: `Open the Contact app (desktop icon or Start Menu) for email, LinkedIn, and GitHub links.`,
  },
  {
    id: "about-build",
    title: "About this build",
    icon: Info,
    body: `Curious what this is built with? Open System Properties (right-click the desktop → Properties, or find it under Start → All Programs) for the full technology breakdown and version info.`,
  },
];

export default function HelpAndSupportWindow() {
  const [activeId, setActiveId] = useState(TOPICS[0].id);
  const active = TOPICS.find((t) => t.id === activeId) ?? TOPICS[0];

  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      <div className="xp-start-header shrink-0 flex items-center gap-2 px-4 py-2.5">
        <AppIcon icon={CircleHelp} size={24} className="text-white" />
        <p className="text-white font-bold text-sm">Help and Support Center</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <nav className="w-40 sm:w-52 shrink-0 bg-white border-r border-gray-300 py-2 overflow-y-auto">
          {TOPICS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveId(t.id)}
              aria-current={activeId === t.id ? "true" : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${
                activeId === t.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-800 hover:bg-blue-100"
              }`}
            >
              <AppIcon icon={t.icon} size={20} />
              <span className="truncate">{t.title}</span>
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-5">
          <h2 className="text-base font-bold text-gray-800 mb-3 flex items-center gap-2">
            <AppIcon icon={active.icon} size={24} className="text-[#1F4E9C]" />
            {active.title}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
            {active.body}
          </p>
        </div>
      </div>
    </div>
  );
}
