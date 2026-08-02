'use client';

import { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowState } from '@/types';
import { useWindowStore } from '@/store/windowStore';
import { APP_REGISTRY } from '@/data/apps';
import TitleBar from './TitleBar';

interface WindowProps {
  window: WindowState;
  children: React.ReactNode;
}

export default function Window({ window: win, children }: WindowProps) {
  const { closeWindow, minimizeWindow, maximizeToggle, focusWindow, moveWindow } =
    useWindowStore();
  const viewport = useWindowStore((s) => s.viewport);
  const appDef = APP_REGISTRY.find((a) => a.id === win.appId);

  const maxWidth = viewport.width * 0.95;
  const maxHeight = viewport.height * 0.85;
  const width = Math.min(win.size.width, maxWidth);
  const height = Math.min(win.size.height, maxHeight);
  const left = Math.min(Math.max(0, win.position.x), Math.max(0, viewport.width - width));
  const top = Math.min(Math.max(0, win.position.y), Math.max(0, viewport.height - 40 - height));

  const style = win.isMaximized
    ? {
        left: 0,
        top: 0,
        width: '100vw',
        height: 'calc(100vh - 40px)',
        zIndex: win.zIndex,
      }
    : {
        left,
        top,
        width,
        height,
        maxWidth: '95vw',
        maxHeight: '85vh',
        zIndex: win.zIndex,
      };

  return (
    <AnimatePresence>
      {!win.isMinimized && (
        <motion.div
          key={win.id}
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0, y: 20 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className="xp-window absolute flex flex-col overflow-hidden"
          style={style}
          onMouseDown={() => focusWindow(win.id)}
        >
          <TitleBar
            title={win.title}
            icon={appDef?.icon}
            position={win.position}
            isMaximized={win.isMaximized}
            onMove={(pos) => moveWindow(win.id, pos)}
            onMinimize={() => minimizeWindow(win.id)}
            onMaximize={() => maximizeToggle(win.id)}
            onClose={() => closeWindow(win.id)}
            onFocus={() => focusWindow(win.id)}
          />
          <div className="flex-1 overflow-hidden bg-white">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
