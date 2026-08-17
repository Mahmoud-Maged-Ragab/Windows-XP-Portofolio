"use client";

import { useState } from "react";
import { useSystemStore } from "@/store/systemStore";
import { useWindowStore } from "@/store/windowStore";
import { playSound } from "@/lib/sound";

type Applet = "display" | "sounds" | "accessibility" | "system";

const APPLETS: { id: Applet; label: string; icon: string }[] = [
  { id: "display", label: "Display", icon: "/DisplayIcon.svg" },
  { id: "sounds", label: "Sounds", icon: "/SoundIcon.svg" },
  { id: "accessibility", label: "Accessibility", icon: "/AccessibilityIcon.svg" },
  { id: "system", label: "System", icon: "/MyComputerIcon.svg" },
];

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-start gap-3 bg-white border border-gray-300 rounded p-3 cursor-pointer hover:border-blue-400">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-4 h-4 accent-blue-600"
      />
      <span>
        <span className="block text-sm font-semibold text-gray-800">{label}</span>
        <span className="block text-xs text-gray-500">{description}</span>
      </span>
    </label>
  );
}

function DisplayApplet() {
  const wallpaper = useSystemStore((s) => s.wallpaper);
  const setWallpaper = useSystemStore((s) => s.setWallpaper);
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-gray-800">Desktop Background</h3>
      <div className="grid grid-cols-2 gap-3 max-w-sm">
        <button
          onClick={() => setWallpaper("photo")}
          className={`rounded border-2 overflow-hidden text-left ${
            wallpaper === "photo" ? "border-blue-600" : "border-gray-300"
          }`}
        >
          <div
            className="h-16 bg-cover bg-center"
            style={{ backgroundImage: "url('/HomeImg.jpg')" }}
          />
          <p className="text-xs text-center py-1 bg-white">Photo</p>
        </button>
        <button
          onClick={() => setWallpaper("classic")}
          className={`rounded border-2 overflow-hidden text-left ${
            wallpaper === "classic" ? "border-blue-600" : "border-gray-300"
          }`}
        >
          <div className="h-16 xp-wallpaper" />
          <p className="text-xs text-center py-1 bg-white">Classic Blue</p>
        </button>
      </div>
    </div>
  );
}

function SoundsApplet() {
  const muted = useSystemStore((s) => s.muted);
  const setMuted = useSystemStore((s) => s.setMuted);
  return (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-bold text-gray-800">Sounds</h3>
      <ToggleRow
        label="Mute all sounds"
        description="Silence window open/close and system chimes."
        checked={muted}
        onChange={setMuted}
      />
      <button
        onClick={() => playSound("click")}
        className="xp-btn text-xs px-3 py-1 inline-flex items-center gap-1.5"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/SoundIcon.svg" className="w-4 h-4 object-contain" alt="" />
        Test Sound
      </button>
    </div>
  );
}

function AccessibilityApplet() {
  const textScale = useSystemStore((s) => s.textScale);
  const setTextScale = useSystemStore((s) => s.setTextScale);
  return (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-bold text-gray-800">Accessibility</h3>
      <ToggleRow
        label="Use large text"
        description="Increases text size across the whole desktop for readability."
        checked={textScale === "large"}
        onChange={(v) => setTextScale(v ? "large" : "normal")}
      />
    </div>
  );
}

function SystemApplet() {
  const openWindow = useWindowStore((s) => s.openWindow);
  return (
    <div className="space-y-3 max-w-sm">
      <h3 className="text-sm font-bold text-gray-800">System</h3>
      <p className="text-xs text-gray-600">
        View detailed OS branding, version, and the technologies this portfolio
        is built with.
      </p>
      <button
        onClick={() => openWindow("systemProperties")}
        className="xp-btn text-xs px-3 py-1"
      >
        View System Properties
      </button>
    </div>
  );
}

export default function ControlPanelWindow() {
  const [applet, setApplet] = useState<Applet>("display");

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

      <div className="flex-1 flex overflow-hidden">
        <nav className="w-36 sm:w-44 shrink-0 bg-white border-r border-gray-300 py-2 overflow-y-auto">
          {APPLETS.map((a) => (
            <button
              key={a.id}
              onClick={() => setApplet(a.id)}
              aria-current={applet === a.id ? "true" : undefined}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs text-left ${
                applet === a.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-800 hover:bg-blue-100"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={a.icon} className="w-5 h-5 object-contain shrink-0" alt="" />
              <span>{a.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex-1 overflow-y-auto p-4">
          {applet === "display" && <DisplayApplet />}
          {applet === "sounds" && <SoundsApplet />}
          {applet === "accessibility" && <AccessibilityApplet />}
          {applet === "system" && <SystemApplet />}
        </div>
      </div>

      <div className="border-t border-gray-400 bg-[#ECE9D8] px-2 py-0.5 text-xs text-gray-600 shrink-0">
        {APPLETS.length} Control Panel item(s)
      </div>
    </div>
  );
}
