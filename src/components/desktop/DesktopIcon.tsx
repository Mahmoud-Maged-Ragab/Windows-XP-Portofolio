"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AppDefinition } from "@/types";
import { useWindowStore } from "@/store/windowStore";

interface DesktopIconProps {
  app: AppDefinition;
}

export default function DesktopIcon({ app }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const [selected, setSelected] = useState(false);
  const [lastClick, setLastClick] = useState(0);

  function handleClick() {
    const now = Date.now();
    if (now - lastClick < 400) {
      // Double-click
      openWindow(app.id);
      setSelected(false);
    } else {
      setSelected(true);
    }
    setLastClick(now);
  }
  return (
    <motion.button
      onClick={handleClick}
      onBlur={() => setSelected(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`flex flex-col items-center gap-1 p-2 rounded cursor-pointer w-[76px] focus:outline-none ${
        selected
          ? "bg-blue-500/40 border border-blue-400 border-dashed"
          : "hover:bg-white/10"
      }`}
      aria-label={`Open ${app.title}`}
    >
      {/* Icon */}
      <div className="relative">
        <img src={app.icon} className="w-25" alt={app.icon} />
        {selected && (
          <div className="absolute inset-0 bg-blue-500/30 rounded" />
        )}
      </div>

      {/* Label */}
      <span
        className={`text-white text-[11px] text-center leading-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] select-none max-w-full break-words ${
          selected ? "bg-blue-600 text-white px-1 rounded" : ""
        }`}
      >
        {app.title}
      </span>
    </motion.button>
  );
}
