"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { FreqWordmark } from "@/components/FreqWordmark";
import { SignInButton } from "@/components/SignInButton";
import { useDemo } from "@/lib/demo";

const LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "Airspace", href: "/#airspace" },
  { label: "Safety", href: "/#safety" },
];

const REPO = "https://github.com/haminxx/COMPILED-16-Hackathon";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 16 16" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openDemo } = useDemo();

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-[#E7E9EE] bg-white/85 backdrop-blur"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative mx-auto flex h-14 max-w-[1240px] items-center justify-between px-4 sm:px-8">
        <a href="/" className="relative z-10 flex items-center" aria-label="Freq home">
          <FreqWordmark className="h-7 w-auto" />
        </a>
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 md:flex" aria-label="Sections">
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm text-[#6B7280] transition-colors duration-200 hover:text-[#0A0B10]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="relative z-10 flex items-center">
          <div className="flex items-stretch">
            <a
              href={REPO}
              target="_blank"
              rel="noreferrer"
              aria-label="Freq on GitHub"
              className="inline-flex h-9 w-10 items-center justify-center rounded-l-[10px] border border-[#E7E9EE] bg-white text-[#0A0B10] transition-colors hover:bg-[#F7F8FA]"
            >
              <GitHubIcon />
            </a>
            <SignInButton
              intent="nav"
              wrapClassName="flex"
              className="inline-flex h-9 items-center border-y border-r border-[#E7E9EE] bg-white px-3.5 text-[13.5px] font-medium text-[#0A0B10] transition-colors hover:bg-[#F7F8FA] disabled:opacity-60 sm:px-4"
            />
            <button
              type="button"
              onClick={openDemo}
              className="inline-flex h-9 items-center rounded-r-[10px] bg-[#0040FF] px-3.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#0033CC] sm:px-4"
            >
              Demo
            </button>
          </div>
          <button
            type="button"
            className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E7E9EE] bg-white md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            className="border-t border-[#E7E9EE] bg-white md:hidden"
            aria-label="Sections"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            {LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="block border-b border-[#E7E9EE] px-4 py-3 text-sm text-[#0A0B10] last:border-b-0"
              >
                {item.label}
              </a>
            ))}
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
};

export { Navbar1 };
