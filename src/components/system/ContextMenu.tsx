"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export interface ContextMenuItem {
  type?: "item" | "separator";
  label?: string;
  /** Path to an icon image under /public (XP-style asset) — optional. */
  icon?: string;
  onClick?: () => void;
  disabled?: boolean;
  disabledHint?: string;
}

interface ContextMenuProps {
  x: number;
  y: number;
  items: ContextMenuItem[];
  onClose: () => void;
}

export default function ContextMenu({ x, y, items, onClose }: ContextMenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x, y });

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const maxX = Math.max(4, window.innerWidth - rect.width - 4);
    const maxY = Math.max(4, window.innerHeight - 40 - rect.height - 4);
    setPos({ x: Math.min(x, maxX), y: Math.min(y, maxY) });
  }, [x, y]);

  useEffect(() => {
    function onOutside(e: MouseEvent | TouchEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("touchstart", onOutside);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("touchstart", onOutside);
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.1 }}
      style={{ position: "fixed", left: pos.x, top: pos.y, zIndex: 10001 }}
      className="min-w-[190px] bg-[#ECE9D8] border border-gray-400 shadow-2xl rounded-sm py-1"
      role="menu"
    >
      {items.map((item, i) =>
        item.type === "separator" ? (
          <div key={i} className="my-1 border-t border-gray-300" role="separator" />
        ) : (
          <button
            key={i}
            role="menuitem"
            disabled={item.disabled}
            title={item.disabled ? item.disabledHint : undefined}
            onClick={() => {
              if (item.disabled) return;
              item.onClick?.();
              onClose();
            }}
            className={`w-full flex items-center gap-2.5 px-3 py-1.5 text-xs text-left focus:outline-none ${
              item.disabled
                ? "text-gray-400 cursor-default"
                : "text-gray-800 hover:bg-blue-600 hover:text-white focus-visible:bg-blue-600 focus-visible:text-white"
            }`}
          >
            <span className="w-4 h-4 shrink-0 flex items-center justify-center" aria-hidden="true">
              {item.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.icon} alt="" className="w-4 h-4 object-contain" />
              )}
            </span>
            <span>{item.label}</span>
          </button>
        )
      )}
    </motion.div>
  );
}

/** Right-click (desktop) + long-press (touch) trigger for a ContextMenu. */
export function useContextMenu() {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressPos = useRef({ x: 0, y: 0 });

  const openMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenu({ x: e.clientX, y: e.clientY });
  }, []);

  const closeMenu = useCallback(() => setMenu(null), []);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      longPressPos.current = { x: touch.clientX, y: touch.clientY };
      longPressTimer.current = setTimeout(() => {
        setMenu({ x: longPressPos.current.x, y: longPressPos.current.y });
      }, 500);
    },
    []
  );

  return {
    menu,
    openMenu,
    closeMenu,
    touchHandlers: {
      onTouchStart,
      onTouchEnd: cancelLongPress,
      onTouchMove: cancelLongPress,
      onTouchCancel: cancelLongPress,
    },
  };
}
