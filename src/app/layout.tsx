import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Everest — Artwork",
  description:
    "Everest Akuthota — linocut prints, cover art, and poster design. Prints and originals available soon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="flex items-center justify-between border-t border-white/10 px-6 py-8 text-sm text-neutral-400">
          <div className="flex items-center gap-3">
            <img
              src="/brand/everest-eyes-bw.svg"
              alt=""
              className="h-3 w-auto opacity-80"
            />
            <span>
              Everest &copy; {new Date().getFullYear()}
            </span>
          </div>
          <span>Prints &amp; originals available soon</span>
        </footer>
      </body>
    </html>
  );
}
