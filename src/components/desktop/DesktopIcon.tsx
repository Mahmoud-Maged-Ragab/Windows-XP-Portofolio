"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppDefinition } from "@/types";
import { useWindowStore } from "@/store/windowStore";
import { useSystemStore } from "@/store/systemStore";
import ContextMenu, { useContextMenu } from "@/components/system/ContextMenu";
import XPDialog from "@/components/system/XPDialog";

interface DesktopIconProps {
  app: AppDefinition;
}

export default function DesktopIcon({ app }: DesktopIconProps) {
  const openWindow = useWindowStore((s) => s.openWindow);
  const iconSize = useSystemStore((s) => s.iconSize);
  const [selected, setSelected] = useState(false);
  const [lastClick, setLastClick] = useState(0);
  const [showProperties, setShowProperties] = useState(false);
  const { menu, openMenu, closeMenu, touchHandlers } = useContextMenu();
  const large = iconSize === "large";
  const iconPx = large ? 48 : 32;

  function handleClick() {
    const now = Date.now();
    if (now - lastClick < 400) {
      // Double-click
      openWindow(app.id);
      setSelected(false);
    } else {
      setSelected(true);
    }
    setLastClick(now);
  }

  return (
    <>
      <motion.button
        onClick={handleClick}
        onBlur={() => setSelected(false)}
        onContextMenu={openMenu}
        {...touchHandlers}
        className={`flex flex-col items-center gap-1 pt-1.5 pb-1 px-1 cursor-pointer focus:outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-dotted focus-visible:outline-white/90 ${
          large ? "w-[90px] h-[92px]" : "w-[75px] h-[74px]"
        } ${selected ? "" : "hover:bg-white/10"}`}
        aria-label={`Open ${app.title}`}
      >
        {/* Icon — 32px is the XP desktop default, 48px its large-icon setting */}
        <div className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={app.icon}
            width={iconPx}
            height={iconPx}
            style={{ width: iconPx, height: iconPx }}
            className="object-contain drop-shadow-[0_1px_1px_rgba(0,0,0,0.45)]"
            alt=""
          />
          {/* XP tints the icon itself blue when it is selected */}
          {selected && (
            <div className="absolute inset-0 bg-[#316AC5]/45" />
          )}
        </div>

        {/* Label — Tahoma 11px, two lines max, XP drop shadow / highlight */}
        <span
          className={`text-[11px] text-center leading-[1.15] select-none max-w-full px-0.5 line-clamp-2 break-words ${
            selected
              ? "bg-[#316AC5] text-white"
              : "text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]"
          }`}
        >
          {app.title}
        </span>
      </motion.button>

      <AnimatePresence>
        {menu && (
          <ContextMenu
            x={menu.x}
            y={menu.y}
            onClose={closeMenu}
            items={[
              { label: "Open", icon: app.icon, onClick: () => openWindow(app.id) },
              {
                label: "Rename",
                disabled: true,
                disabledHint: "Renaming isn't available in this demo",
              },
              { type: "separator" },
              {
                label: "Properties",
                icon: "/InfoIcon.svg",
                onClick: () => setShowProperties(true),
              },
            ]}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showProperties && (
          <XPDialog
            title={`${app.title} Properties`}
            icon={app.icon}
            onClose={() => setShowProperties(false)}
            widthClassName="max-w-xs"
            footer={
              <button
                onClick={() => setShowProperties(false)}
                className="xp-btn-primary text-xs px-4 py-1"
              >
                OK
              </button>
            }
          >
            <div className="flex items-center gap-3 mb-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={app.icon} className="w-10 h-10" alt="" />
              <p className="font-bold text-gray-800">{app.title}</p>
            </div>
            <dl className="text-xs text-gray-700 space-y-1">
              <div className="flex gap-2">
                <dt className="w-20 text-gray-500">Type:</dt>
                <dd>Portfolio Application</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 text-gray-500">App ID:</dt>
                <dd className="font-mono">{app.id}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-20 text-gray-500">Size:</dt>
                <dd>
                  {app.defaultSize.width} × {app.defaultSize.height}
                </dd>
              </div>
            </dl>
          </XPDialog>
        )}
      </AnimatePresence>
    </>
  );
}
