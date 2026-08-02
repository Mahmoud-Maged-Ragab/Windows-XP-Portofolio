"use client";

import { useState, useEffect } from "react";
import Wallpaper from "./Wallpaper";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "@/components/taskbar/Taskbar";
import WindowManager from "@/components/window/WindowManager";
import { APP_REGISTRY } from "@/data/apps";
import { useWindowStore } from "@/store/windowStore";

export default function Desktop() {
  const [_, setDesktopClick] = useState(0);
  const setViewport = useWindowStore((s) => s.setViewport);

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

  return (
    <div
      className="relative w-screen overflow-hidden select-none"
      style={{ height: "100dvh" }}
      onClick={() => setDesktopClick((n) => n + 1)}
    >
      {/* Wallpaper */}
      <Wallpaper />

      {/* Desktop icons — reflow into new columns instead of overflowing */}
      <div
        className="absolute top-4 left-4 right-4 bottom-16 flex flex-col flex-wrap content-start gap-y-1 gap-x-3 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {APP_REGISTRY.map((app) => (
          <DesktopIcon key={app.id} app={app} />
        ))}
      </div>

      {/* Windows layer */}
      <div className="absolute inset-0" style={{ bottom: 40 }}>
        <WindowManager />
      </div>

      {/* Taskbar */}
      <Taskbar />
    </div>
  );
}
