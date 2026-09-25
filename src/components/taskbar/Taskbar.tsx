"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWindowStore } from "@/store/windowStore";
import { APP_REGISTRY } from "@/data/apps";
import { Activity } from "lucide-react";
import { AppId, IconSource } from "@/types";
import AppIcon from "@/components/system/AppIcon";
import StartButton from "./StartButton";
import StartMenu from "./StartMenu";
import SystemClock from "./SystemClock";
import ContextMenu, { useContextMenu } from "@/components/system/ContextMenu";
import TaskManagerDialog from "@/components/system/TaskManagerDialog";

/** Taskbar buttons reuse each app’s own XP icon from the registry. */
const APP_ICONS = APP_REGISTRY.reduce(
  (map, app) => ({ ...map, [app.id]: app.icon }),
  {} as Record<AppId, IconSource>
);

export default function Taskbar() {
  const [startOpen, setStartOpen] = useState(false);
  const [taskManagerOpen, setTaskManagerOpen] = useState(false);
  const [activeWinId, setActiveWinId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const { windows, focusWindow, minimizeWindow, restoreWindow, closeWindow, openWindow } =
    useWindowStore();
  const barMenu = useContextMenu();
  const winMenu = useContextMenu();

  // Close start menu on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent | TouchEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setStartOpen(false);
      }
    }
    if (startOpen) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("touchstart", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [startOpen]);

  function handleTaskClick(id: string, isMinimized: boolean) {
    if (isMinimized) {
      restoreWindow(id);
    } else {
      minimizeWindow(id);
    }
  }

  const activeWin = windows.find((w) => w.id === activeWinId) ?? null;

  return (
    <div
      className="xp-taskbar absolute bottom-0 left-0 right-0 h-10 flex items-stretch z-[9999]"
      onContextMenu={barMenu.openMenu}
      {...barMenu.touchHandlers}
    >
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
              onContextMenu={(e) => {
                setActiveWinId(win.id);
                winMenu.openMenu(e);
              }}
              onTouchStart={(e) => {
                setActiveWinId(win.id);
                winMenu.touchHandlers.onTouchStart(e);
              }}
              onTouchEnd={winMenu.touchHandlers.onTouchEnd}
              onTouchMove={winMenu.touchHandlers.onTouchMove}
              onTouchCancel={winMenu.touchHandlers.onTouchCancel}
              className={`xp-taskbar-btn flex items-center gap-1.5 px-2 py-0.5 h-7 max-w-[160px] min-w-[80px] text-xs text-left truncate shrink-0 ${
                !win.isMinimized ? "xp-taskbar-btn-active" : ""
              }`}
              title={win.title}
            >
              <AppIcon
                icon={APP_ICONS[win.appId] ?? "/WindowsXPICon.png"}
                size={16}
                className="text-white"
              />
              <span className="truncate text-white">{win.title}</span>
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      <SystemClock />

      <AnimatePresence>
        {barMenu.menu && (
          <ContextMenu
            x={barMenu.menu.x}
            y={barMenu.menu.y}
            onClose={barMenu.closeMenu}
            items={[
              {
                label: "Toolbars",
                disabled: true,
                disabledHint: "Not available in this demo",
              },
              { type: "separator" },
              {
                label: "Task Manager",
                icon: Activity,
                onClick: () => setTaskManagerOpen(true),
              },
              { type: "separator" },
              {
                label: "Properties",
                icon: "/GearIcon.png",
                onClick: () => openWindow("controlPanel"),
              },
            ]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {winMenu.menu && activeWin && (
          <ContextMenu
            x={winMenu.menu.x}
            y={winMenu.menu.y}
            onClose={winMenu.closeMenu}
            items={[
              activeWin.isMinimized
                ? { label: "Restore", onClick: () => restoreWindow(activeWin.id) }
                : { label: "Minimize", onClick: () => minimizeWindow(activeWin.id) },
              { label: "Close", onClick: () => closeWindow(activeWin.id) },
            ]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {taskManagerOpen && (
          <TaskManagerDialog onClose={() => setTaskManagerOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
