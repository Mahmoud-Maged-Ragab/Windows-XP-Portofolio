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
    "Personal portfolio of Mahmoud Maged Ragab, a Software Engineer working across full-stack development and business technology with React.js, Next.js, Node.js, and Laravel. Presented as an interactive Windows XP desktop experience.",
  keywords: [
    "software engineer",
    "full-stack developer",
    "react",
    "nextjs",
    "laravel",
    "business information systems",
    "portfolio",
  ],
  authors: [{ name: "Mahmoud Maged" }],
  openGraph: {
    title: "Mahmoud Maged — Software Engineer Portfolio",
    description:
      "An interactive Windows XP-themed portfolio showcasing my projects, skills, and experience as a Software Engineer.",
    type: "website",
    locale: "en_US",
    url: "https://mahmoud-maged-portofolio.vercel.app",
    siteName: "Mahmoud Maged's Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mahmoud Maged — Software Engineer",
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
