"use client";

import { useSystemStore } from "@/store/systemStore";

export default function Wallpaper() {
  const wallpaper = useSystemStore((s) => s.wallpaper);

  if (wallpaper === "classic") {
    return <div className="absolute inset-0 xp-wallpaper" aria-hidden="true" />;
  }

  return (
    <div
      className="absolute inset-0 bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: "url('/HomeImg.jpg')",
        imageRendering: "auto",
      }}
      aria-hidden="true"
    />
  );
}
