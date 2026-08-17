import { create } from "zustand";
import { persist } from "zustand/middleware";

export type PowerState =
  | "running"
  | "shutting-down"
  | "restarting"
  | "logging-off"
  | "off"
  | "login";

interface SystemStore {
  powerState: PowerState;
  shutdownDialogOpen: boolean;
  openShutdownDialog: () => void;
  closeShutdownDialog: () => void;
  runDialogOpen: boolean;
  openRunDialog: () => void;
  closeRunDialog: () => void;
  turnOff: () => void;
  restart: () => void;
  logOff: () => void;
  powerOn: () => void;
  login: () => void;

  wallpaper: "photo" | "classic";
  setWallpaper: (wallpaper: "photo" | "classic") => void;
  muted: boolean;
  setMuted: (muted: boolean) => void;
  textScale: "normal" | "large";
  setTextScale: (scale: "normal" | "large") => void;
  iconSize: "normal" | "large";
  setIconSize: (size: "normal" | "large") => void;
}

export const useSystemStore = create<SystemStore>()(
  persist(
    (set) => ({
      powerState: "running",
      shutdownDialogOpen: false,
      openShutdownDialog: () => set({ shutdownDialogOpen: true }),
      closeShutdownDialog: () => set({ shutdownDialogOpen: false }),
      runDialogOpen: false,
      openRunDialog: () => set({ runDialogOpen: true }),
      closeRunDialog: () => set({ runDialogOpen: false }),
      turnOff: () => set({ shutdownDialogOpen: false, powerState: "shutting-down" }),
      restart: () => set({ shutdownDialogOpen: false, powerState: "restarting" }),
      logOff: () => set({ shutdownDialogOpen: false, powerState: "logging-off" }),
      powerOn: () => set({ powerState: "restarting" }),
      login: () => set({ powerState: "running" }),

      wallpaper: "photo",
      setWallpaper: (wallpaper) => set({ wallpaper }),
      muted: false,
      setMuted: (muted) => set({ muted }),
      textScale: "normal",
      setTextScale: (textScale) => set({ textScale }),
      iconSize: "normal",
      setIconSize: (iconSize) => set({ iconSize }),
    }),
    {
      name: "xp-portfolio-preferences",
      partialize: (s) => ({
        wallpaper: s.wallpaper,
        muted: s.muted,
        textScale: s.textScale,
        iconSize: s.iconSize,
      }),
    }
  )
);
