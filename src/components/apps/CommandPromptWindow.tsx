"use client";

import { useRef, useState } from "react";

const BANNER =
  "Mahmoud XP [Version 2026.10.19045]\n(c) Portfolio Corporation. All rights reserved.\n\nType 'help' to see available commands.";

function execute(cmd: string): string {
  switch (cmd.toLowerCase()) {
    case "":
      return "";
    case "help":
      return "Available commands: help, whoami, skills, projects, contact, clear, exit";
    case "whoami":
      return "MAHMOUD-XP\\mahmoud.ragab";
    case "skills":
      return "JavaScript (ES6+), PHP, SQL, React.js, Next.js, Laravel, Git — see the Skills app for the full list.";
    case "projects":
      return "Windows XP Portfolio, Social Hub, Fresh Cart — see the Projects app for details.";
    case "contact":
      return "Mahmoud.m.ragab@gmail.com | github.com/Mahmoud-Maged-Ragab | linkedin.com/in/mahmoud-ragab-5485652a1";
    case "exit":
      return "Closing a terminal window from inside itself isn't supported here — use the X button.";
    case "sudo make me a sandwich":
      return "Okay.";
    default:
      return `'${cmd}' is not recognized as an internal or external command, operable program or batch file.`;
  }
}

export default function CommandPromptWindow() {
  const [lines, setLines] = useState<string[]>([BANNER]);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function run(cmdRaw: string) {
    const cmd = cmdRaw.trim();
    const key = cmd.toLowerCase();

    if (key === "clear" || key === "cls") {
      setLines([]);
      setInput("");
      return;
    }

    const output = execute(cmd);
    setLines((l) => [
      ...l,
      `C:\\Portfolio> ${cmdRaw}`,
      ...(output ? [output] : []),
    ]);
    setInput("");
    requestAnimationFrame(() =>
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight })
    );
  }

  return (
    <div
      className="h-full flex flex-col bg-black text-green-400 font-mono text-xs cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-2 whitespace-pre-wrap break-words">
        {lines.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
        <div className="flex">
          <span className="shrink-0">C:\Portfolio&gt;&nbsp;</span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") run(input);
            }}
            aria-label="Command input"
            className="flex-1 bg-transparent outline-none text-green-400 caret-green-400 min-w-0"
            autoFocus
            spellCheck={false}
          />
        </div>
      </div>
    </div>
  );
}
