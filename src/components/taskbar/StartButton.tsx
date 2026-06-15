"use client";

import { motion } from "framer-motion";

interface StartButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function StartButton({ isOpen, onClick }: StartButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      className={`xp-start-btn flex items-center gap-1.5 px-3 h-full text-white font-bold text-sm select-none ${
        isOpen ? "xp-start-btn-active" : ""
      }`}
      aria-expanded={isOpen}
      aria-haspopup="menu"
    >
      <img src="/WindowsXPICon.png" className="w-5" alt="" />
      <span>start</span>
    </motion.button>
  );
}
