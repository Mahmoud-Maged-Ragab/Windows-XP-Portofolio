"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { APP_REGISTRY } from "@/data/apps";
import { CV } from "@/data/cv";
import { useWindowStore } from "@/store/windowStore";
import { useSystemStore } from "@/store/systemStore";
import { AppId } from "@/types";
import Image from "next/image";

interface StartMenuProps {
  onClose: () => void;
}

const QUICK_LINKS: { icon: string; label: string; appId: AppId }[] = [
  { icon: "/hWgjp1e.png", label: "About Me", appId: "about" },
  { icon: "/WordImg.png", label: "View CV", appId: "cv" },
  { icon: "/FolderIcon.png", label: "Projects", appId: "projects" },
  { icon: "/FolderIcon.png", label: "Skills", appId: "skills" },
  {
    icon: "/tumblr_28f7d41869ff8aec052777020eeb6242_385b0d2b_540.png",
    label: "Contact",
    appId: "contact",
  },
];

const PINNED_IDS = new Set(QUICK_LINKS.map((q) => q.appId));

/** "Software Engineer" — the first segment of the CV title fits the menu header. */
const SHORT_ROLE = CV.title.split("|")[0].trim();

export default function StartMenu({ onClose }: StartMenuProps) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const openShutdownDialog = useSystemStore((s) => s.openShutdownDialog);
  const openRunDialog = useSystemStore((s) => s.openRunDialog);
  const [allProgramsOpen, setAllProgramsOpen] = useState(false);

  const otherApps = APP_REGISTRY.filter((a) => !PINNED_IDS.has(a.id));

  function open(appId: AppId) {
    openWindow(appId);
    onClose();
  }

  function handlePower() {
    openShutdownDialog();
    onClose();
  }

  function handleRun() {
    openRunDialog();
    onClose();
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className="absolute bottom-full left-0 mb-1 xp-start-menu w-[320px] max-w-[92vw] max-h-[85vh] flex flex-col shadow-2xl overflow-hidden rounded-tr-lg rounded-tl-lg"
    >
      {/* Header banner */}
      <div className="xp-start-header shrink-0 flex items-center gap-3 px-4 py-3">
        <div className="relative w-20 h-20 rounded-full overflow-hidden shrink-0 shadow-md border-2 border-white">
          <Image
            src="/UserImg.jpeg"
            alt="Mahmoud Maged"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Mahmoud Ragab</p>
          <p className="text-blue-200 text-xs">{SHORT_ROLE}</p>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 min-h-0 overflow-y-auto">
        {/* Left column — pinned programs */}
        <div className="flex-1 bg-white border-r border-gray-200 py-2">
          <p className="text-xs font-bold text-gray-500 uppercase px-3 mb-1 tracking-wide">
            Portfolio
          </p>
          {QUICK_LINKS.map((item) => (
            <button
              key={item.appId}
              onClick={() => open(item.appId)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-600 hover:text-white group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} className="w-10" alt="" />
              <span className="text-sm text-gray-800 group-hover:text-white">
                {item.label}
              </span>
            </button>
          ))}

          {otherApps.length > 0 && (
            <>
              <div className="border-t border-gray-200 my-2" />
              <button
                onClick={() => setAllProgramsOpen((v) => !v)}
                aria-expanded={allProgramsOpen}
                className="w-full flex items-center justify-between gap-3 px-3 py-2 hover:bg-blue-600 hover:text-white group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
              >
                <span className="flex items-center gap-3">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/ProgramsIcon.svg" className="w-6 h-6 object-contain" alt="" />
                  <span className="text-sm text-gray-800 group-hover:text-white">
                    All Programs
                  </span>
                </span>
                <span
                  className={`text-xs text-gray-500 group-hover:text-white transition-transform ${
                    allProgramsOpen ? "rotate-90" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▸
                </span>
              </button>
              {allProgramsOpen && (
                <div className="bg-blue-50/60 border-y border-gray-200 py-1">
                  {otherApps.map((app) => (
                    <button
                      key={app.id}
                      onClick={() => open(app.id)}
                      className="w-full flex items-center gap-3 pl-8 pr-3 py-1.5 hover:bg-blue-600 hover:text-white group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={app.icon} className="w-6" alt="" />
                      <span className="text-xs text-gray-800 group-hover:text-white">
                        {app.title}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>

        {/* Right column — system items */}
        <div className="w-[110px] bg-[#D6E8F7] py-2 flex flex-col gap-1">
          {(
            [
              { icon: "/MyComputerIcon.svg", label: "My Computer", appId: "myComputer" },
              { icon: "/FolderIcon.png", label: "Documents", appId: "myDocuments" },
              { icon: "/GearIcon.png", label: "Settings", appId: "controlPanel" },
            ] as { icon: string; label: string; appId: AppId }[]
          ).map((item) => (
            <button
              key={item.label}
              onClick={() => open(item.appId)}
              className="flex flex-col items-center gap-1 px-2 py-2 hover:bg-blue-600 hover:text-white group w-full text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.icon} className="w-7 h-7 object-contain" alt="" />
              <span className="text-xs text-gray-700 group-hover:text-white leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search / Run — classic XP position, above Log Off / Shut Down */}
      <div className="shrink-0 border-t border-gray-200 bg-white py-1">
        <button
          onClick={() => open("search")}
          className="w-full flex items-center gap-3 px-3 py-1.5 hover:bg-blue-600 hover:text-white group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/SearchIcon.svg" className="w-5" alt="" />
          <span className="text-xs text-gray-800 group-hover:text-white">Search</span>
        </button>
        <button
          onClick={handleRun}
          className="w-full flex items-center gap-3 px-3 py-1.5 hover:bg-blue-600 hover:text-white group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/CommandPromptIcon.svg" className="w-5" alt="" />
          <span className="text-xs text-gray-800 group-hover:text-white">Run...</span>
        </button>
      </div>

      {/* Footer */}
      <div className="xp-start-footer shrink-0 flex justify-end gap-2 px-3 py-2">
        <button
          onClick={handlePower}
          className="flex items-center gap-1.5 text-white text-xs hover:bg-white/20 px-2 py-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/LogOffIcon.svg" className="w-4 h-4 object-contain" alt="" /> Log Off
        </button>
        <button
          onClick={handlePower}
          className="flex items-center gap-1.5 text-white text-xs hover:bg-white/20 px-2 py-1 rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/PowerIcon.svg" className="w-4 h-4 object-contain" alt="" /> Shut Down
        </button>
      </div>
    </motion.div>
  );
}
