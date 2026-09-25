import { IconSource } from "@/types";

/** Stroke weight shared by every Lucide icon rendered as an app/system icon. */
export const ICON_STROKE = 1.75;

interface AppIconProps {
  icon: IconSource;
  size: number;
  className?: string;
}

/**
 * Renders an icon from the registry: genuine XP artwork is a path under
 * /public, everything else is a lucide-react component that inherits
 * `currentColor` from its context.
 */
export default function AppIcon({ icon, size, className = "" }: AppIconProps) {
  if (typeof icon === "string") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={icon}
        width={size}
        height={size}
        style={{ width: size, height: size }}
        className={`object-contain shrink-0 ${className}`}
        alt=""
      />
    );
  }

  const Icon = icon;
  return (
    <Icon
      size={size}
      strokeWidth={ICON_STROKE}
      className={`shrink-0 ${className}`}
      aria-hidden="true"
    />
  );
}
