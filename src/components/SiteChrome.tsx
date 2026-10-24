import { Link } from "react-router-dom";
import { ADVISORY } from "@/lib/copy";
import { SignInButton } from "@/components/SignInButton";

const NAV = [
  { href: "/#how", label: "How it works" },
  { href: "/#airspace", label: "Airspace" },
  { href: "/#safety", label: "Safety" },
];

export function Wordmark({ href = "/" }: { href?: string }) {
  return (
    <a href={href} className="inline-flex items-center gap-2 text-[15px] font-medium tracking-tight text-white">
      <span className="h-1.5 w-1.5 rounded-full bg-[#e8ff1f]" aria-hidden />
      Freq
    </a>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-[#070708]/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-5">
        <Wordmark />
        <nav className="hidden items-center gap-5 sm:flex" aria-label="Sections">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="text-sm text-white/60 transition hover:text-white">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto">
          <SignInButton intent="nav" />
        </div>
      </div>
      <nav className="flex gap-4 border-t border-white/10 px-5 py-2.5 sm:hidden" aria-label="Sections">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} className="text-xs text-white/60">
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Wordmark />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/50">
            Hands-free AI radio for drone pilots. c0mpiled-16 · UCSD · Invisible Interfaces.
          </p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-white/40">{ADVISORY}</p>
        </div>
        <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-white/55" aria-label="Footer">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-white">
              {item.label}
            </a>
          ))}
          <Link to="/privacy" className="hover:text-white">
            Privacy
          </Link>
          <Link to="/terms" className="hover:text-white">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
