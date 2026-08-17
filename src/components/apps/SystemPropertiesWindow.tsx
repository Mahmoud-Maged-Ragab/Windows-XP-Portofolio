"use client";

import { CV } from "@/data/cv";

const TECH_STACK = [
  "Next.js 16",
  "React 19",
  "TypeScript",
  "Tailwind CSS v4",
  "Framer Motion",
  "Zustand",
];

export default function SystemPropertiesWindow() {
  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      <div className="border-b border-gray-400 bg-white px-4 pt-3 shrink-0">
        <div className="flex gap-1 text-xs">
          {["General", "Computer Name", "Hardware", "Advanced"].map((tab, i) => (
            <span
              key={tab}
              className={`px-3 py-1.5 rounded-t border border-b-0 ${
                i === 0
                  ? "bg-white border-gray-400 font-semibold text-gray-800 -mb-px"
                  : "bg-gray-100 border-gray-300 text-gray-400"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5 bg-white">
        <div className="flex items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/WindowsXPICon.png" className="w-16" alt="" />
          <div>
            <p className="text-lg font-bold text-blue-800">
              Mahmoud XP Professional
            </p>
            <p className="text-xs text-gray-600">
              Version 2026, Build 10.0.19045 &ldquo;Portfolio Edition&rdquo;
            </p>
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <div>
          <p className="text-xs font-bold text-gray-700 mb-1">Registered to</p>
          <p className="text-sm text-gray-800">{CV.name}</p>
          <p className="text-xs text-gray-500">
            {CV.title.split("|")[0].trim()} — {CV.contact.location}
          </p>
        </div>

        <div className="border-t border-gray-200" />

        <div>
          <p className="text-xs font-bold text-gray-700 mb-2">Built With</p>
          <div className="flex flex-wrap gap-1.5">
            {TECH_STACK.map((t) => (
              <span
                key={t}
                className="bg-blue-100 border border-blue-300 text-blue-700 text-xs px-2 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200" />

        <p className="text-xs text-gray-500">
          Last updated: August 2026 · Designed and developed by Mahmoud Maged
          Ragab as an interactive portfolio experience.
        </p>
      </div>
    </div>
  );
}
