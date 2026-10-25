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

const signUpClass =
  "inline-flex h-10 items-center justify-center rounded-md border border-[#d5d9e2] bg-white px-3.5 text-sm font-medium text-[#121417] transition hover:border-[#0040FF] hover:text-[#0040FF] disabled:opacity-60";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openDemo } = useDemo();

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-[#e7e9ef] bg-white/90 backdrop-blur-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 flex-1 items-center rounded-full border border-[#e4e7ee] bg-white shadow-[0_1px_2px_rgba(18,20,23,0.05)]">
          <a href="/" className="flex items-center px-3 py-2 text-[#0040FF] sm:px-4" aria-label="Freq home">
            <FreqWordmark className="h-6 w-auto sm:h-7" />
          </a>
          <nav className="hidden items-center gap-1 pr-2 md:flex" aria-label="Sections">
            {LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-[#121417] transition hover:text-[#0040FF]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="mr-2 ml-auto inline-flex h-9 w-9 items-center justify-center rounded-full text-[#121417] md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <SignInButton intent="nav" className={signUpClass} />
          <button
            type="button"
            onClick={openDemo}
            className="inline-flex h-10 items-center justify-center rounded-md bg-[#0040FF] px-3.5 text-sm font-medium text-white transition hover:bg-[#0036d6]"
          >
            Demo
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            className="border-t border-[#e7e9ef] bg-white px-4 py-3 md:hidden"
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
                className="block py-2 text-sm font-medium text-[#121417] hover:text-[#0040FF]"
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
