import type { Metadata } from "next";
import Script from "next/script";
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
    // The Adobe Fonts loader mutates <html>'s class list (wf-loading /
    // wf-active) outside React, so attribute mismatches there are expected.
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-neutral-950 text-neutral-100">
        {/* Adobe Fonts kit (JS embed — the kit no longer publishes a CSS
            endpoint). Loads callifont-daynote-brush, pilot, and others. */}
        <Script
          id="adobe-fonts"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(d){var config={kitId:'hko2cbt',scriptTimeout:3000,async:true},h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\\bwf-loading\\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)})(document);`,
          }}
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
