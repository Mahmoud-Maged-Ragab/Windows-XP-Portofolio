"use client";

import { useState } from "react";
import { ArrowLeft, Check, ExternalLink } from "lucide-react";
import { PROJECTS } from "@/data/projects";
import { Project } from "@/types";

function ProjectDetail({
  project,
  onBack,
}: {
  project: Project;
  onBack: () => void;
}) {
  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      {/* Toolbar */}
      <div className="flex items-center gap-2 px-2 py-1 border-b border-gray-400 bg-[#ECE9D8]">
        <button
          onClick={onBack}
          className="xp-btn text-xs px-2 py-0.5 flex items-center gap-1"
        >
          <ArrowLeft size={12} aria-hidden="true" /> Back
        </button>
        <span className="text-xs text-gray-600 font-mono">
          C:\Projects\{project.name}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <img
            src={project.icon}
            className="w-25 rounded-3xl"
            alt={project.name}
          />
          <div>
            <h2 className="text-lg font-bold text-gray-800">{project.name}</h2>
            <div className="flex gap-2 mt-1">
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xp-btn text-xs px-2 py-0.5 inline-flex items-center gap-1"
                >
                  GitHub <ExternalLink size={12} aria-hidden="true" />
                </a>
              )}
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="xp-btn text-xs px-2 py-0.5 inline-flex items-center gap-1"
                >
                  Live Demo <ExternalLink size={12} aria-hidden="true" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300" />

        {/* Description */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-1">Description</h3>
          <p className="text-sm text-gray-700">{project.description}</p>
        </div>

        {/* Tech stack */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-2">Tech Stack</h3>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="bg-blue-100 border border-blue-300 text-blue-700 text-xs px-2 py-0.5 rounded"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Features */}
        <div>
          <h3 className="text-sm font-bold text-gray-700 mb-2">Features</h3>
          <ul className="space-y-1">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <Check size={14} className="text-green-500 mt-0.5 shrink-0" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsWindow() {
  const [selected, setSelected] = useState<Project | null>(null);

  if (selected) {
    return (
      <ProjectDetail project={selected} onBack={() => setSelected(null)} />
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      {/* Explorer menu */}
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
      <div className="flex items-center gap-2 px-2 py-1 bg-[#ECE9D8] border-b border-gray-400 text-xs">
        <span className="text-gray-600">Address</span>
        <div className="flex-1 bg-white border border-gray-400 px-2 py-0.5 text-blue-700 font-mono">
          C:\Users\Portfolio\Projects
        </div>
      </div>

      {/* Sidebar + file grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel */}
        <div className="w-36 shrink-0 bg-[#D6E8F7] border-r border-gray-400 p-2">
          <p className="text-xs font-bold text-blue-800 mb-2">
            File and Folder Tasks
          </p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li className="hover:underline cursor-pointer">
              Make a new folder
            </li>
            <li className="hover:underline cursor-pointer">
              Publish this folder
            </li>
            <li className="hover:underline cursor-pointer">
              Share this folder
            </li>
          </ul>
          <p className="text-xs font-bold text-blue-800 mb-2 mt-4">
            Other Places
          </p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li className="hover:underline cursor-pointer">My Documents</li>
            <li className="hover:underline cursor-pointer">My Computer</li>
            <li className="hover:underline cursor-pointer">My Network</li>
          </ul>
        </div>

        {/* Files grid */}
        <div className="flex-1 overflow-y-auto p-3 @container">
          <div className="grid grid-cols-2 @sm:grid-cols-3 gap-2">
            {PROJECTS.map((project) => (
              <button
                key={project.id}
                onDoubleClick={() => setSelected(project)}
                onClick={() => setSelected(project)}
                className="flex flex-col items-center gap-1 p-2 rounded hover:bg-blue-100 active:bg-blue-200 text-center group cursor-pointer"
                title={`Double-click to open ${project.name}`}
              >
                <img
                  src={project.icon}
                  className="w-25 rounded-3xl"
                  alt={project.name}
                />
                <span className="text-xs text-gray-800 leading-tight text-center max-w-[80px] break-words">
                  {project.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="border-t border-gray-400 bg-[#ECE9D8] px-2 py-0.5 text-xs text-gray-600">
        {PROJECTS.length} object(s)
      </div>
    </div>
  );
}
