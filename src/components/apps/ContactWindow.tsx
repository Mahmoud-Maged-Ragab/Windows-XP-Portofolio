"use client";

import { Mail } from "lucide-react";
import {
  Linkedin02Icon,
  Github01Icon,
  WebProgrammingIcon,
} from "hugeicons-react";

export default function ContactWindow() {
  return (
    <div className="h-full flex flex-col bg-[#ECE9D8]">
      {/* Menu */}
      <div className="xp-menu-bar px-2 py-0.5 flex gap-4 text-xs border-b border-gray-400">
        {["File", "Edit", "View", "Help"].map((item) => (
          <button
            key={item}
            className="hover:bg-blue-600 hover:text-white px-1 py-0.5 rounded"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <span className="text-3xl">
            <Mail />
          </span>
          <div>
            <h2 className="text-base font-bold text-gray-800">Get in Touch</h2>
            <p className="text-xs text-gray-600">
              I&apos;d love to hear from you!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {[
            {
              icon: Mail,
              label: "Email",
              value: "Mahmoud.m.ragab@gmail.com",
              href: "mailto:Mahmoud.m.ragab@gmail.com",
            },
            {
              icon: Linkedin02Icon,
              label: "LinkedIn",
              value: "https://www.linkedin.com/in/mahmoud-ragab-5485652a1/",
              href: "https://www.linkedin.com/in/mahmoud-ragab-5485652a1/",
            },
            {
              icon: Github01Icon,
              label: "GitHub",
              value: "https://github.com/Mahmoud-Maged-Ragab",
              href: "https://github.com/Mahmoud-Maged-Ragab",
            },
          ].map((link) => {
            const Icon = link.icon;

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 bg-white border border-gray-300 rounded shadow-sm hover:bg-blue-50 hover:border-blue-400 transition-colors"
              >
                <span className="text-xl">
                  {typeof Icon === "string" ? Icon : <Icon size={22} />}
                </span>

                <div>
                  <p className="text-xs font-bold text-gray-800">
                    {link.label}
                  </p>

                  <p className="text-xs text-blue-600 truncate max-w-[120px]">
                    {link.value}
                  </p>
                </div>
              </a>
            );
          })}
        </div>

        <div className="border-t border-gray-300" />
      </div>
    </div>
  );
}
