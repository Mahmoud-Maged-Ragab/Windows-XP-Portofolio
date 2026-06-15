"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowStore } from "@/store/windowStore";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";
import SystemClock from "./SystemClock";

export default function Taskbar() {
  const [startOpen, setStartOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { windows, focusWindow, minimizeWindow, restoreWindow } =
    useWindowStore();

  // Close start menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
    }
    if (startOpen) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [startOpen]);

  function handleTaskClick(id: string, isMinimized: boolean) {
    if (isMinimized) {
      restoreWindow(id);
    } else {
      minimizeWindow(id);
    }
  }

  return (
    <div className="xp-taskbar absolute bottom-0 left-0 right-0 h-10 flex items-stretch z-[9999]">
      {/* Start button area */}
      <div ref={menuRef} className="relative flex items-stretch">
        <StartButton
          isOpen={startOpen}
          onClick={() => setStartOpen((v) => !v)}
        />
        <AnimatePresence>
          {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
        </AnimatePresence>
      </div>

      {/* Divider */}
      <div className="w-px bg-white/20 my-1 mx-1" />

      {/* Window buttons */}
      <div className="flex-1 flex items-center gap-1 overflow-x-auto px-1">
        <AnimatePresence>
          {windows.map((win) => (
            <motion.button
              key={win.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={() => handleTaskClick(win.id, win.isMinimized)}
              className={`xp-taskbar-btn flex items-center gap-1.5 px-2 py-0.5 h-7 max-w-[160px] min-w-[80px] text-xs text-left truncate shrink-0 ${
                !win.isMinimized ? "xp-taskbar-btn-active" : ""
              }`}
              title={win.title}
            >
              <span className="text-sm shrink-0">
                {win.title.includes("Notepad")
                  ? "📄"
                  : win.title.includes("Projects")
                    ? "📁"
                    : win.title.includes("Skills")
                      ? "⚙️"
                      : win.title.includes("Contact")
                        ? "✉️"
                        : win.title.includes("Social")
                          ? "🔗"
                          : win.title.includes("About")
                            ? "👤"
                            : "🪟"}
              </span>
              <span className="truncate text-white">{win.title}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <SystemClock />
    </div>
  );
}
