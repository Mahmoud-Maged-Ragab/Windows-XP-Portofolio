"use client";

import { useState } from "react";
import { DOCUMENTS } from "@/data/documents";
import { DocumentEntry } from "@/types";
import { useWindowStore } from "@/store/windowStore";
import { FileText } from "lucide-react";
import NotepadViewer from "./NotepadViewer";
import { ICON_STROKE } from "@/components/system/AppIcon";

export default function MyDocumentsWindow() {
  const [selected, setSelected] = useState<DocumentEntry | null>(null);
  const openWindow = useWindowStore((s) => s.openWindow);

  function handleOpen(doc: DocumentEntry) {
    if (doc.id === "resume") {
      openWindow("cv");
      return;
    }
    setSelected(doc);
  }

  if (selected) {
    return (
      <NotepadViewer
        fileName={selected.name}
        initialContent={selected.content}
        readOnly
        onBack={() => setSelected(null)}
      />
    );
  }

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
          C:\Users\Portfolio\My Documents
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <table className="w-full text-xs table-fixed">
          <thead>
            <tr className="text-left text-gray-500 border-b border-gray-300 sticky top-0 bg-[#ECE9D8]">
              <th className="px-3 py-1.5 font-semibold w-1/2">Name</th>
              <th className="px-3 py-1.5 font-semibold">Type</th>
            </tr>
          </thead>
          <tbody>
            {DOCUMENTS.map((doc) => (
              <tr
                key={doc.id}
                className="cursor-pointer hover:bg-blue-100 border-b border-gray-200"
              >
                <td className="px-3 py-2">
                  <button
                    onClick={() => handleOpen(doc)}
                    className="flex items-center gap-2 text-left w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
                    aria-label={`Open ${doc.name}`}
                  >
                    <FileText size={20} strokeWidth={ICON_STROKE} className="text-[#1F4E9C] shrink-0" aria-hidden="true" />
                    <span className="text-gray-800 truncate">{doc.name}</span>
                  </button>
                </td>
                <td className="px-3 py-2 text-gray-500 truncate">{doc.kind}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="border-t border-gray-400 bg-[#ECE9D8] px-2 py-0.5 text-xs text-gray-600 shrink-0">
        {DOCUMENTS.length} object(s)
      </div>
    </div>
  );
}
