import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Kairos - AI Career Agent",
  description: "The right moment, applied. Your AI-powered career agent that finds, matches, and applies to opportunities for you.",
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} bg-shell`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
