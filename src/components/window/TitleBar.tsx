"use client";

import { useDraggable } from "@/hooks/useDraggable";

interface TitleBarProps {
  title: string;
  icon?: string;
  position: { x: number; y: number };
  isMaximized: boolean;
  onMove: (pos: { x: number; y: number }) => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onClose: () => void;
  onFocus: () => void;
}

export default function TitleBar({
  title,
  icon,
  position,
  isMaximized,
  onMove,
  onMinimize,
  onMaximize,
  onClose,
  onFocus,
}: TitleBarProps) {
  const { onMouseDown, onTouchStart } = useDraggable({
    onMove,
    initialPosition: position,
    disabled: isMaximized,
  });

  return (
    <div
      onMouseDown={(e) => {
        onFocus();
        onMouseDown(e);
      }}
      onTouchStart={(e) => {
        onFocus();
        onTouchStart(e);
      }}
      onDoubleClick={onMaximize}
      className="xp-titlebar flex items-center justify-between px-2 py-1 select-none cursor-default"
      style={{ minHeight: 30, touchAction: 'none' }}
    >
      {/* Left: icon + title */}

      <div className="flex items-center gap-1.5 min-w-0">
        {icon && <img src={icon} className="w-5" alt={title} />}
        <span className="text-white text-xs font-bold truncate drop-shadow-sm">
          {title}
        </span>
      </div>

      {/* Right: window controls */}
      <div className="flex items-center gap-1 ml-2 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMinimize();
          }}
          className="xp-btn-minimize w-[18px] h-[18px] flex items-center justify-center text-black text-xs font-bold rounded-sm leading-none"
          aria-label="Minimize"
        >
          <span className="mb-1">_</span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onMaximize();
          }}
          className="xp-btn-maximize w-[18px] h-[18px] flex items-center justify-center text-black text-xs font-bold rounded-sm leading-none"
          aria-label="Maximize"
        >
          {isMaximized ? "❐" : "□"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="xp-btn-close w-[18px] h-[18px] flex items-center justify-center text-white text-xs font-bold rounded-sm leading-none"
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
