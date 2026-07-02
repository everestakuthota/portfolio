"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import NavGlyph from "@/components/NavGlyph";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
];

export default function Nav() {
  const pathname = usePathname();

  // Home page uses the scroll-revealed glyph menu instead of a top bar,
  // so nothing overlaps the hero's initial view.
  if (pathname === "/") return <NavGlyph />;

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <nav className="flex items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Everest — home">
          <img
            src="/brand/everest-eyes-bw.svg"
            alt=""
            className="h-5 w-auto"
          />
        </Link>
        <ul className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? "text-neutral-100"
                    : "text-neutral-400 transition-colors hover:text-neutral-100"
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <span className="cursor-not-allowed rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-500">
              Shop — coming soon
            </span>
          </li>
        </ul>
      </nav>
    </header>
  );
}
