import { create } from 'zustand';
import { WindowState, AppId, AppDefinition } from '@/types';
import { APP_REGISTRY } from '@/data/apps';

interface WindowStore {
  windows: WindowState[];
  topZIndex: number;
  openWindow: (appId: AppId) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  maximizeToggle: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, position: { x: number; y: number }) => void;
  resizeWindow: (id: string, size: { width: number; height: number }) => void;
}

let windowCounter = 0;

function getDefaultPosition(index: number): { x: number; y: number } {
  const cascade = index * 30;
  return {
    x: Math.min(80 + cascade, window.innerWidth - 400),
    y: Math.min(60 + cascade, window.innerHeight - 300),
  };
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  topZIndex: 100,

  openWindow: (appId: AppId) => {
    const { windows, topZIndex } = get();
    const appDef = APP_REGISTRY.find((a) => a.id === appId) as AppDefinition;

    // If already open, focus it instead
    const existing = windows.find((w) => w.appId === appId);
    if (existing) {
      if (existing.isMinimized) {
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === existing.id
              ? { ...w, isMinimized: false, zIndex: s.topZIndex + 1 }
              : w
          ),
          topZIndex: s.topZIndex + 1,
        }));
      } else {
        get().focusWindow(existing.id);
      }
      return;
    }

    const newZ = topZIndex + 1;
    const id = `${appId}-${++windowCounter}`;
    const openCount = windows.filter((w) => !w.isMinimized).length;

    const newWindow: WindowState = {
      id,
      appId,
      title: appDef.title,
      isMinimized: false,
      isMaximized: false,
      zIndex: newZ,
      position: typeof window !== 'undefined'
        ? getDefaultPosition(openCount)
        : { x: 80, y: 60 },
      size: appDef.defaultSize,
    };

    set((s) => ({
      windows: [...s.windows, newWindow],
      topZIndex: newZ,
    }));
  },

  closeWindow: (id: string) => {
    set((s) => ({ windows: s.windows.filter((w) => w.id !== id) }));
  },

  minimizeWindow: (id: string) => {
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: true } : w
      ),
    }));
  },

  restoreWindow: (id: string) => {
    const { topZIndex } = get();
    const newZ = topZIndex + 1;
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: false, zIndex: newZ } : w
      ),
      topZIndex: newZ,
    }));
  },

  maximizeToggle: (id: string) => {
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, isMaximized: !w.isMaximized } : w
      ),
    }));
  },

  focusWindow: (id: string) => {
    const { topZIndex } = get();
    const newZ = topZIndex + 1;
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, zIndex: newZ, isMinimized: false } : w
      ),
      topZIndex: newZ,
    }));
  },

  moveWindow: (id: string, position: { x: number; y: number }) => {
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, position } : w
      ),
    }));
  },

  resizeWindow: (id: string, size: { width: number; height: number }) => {
    set((s) => ({
      windows: s.windows.map((w) =>
        w.id === id ? { ...w, size } : w
      ),
    }));
  },
}));
