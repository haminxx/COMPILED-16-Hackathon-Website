import { FreqWordmark } from "@/components/FreqWordmark";
import { ADVISORY } from "@/lib/copy";

const REPO = "https://github.com/haminxx/COMPILED-16-Hackathon";

const columns = [
  {
    title: "Product",
    links: [
      { title: "How it works", href: "/#how" },
      { title: "Airspace", href: "/#airspace" },
      { title: "Safety", href: "/#safety" },
    ],
  },
  {
    title: "Legal",
    links: [
      { title: "Privacy", href: "/privacy" },
      { title: "Terms", href: "/terms" },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-[#E7E9EE] bg-white">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <a href="/" aria-label="Freq home" className="inline-flex">
            <FreqWordmark className="h-7 w-auto" />
          </a>
          <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-[#6B7280]">
            Hands-free AI radio for drone pilots. c0mpiled-16 · UCSD · Invisible Interfaces.
          </p>
          <a
            href={REPO}
            target="_blank"
            rel="noreferrer"
            aria-label="Freq on GitHub"
            className="mt-5 inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#E7E9EE] text-[#0A0B10] transition-colors hover:bg-[#F7F8FA]"
          >
            <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
          </a>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <p className="text-[12px] tracking-[0.14em] text-[#6B7280] uppercase">{column.title}</p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-[#0A0B10] transition-colors hover:text-[#0040FF]">
                    {link.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-[#E7E9EE]">
        <p className="mx-auto max-w-[1240px] px-5 py-5 text-[12px] leading-relaxed text-[#6B7280] sm:px-8">{ADVISORY}</p>
      </div>
    </footer>
  );
}
