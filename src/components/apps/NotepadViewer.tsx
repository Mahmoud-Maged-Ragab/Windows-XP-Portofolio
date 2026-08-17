"use client";

import { useState } from "react";

interface NotepadViewerProps {
  initialContent?: string;
  readOnly?: boolean;
  onBack?: () => void;
  fileName?: string;
}

export default function NotepadViewer({
  initialContent = "",
  readOnly = false,
  onBack,
  fileName,
}: NotepadViewerProps) {
  const [content, setContent] = useState(initialContent);

  return (
    <div className="h-full flex flex-col bg-white font-mono text-sm">
      <div className="flex items-center gap-0 text-xs border-b border-gray-300 bg-[#ECE9D8] px-1 shrink-0">
        {onBack && (
          <button
            onClick={onBack}
            className="xp-btn text-xs px-2 py-0.5 my-1 mr-2 flex items-center gap-1"
          >
            ← Back
          </button>
        )}
        {["File", "Edit", "Format", "View", "Help"].map((menu) => (
          <button
            key={menu}
            className="px-2 py-0.5 hover:bg-blue-600 hover:text-white"
          >
            {menu}
          </button>
        ))}
        {fileName && (
          <span className="ml-auto text-gray-500 pr-2 truncate">{fileName}</span>
        )}
      </div>
      <textarea
        value={content}
        onChange={(e) => !readOnly && setContent(e.target.value)}
        readOnly={readOnly}
        spellCheck={false}
        aria-label={fileName ? `${fileName} contents` : "Notepad document"}
        className="flex-1 w-full resize-none outline-none p-3 text-sm leading-relaxed bg-white text-gray-900"
      />
    </div>
  );
}
