"use client";

import { AppId } from "@/types";
import { useWindowStore } from "@/store/windowStore";

interface Drive {
  letter: string;
  label: string;
  appId: AppId;
  icon: string;
  fillPercent: number;
}

const DRIVES: Drive[] = [
  { letter: "C:", label: "About Me", appId: "about", icon: "/hWgjp1e.png", fillPercent: 100 },
  { letter: "D:", label: "Skills", appId: "skills", icon: "/FolderIcon.png", fillPercent: 88 },
  { letter: "E:", label: "Projects", appId: "projects", icon: "/FolderIcon.png", fillPercent: 75 },
  {
    letter: "F:",
    label: "Contact",
    appId: "contact",
    icon: "/tumblr_28f7d41869ff8aec052777020eeb6242_385b0d2b_540.png",
    fillPercent: 100,
  },
];

function DriveTile({ drive, onOpen }: { drive: Drive; onOpen: () => void }) {
  return (
    <button
      onDoubleClick={onOpen}
      onClick={onOpen}
      className="flex items-center gap-3 p-3 bg-white border border-gray-300 rounded shadow-sm hover:bg-blue-50 hover:border-blue-400 transition-colors text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      aria-label={`Open ${drive.label}${drive.letter ? ` (${drive.letter})` : ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={drive.icon} className="w-10 h-10 object-contain shrink-0 rounded" alt="" />
      <div className="min-w-0 flex-1">
        <p className="text-xs font-bold text-gray-800 truncate">
          {drive.label}
          {drive.letter && ` (${drive.letter})`}
        </p>
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-1.5 border border-gray-300">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-700"
            style={{ width: `${drive.fillPercent}%` }}
          />
        </div>
        <p className="text-[10px] text-gray-500 mt-0.5">{drive.fillPercent}% full</p>
      </div>
    </button>
  );
}

export default function MyComputerWindow() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      <div className="xp-menu-bar px-2 py-0.5 flex gap-4 text-xs border-b border-gray-400 shrink-0">
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <button
            key={item}
            className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-gray-400 text-xs shrink-0">
        <span className="text-gray-600">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-blue-700 font-mono truncate">
          My Computer
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="hidden sm:block w-40 shrink-0 bg-[#D6E8F7] border-r border-gray-400 p-2 overflow-y-auto">
          <p className="text-xs font-bold text-blue-800 mb-2">System Tasks</p>
          <ul className="text-xs text-blue-700 space-y-1.5">
            <li>
              <button
                onClick={() => openWindow("systemProperties")}
                className="hover:underline text-left"
              >
                View system information
              </button>
            </li>
            <li>
              <button
                onClick={() => openWindow("controlPanel")}
                className="hover:underline text-left"
              >
                Open Control Panel
              </button>
            </li>
          </ul>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          <div>
            <p className="text-xs font-bold text-gray-600 mb-2">
              Files Stored on This Computer
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <DriveTile
                drive={{
                  letter: "",
                  label: "My Documents",
                  appId: "myDocuments",
                  icon: "/FolderIcon.png",
                  fillPercent: 40,
                }}
                onOpen={() => openWindow("myDocuments")}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-bold text-gray-600 mb-2">Hard Disk Drives</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {DRIVES.map((drive) => (
                <DriveTile
                  key={drive.letter}
                  drive={drive}
                  onOpen={() => openWindow(drive.appId)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-400 bg-[#ECE9D8] px-2 py-0.5 text-xs text-gray-600 shrink-0">
        {DRIVES.length + 1} object(s)
      </div>
    </div>
  );
}
