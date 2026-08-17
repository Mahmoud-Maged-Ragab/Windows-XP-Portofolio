"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSystemStore } from "@/store/systemStore";
import { useWindowStore } from "@/store/windowStore";
import { playSound } from "@/lib/sound";
import { AppId } from "@/types";
import XPDialog from "./XPDialog";

const COMMANDS: Record<string, AppId> = {
  about: "about",
  aboutme: "about",
  cv: "cv",
  resume: "cv",
  projects: "projects",
  skills: "skills",
  contact: "contact",
  certificates: "certificates",
  certs: "certificates",
  mycomputer: "myComputer",
  computer: "myComputer",
  documents: "myDocuments",
  mydocuments: "myDocuments",
  control: "controlPanel",
  cpl: "controlPanel",
  notepad: "notepad",
  calc: "calculator",
  calculator: "calculator",
  paint: "paint",
  mspaint: "paint",
  cmd: "commandPrompt",
  command: "commandPrompt",
  winver: "systemProperties",
  systemproperties: "systemProperties",
  help: "helpAndSupport",
  search: "search",
};

export default function RunDialog() {
  const runDialogOpen = useSystemStore((s) => s.runDialogOpen);
  const closeRunDialog = useSystemStore((s) => s.closeRunDialog);
  const openWindow = useWindowStore((s) => s.openWindow);
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleRun() {
    const key = value.trim().toLowerCase();
    if (!key) return;
    const appId = COMMANDS[key];
    if (appId) {
      openWindow(appId);
      setValue("");
      closeRunDialog();
    } else {
      playSound("error");
      setError(value.trim());
    }
  }

  return (
    <>
      <AnimatePresence>
        {runDialogOpen && (
          <XPDialog
            title="Run"
            icon="/WindowsXPICon.png"
            onClose={closeRunDialog}
            widthClassName="max-w-sm"
            footer={
              <>
                <button onClick={handleRun} className="xp-btn-primary text-xs px-3 py-1">
                  OK
                </button>
                <button onClick={closeRunDialog} className="xp-btn text-xs px-3 py-1">
                  Cancel
                </button>
              </>
            }
          >
            <p className="mb-3">
              Type the name of a program, and this desktop will open it for
              you.
            </p>
            <label className="flex items-center gap-2">
              <span className="text-xs text-gray-600 shrink-0">Open:</span>
              <input
                autoFocus
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRun()}
                placeholder="e.g. calc, notepad, projects"
                aria-label="Program name"
                className="flex-1 border border-gray-400 bg-white px-2 py-1 text-xs outline-none focus:border-blue-500"
              />
            </label>
          </XPDialog>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {error !== null && (
          <XPDialog
            title="Run"
            icon="/WindowsXPICon.png"
            onClose={() => setError(null)}
            widthClassName="max-w-xs"
            footer={
              <button
                onClick={() => setError(null)}
                className="xp-btn-primary text-xs px-4 py-1"
              >
                OK
              </button>
            }
          >
            <p>
              Windows cannot find &lsquo;{error}&rsquo;. Make sure you typed
              the name correctly, and then try again.
            </p>
          </XPDialog>
        )}
      </AnimatePresence>
    </>
  );
}
