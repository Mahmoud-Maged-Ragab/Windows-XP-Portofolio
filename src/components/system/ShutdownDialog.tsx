"use client";

import { AnimatePresence } from "framer-motion";
import { useSystemStore } from "@/store/systemStore";
import XPDialog from "./XPDialog";

function ShutdownOption({
  icon,
  label,
  onClick,
}: {
  icon: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1.5 w-20 p-2 rounded hover:bg-blue-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={icon} className="w-10 h-10 object-contain" alt="" />
      <span className="text-xs text-gray-700">{label}</span>
    </button>
  );
}

export default function ShutdownDialog() {
  const shutdownDialogOpen = useSystemStore((s) => s.shutdownDialogOpen);
  const closeShutdownDialog = useSystemStore((s) => s.closeShutdownDialog);
  const turnOff = useSystemStore((s) => s.turnOff);
  const restart = useSystemStore((s) => s.restart);
  const logOff = useSystemStore((s) => s.logOff);

  return (
    <AnimatePresence>
      {shutdownDialogOpen && (
        <XPDialog
          title="Turn off computer"
          icon="/WindowsXPICon.png"
          onClose={closeShutdownDialog}
          widthClassName="max-w-md"
          footer={
            <button
              onClick={closeShutdownDialog}
              className="xp-btn text-xs px-3 py-1"
            >
              Cancel
            </button>
          }
        >
          <p className="mb-4 text-center text-gray-700">
            What do you want the computer to do?
          </p>
          <div className="flex justify-center gap-3">
            <ShutdownOption icon="/PowerIcon.svg" label="Turn Off" onClick={turnOff} />
            <ShutdownOption icon="/RefreshIcon.svg" label="Restart" onClick={restart} />
            <ShutdownOption icon="/LogOffIcon.svg" label="Log Off" onClick={logOff} />
          </div>
        </XPDialog>
      )}
    </AnimatePresence>
  );
}
