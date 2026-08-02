import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Portfolio Mahmoud Ragab",
  description:
    "Personal portfolio of Mahmoud Maged Mahmoud Ragab, a Frontend Developer specializing in React, Next.js, and TypeScript. Presented as an interactive Windows XP desktop experience.",
  keywords: [
    "frontend developer",
    "react",
    "nextjs",
    "typescript",
    "portfolio",
    "web developer",
  ],
  authors: [{ name: "Mahmoud Maged" }],
  openGraph: {
    title: "Mahmoud Maged — Frontend Developer Portfolio",
    description:
      "An interactive Windows XP-themed portfolio showcasing my projects, skills, and experience as a Frontend Developer.",
    type: "website",
    locale: "en_US",
    url: "https://mahmoud-maged-portofolio.vercel.app",
    siteName: "Mahmoud Maged's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Maged — Frontend Developer",
    description: "Interactive Windows XP-themed developer portfolio",
    creator: "@yourhandle",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
