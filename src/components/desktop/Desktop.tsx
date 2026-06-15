"use client";

import { useState } from "react";
import Wallpaper from "./Wallpaper";
import DesktopIcon from "./DesktopIcon";
import Taskbar from "@/components/taskbar/Taskbar";
import WindowManager from "@/components/window/WindowManager";
import { APP_REGISTRY } from "@/data/apps";

export default function Desktop() {
  const [_, setDesktopClick] = useState(0);

  return (
    <div
      className="relative w-screen overflow-hidden select-none"
      style={{ height: "100dvh" }}
      onClick={() => setDesktopClick((n) => n + 1)}
    >
      {/* Wallpaper */}
      <Wallpaper />

      {/* Desktop icons — top-left column */}
      <div
        className="absolute top-4 left-4 flex flex-col gap-1 z-10"
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
