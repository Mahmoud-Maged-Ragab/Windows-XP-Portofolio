"use client";

import { useWindowStore } from "@/store/windowStore";
import { APP_REGISTRY } from "@/data/apps";
import XPDialog from "./XPDialog";
import AppIcon from "./AppIcon";

export default function TaskManagerDialog({ onClose }: { onClose: () => void }) {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const closeWindow = useWindowStore((s) => s.closeWindow);

  return (
    <XPDialog
      title="Windows Task Manager"
      icon="/GearIcon.png"
      onClose={onClose}
      widthClassName="max-w-sm"
    >
      <p className="text-xs text-gray-600 mb-2">Applications</p>
      {windows.length === 0 ? (
        <p className="text-xs text-gray-500 italic py-4 text-center">
          No applications are running.
        </p>
      ) : (
        <div className="border border-gray-300 rounded divide-y divide-gray-200 max-h-56 overflow-y-auto">
          {windows.map((w) => {
            const app = APP_REGISTRY.find((a) => a.id === w.appId);
            return (
              <div key={w.id} className="flex items-center gap-2 px-2 py-1.5">
                {app?.icon && <AppIcon icon={app.icon} size={16} className="text-[#1F4E9C]" />}
                <span className="flex-1 min-w-0 truncate text-xs text-gray-800">
                  {w.title}
                  {w.isMinimized && (
                    <span className="text-gray-400"> (minimized)</span>
                  )}
                </span>
                <button
                  onClick={() => focusWindow(w.id)}
                  className="xp-btn text-[11px] px-2 py-0.5"
                >
                  Switch To
                </button>
                <button
                  onClick={() => closeWindow(w.id)}
                  className="xp-btn text-[11px] px-2 py-0.5"
                >
                  End Task
                </button>
              </div>
            );
          })}
        </div>
      )}
    </XPDialog>
  );
}
