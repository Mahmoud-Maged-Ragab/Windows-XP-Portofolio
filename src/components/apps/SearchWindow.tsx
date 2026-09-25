"use client";

import { useMemo, useState } from "react";
import { PROJECTS } from "@/data/projects";
import { SKILLS } from "@/data/skills";
import { DOCUMENTS } from "@/data/documents";
import { CERTIFICATES } from "@/data/certificates";
import { useWindowStore } from "@/store/windowStore";
import { AppId, IconSource } from "@/types";
import { Award, FileText, Search } from "lucide-react";
import AppIcon from "@/components/system/AppIcon";

interface Result {
  id: string;
  title: string;
  subtitle: string;
  icon: IconSource;
  appId: AppId;
}

export default function SearchWindow() {
  const [query, setQuery] = useState("");
  const openWindow = useWindowStore((s) => s.openWindow);

  const results = useMemo<Result[]>(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    const list: Result[] = [];

    for (const p of PROJECTS) {
      if (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q))
      ) {
        list.push({
          id: `project-${p.id}`,
          title: p.name,
          subtitle: "Project",
          icon: p.icon,
          appId: "projects",
        });
      }
    }

    for (const g of SKILLS) {
      if (
        g.category.toLowerCase().includes(q) ||
        g.skills.some((s) => s.toLowerCase().includes(q))
      ) {
        list.push({
          id: `skill-${g.category}`,
          title: g.category,
          subtitle: "Skill Category",
          icon: "/GearIcon.png",
          appId: "skills",
        });
      }
    }

    for (const d of DOCUMENTS) {
      if (
        d.name.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q)
      ) {
        list.push({
          id: `doc-${d.id}`,
          title: d.name,
          subtitle: "Document",
          icon: FileText,
          appId: "myDocuments",
        });
      }
    }

    for (const c of CERTIFICATES) {
      if (
        c.title.toLowerCase().includes(q) ||
        c.organization.toLowerCase().includes(q) ||
        (c.instructor?.toLowerCase().includes(q) ?? false) ||
        (c.titleArabic?.includes(query.trim()) ?? false)
      ) {
        list.push({
          id: `cert-${c.id}`,
          title: c.title,
          subtitle: `Certificate — ${c.organization}`,
          icon: Award,
          appId: "certificates",
        });
      }
    }

    return list;
  }, [query]);

  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      <div className="xp-menu-bar px-2 py-0.5 flex gap-4 text-xs border-b border-gray-400 shrink-0">
        {["File", "Edit", "View", "Help"].map((item) => (
          <button
            key={item}
            className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="p-3 border-b border-gray-400 shrink-0">
        <div className="flex items-center gap-2 bg-white border border-gray-400 px-2 py-1.5 rounded-sm">
          <AppIcon icon={Search} size={16} className="text-gray-500" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, skills, documents, certificates..."
            className="flex-1 outline-none text-sm bg-transparent"
            aria-label="Search the desktop"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {query.trim() === "" ? (
          <p className="text-center text-xs text-gray-500 mt-8">
            Start typing to search across projects, skills, documents, and
            certificates.
          </p>
        ) : results.length === 0 ? (
          <p className="text-center text-xs text-gray-500 mt-8">
            No results for &ldquo;{query}&rdquo;.
          </p>
        ) : (
          <ul className="space-y-1">
            {results.map((r) => (
              <li key={r.id}>
                <button
                  onClick={() => openWindow(r.appId)}
                  className="w-full flex items-center gap-3 bg-white border border-gray-300 rounded px-3 py-2 hover:bg-blue-50 hover:border-blue-400 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <AppIcon icon={r.icon} size={24} className="text-[#1F4E9C]" />
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-gray-800 truncate">
                      {r.title}
                    </span>
                    <span className="block text-[10px] text-gray-500">
                      {r.subtitle}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-t border-gray-400 bg-[#ECE9D8] px-2 py-0.5 text-xs text-gray-600 shrink-0">
        {query.trim() === "" ? "Ready" : `${results.length} result(s)`}
      </div>
    </div>
  );
}
