"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { IconSource } from "@/types";
import AppIcon from "./AppIcon";

interface XPDialogProps {
  title: string;
  icon?: IconSource;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
  widthClassName?: string;
  labelledBy?: string;
}

/**
 * Generic XP-chrome modal dialog. Reused for the shutdown chooser, Run,
 * confirmations, and error dialogs so every "are you sure / here's what
 * happened" moment in the app looks and behaves the same way.
 */
export default function XPDialog({
  title,
  icon,
  onClose,
  children,
  footer,
  widthClassName = "max-w-sm",
}: XPDialogProps) {
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/40 p-4"
      onMouseDown={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 8 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 8 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
        onMouseDown={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`xp-window w-full ${widthClassName} flex flex-col bg-[#ECE9D8] max-h-[85vh]`}
      >
        <div className="xp-titlebar flex items-center justify-between px-2 py-1 shrink-0">
          <div className="flex items-center gap-1.5 min-w-0">
            {icon && <AppIcon icon={icon} size={16} className="text-white" />}
            <span className="text-white text-xs font-bold truncate drop-shadow-sm">
              {title}
            </span>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="xp-btn-close w-[18px] h-[18px] flex items-center justify-center text-white text-xs font-bold rounded-sm leading-none shrink-0"
            aria-label="Close dialog"
          >
            <X size={12} strokeWidth={3} aria-hidden="true" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto text-sm text-gray-800">{children}</div>

        {footer && (
          <div className="flex justify-end gap-2 px-3 py-2 border-t border-gray-300 shrink-0">
            {footer}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
