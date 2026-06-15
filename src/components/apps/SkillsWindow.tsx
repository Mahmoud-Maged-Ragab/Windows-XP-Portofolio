"use client";

import { SKILLS } from "@/data/skills";

export default function SkillsWindow() {
  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      {/* Menu bar */}
      <div className="xp-menu-bar px-2 py-0.5 flex gap-4 text-xs border-b border-gray-400">
        {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
          <button
            key={item}
            className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Address bar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-400 text-xs">
        <span className="text-gray-600">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-blue-700 font-mono">
          C:\Users\Portfolio\Skills
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {SKILLS.map((group) => (
          <div
            key={group.category}
            className="bg-white border border-gray-300 rounded shadow-sm overflow-hidden"
          >
            {/* Group header */}
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-blue-600 to-blue-500">
              <div>
                {(() => {
                  const Icon = group.icon;
                  return <Icon size={14} color="white" />;
                })()}
              </div>
              <h3 className="text-sm font-bold text-white">{group.category}</h3>
            </div>
            {/* Skills */}
            <div className="flex flex-wrap gap-2 p-3">
              {group.skills.map((skill) => (
                <div
                  key={skill}
                  className="group flex items-center gap-1.5 bg-[#ECE9D8] border border-gray-300 rounded px-2.5 py-1 text-xs text-gray-800 shadow-sm hover:bg-blue-50 hover:border-blue-400 transition-colors cursor-default"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Status bar */}
      <div className="border-t border-gray-400 bg-[#ECE9D8] px-2 py-0.5 text-xs text-gray-600">
        {SKILLS.reduce((acc, g) => acc + g.skills.length, 0)} skills across{" "}
        {SKILLS.length} categories
      </div>
    </div>
  );
}
