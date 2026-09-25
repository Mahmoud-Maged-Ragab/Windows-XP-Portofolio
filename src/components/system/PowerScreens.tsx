"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Power } from "lucide-react";
import BootScreen from "./BootScreen";
import { ICON_STROKE } from "./AppIcon";

const SKY = { background: "linear-gradient(to bottom, #1a5bb5 0%, #0a246a 100%)" };

export function PowerTransitionScreen({
  message,
  onDone,
  duration = 1500,
}: {
  message: string;
  onDone: () => void;
  duration?: number;
}) {
  useEffect(() => {
    const t = setTimeout(onDone, duration);
    return () => clearTimeout(t);
  }, [onDone, duration]);

  return (
    <div
      className="fixed inset-0 z-[10002] flex flex-col items-center justify-center gap-4"
      style={SKY}
    >
      <p className="text-white text-xl font-semibold tracking-wide">{message}</p>
      <div className="flex gap-1.5" aria-hidden="true">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-white/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
          />
        ))}
      </div>
    </div>
  );
}

export function RestartSequence({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<"message" | "booting">("message");

  if (phase === "message") {
    return (
      <PowerTransitionScreen
        message="Windows is restarting..."
        duration={1400}
        onDone={() => setPhase("booting")}
      />
    );
  }

  return <PoweringOn onDone={onDone} />;
}

export function PoweringOn({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1800);
    return () => clearTimeout(t);
  }, [onDone]);
  return <BootScreen />;
}

export function PoweredOffScreen({ onPowerOn }: { onPowerOn: () => void }) {
  const [phase, setPhase] = useState<"classic" | "thanks">("classic");

  useEffect(() => {
    const t = setTimeout(() => setPhase("thanks"), 1800);
    return () => clearTimeout(t);
  }, []);

  if (phase === "classic") {
    return (
      <div className="fixed inset-0 z-[10002] bg-black flex items-center justify-center px-6">
        <p className="text-white text-base sm:text-lg tracking-wide text-center">
          It&apos;s now safe to turn off your computer.
        </p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10002] flex items-center justify-center" style={SKY}>
      <div className="text-center text-white px-6">
        <p className="text-2xl font-bold mb-1">Thanks for visiting my portfolio!</p>
        <p className="text-sm text-blue-100 mb-8">— Mahmoud Maged Ragab</p>
        <button
          onClick={onPowerOn}
          className="mx-auto flex flex-col items-center gap-2 group focus:outline-none"
        >
          <span className="w-16 h-16 rounded-full bg-white/10 border-2 border-white/60 flex items-center justify-center group-hover:bg-white/20 group-focus-visible:bg-white/20 transition-colors">
            <Power size={32} strokeWidth={ICON_STROKE} aria-hidden="true" />
          </span>
          <span className="text-xs text-blue-100">Press to turn on</span>
        </button>
      </div>
    </div>
  );
}

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[10002] flex items-center justify-center"
      style={{ background: "linear-gradient(to bottom, #4a86e8 0%, #1e4fa0 100%)" }}
    >
      <button
        onClick={onLogin}
        className="flex flex-col items-center gap-3 group focus:outline-none"
      >
        <span className="relative w-24 h-24 rounded-xl overflow-hidden border-4 border-white/80 shadow-xl">
          <Image src="/UserImg.jpeg" alt="Mahmoud Ragab" fill className="object-cover" />
        </span>
        <span className="text-white font-semibold text-lg group-hover:underline">
          Mahmoud Ragab
        </span>
        <span className="text-blue-100 text-xs">Click your account picture to log on</span>
      </button>
    </div>
  );
}
