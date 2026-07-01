"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur">
      <nav className="flex items-center justify-between px-6 py-4">
        <Link href="/" aria-label="Everest — home">
          <Image
            src="/brand/everest-eyes.png"
            alt=""
            width={900}
            height={106}
            className="h-5 w-auto"
            priority
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
