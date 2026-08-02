"use client";

import { motion } from "framer-motion";
import { APP_REGISTRY } from "@/data/apps";
import { useWindowStore } from "@/store/windowStore";
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

export default function StartMenu({ onClose }: StartMenuProps) {
  const openWindow = useWindowStore((s) => s.openWindow);

  function open(appId: AppId) {
    openWindow(appId);
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
            className="object-cover"
          />
        </div>
        <div>
          <p className="text-white font-bold text-sm">Mahmoud Ragab</p>
          <p className="text-blue-200 text-xs">Frontend Developer</p>
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
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-600 hover:text-white group text-left"
            >
              <img src={item.icon} className="w-10" alt="" />
              <span className="text-sm text-gray-800 group-hover:text-white">
                {item.label}
              </span>
            </button>
          ))}

          <div className="border-t border-gray-200 my-2" />

          {APP_REGISTRY.filter(
            (a) => !QUICK_LINKS.some((q) => q.appId === a.id),
          ).map((app) => (
            <button
              key={app.id}
              onClick={() => open(app.id)}
              className="w-full flex items-center gap-3 px-3 py-2 hover:bg-blue-600 hover:text-white group text-left"
            >
              <span className="text-xl">{app.icon}</span>
              <span className="text-sm text-gray-800 group-hover:text-white">
                {app.title}
              </span>
            </button>
          ))}
        </div>

        {/* Right column — system items */}
        <div className="w-[110px] bg-[#D6E8F7] py-2 flex flex-col gap-1">
          {[
            { icon: "🖥️", label: "My Computer" },
            { icon: "📂", label: "Documents" },
            { icon: "🌐", label: "Internet" },
            { icon: "⚙️", label: "Settings" },
          ].map((item) => (
            <button
              key={item.label}
              className="flex flex-col items-center gap-1 px-2 py-2 hover:bg-blue-600 hover:text-white group w-full text-center"
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs text-gray-700 group-hover:text-white leading-tight">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="xp-start-footer shrink-0 flex justify-end gap-2 px-3 py-2">
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-white text-xs hover:bg-white/20 px-2 py-1 rounded transition-colors"
        >
          <span>🔴</span> Log Off
        </button>
        <button
          onClick={onClose}
          className="flex items-center gap-1.5 text-white text-xs hover:bg-white/20 px-2 py-1 rounded transition-colors"
        >
          <span>🔌</span> Shut Down
        </button>
      </div>
    </motion.div>
  );
}
