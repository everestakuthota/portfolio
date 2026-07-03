import type { Metadata } from "next";
import Nav from "@/components/Nav";
import "./globals.css";

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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        {/* BD Caramel Variable via Adobe Fonts (site-wide typeface) */}
        <link
          rel="stylesheet"
          href="https://use.typekit.net/hko2cbt.css"
          precedence="default"
        />
        <Nav />
        <main className="flex-1">{children}</main>
        <footer className="flex items-center justify-between border-t border-white/10 px-6 py-8 text-sm text-neutral-400">
          <div className="flex items-center gap-3">
            <img
              src="/brand/everest-eyes-bw-v2.svg"
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
