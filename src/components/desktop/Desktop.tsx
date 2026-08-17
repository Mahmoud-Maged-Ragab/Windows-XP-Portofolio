"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { playSound } from "@/lib/sound";
import Wallpaper from "./Wallpaper";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "@/components/taskbar/Taskbar";
import WindowManager from "@/components/window/WindowManager";
import { APP_REGISTRY } from "@/data/apps";
import { useWindowStore } from "@/store/windowStore";
import { useSystemStore } from "@/store/systemStore";
import ShutdownDialog from "@/components/system/ShutdownDialog";
import RunDialog from "@/components/system/RunDialog";
import ContextMenu, { useContextMenu } from "@/components/system/ContextMenu";
import {
  PowerTransitionScreen,
  RestartSequence,
  PoweredOffScreen,
  LoginScreen,
} from "@/components/system/PowerScreens";

const DESKTOP_APPS = APP_REGISTRY.filter((a) => a.showOnDesktop !== false);

export default function Desktop() {
  const [_, setDesktopClick] = useState(0);
  const setViewport = useWindowStore((s) => s.setViewport);
  const closeAllWindows = useWindowStore((s) => s.closeAllWindows);
  const powerState = useSystemStore((s) => s.powerState);
  const login = useSystemStore((s) => s.login);
  const powerOn = useSystemStore((s) => s.powerOn);
  const openWindow = useWindowStore((s) => s.openWindow);
  const iconSize = useSystemStore((s) => s.iconSize);
  const setIconSize = useSystemStore((s) => s.setIconSize);
  const textScale = useSystemStore((s) => s.textScale);
  const { menu, openMenu, closeMenu, touchHandlers } = useContextMenu();

  useEffect(() => {
    document.documentElement.classList.toggle(
      "text-scale-large",
      textScale === "large"
    );
  }, [textScale]);

  // Single, debounced resize/orientation listener shared by all windows.
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    function update() {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    }
    function onResize() {
      clearTimeout(timeout);
      timeout = setTimeout(update, 120);
    }
    update();
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, [setViewport]);

  const handleShutdownMessageDone = useCallback(() => {
    closeAllWindows();
    useSystemStore.setState({ powerState: "off" });
  }, [closeAllWindows]);

  const handleLogoffMessageDone = useCallback(() => {
    useSystemStore.setState({ powerState: "login" });
  }, []);

  const handleBootDone = useCallback(() => {
    closeAllWindows();
    useSystemStore.setState({ powerState: "running" });
    playSound("startup");
  }, [closeAllWindows]);

  const handleLogin = useCallback(() => {
    login();
    playSound("startup");
  }, [login]);

  if (powerState === "shutting-down") {
    return (
      <PowerTransitionScreen
        message="Windows is shutting down..."
        onDone={handleShutdownMessageDone}
      />
    );
  }
  if (powerState === "off") {
    return <PoweredOffScreen onPowerOn={powerOn} />;
  }
  if (powerState === "restarting") {
    return <RestartSequence onDone={handleBootDone} />;
  }
  if (powerState === "logging-off") {
    return (
      <PowerTransitionScreen message="Logging off..." onDone={handleLogoffMessageDone} />
    );
  }
  if (powerState === "login") {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div
      className="relative w-screen overflow-hidden select-none"
      style={{ height: "100dvh" }}
      onClick={() => setDesktopClick((n) => n + 1)}
      onContextMenu={openMenu}
      {...touchHandlers}
    >
      {/* Wallpaper */}
      <Wallpaper />

      {/* Desktop icons — XP-style grid: fill a column top-to-bottom, then wrap
          into the next column. Tight gaps keep the ~75px XP cell spacing. */}
      <div
        className="absolute top-2 left-2 right-2 bottom-14 flex flex-col flex-wrap content-start gap-y-0.5 gap-x-0.5 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {DESKTOP_APPS.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Windows layer */}
      <div className="absolute inset-0" style={{ bottom: 40 }}>
        <WindowManager />
      </div>

      {/* Taskbar */}
      <Taskbar />

      <ShutdownDialog />
      <RunDialog />

      <AnimatePresence>
        {menu && (
          <ContextMenu
            x={menu.x}
            y={menu.y}
            onClose={closeMenu}
            items={[
              {
                label: iconSize === "large" ? "Large Icons (on)" : "Large Icons",
                icon: "/DisplayIcon.svg",
                onClick: () =>
                  setIconSize(iconSize === "large" ? "normal" : "large"),
              },
              {
                label: "Refresh",
                icon: "/RefreshIcon.svg",
                onClick: () => setDesktopClick((n) => n + 1),
              },
              { type: "separator" },
              {
                label: "New Text Document",
                icon: "/NotepadIcon.svg",
                onClick: () => openWindow("notepad"),
              },
              { type: "separator" },
              {
                label: "Properties",
                icon: "/MyComputerIcon.svg",
                onClick: () => openWindow("systemProperties"),
              },
            ]}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
