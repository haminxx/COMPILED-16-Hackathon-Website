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
  "inline-flex h-10 items-center justify-center border border-[#121417] bg-white px-4 text-sm font-medium text-[#121417] transition hover:bg-[#f4f6f8] disabled:opacity-60";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { openDemo } = useDemo();

  return (
    <motion.header
      className="sticky top-0 z-40 border-b border-[#c8ced8] bg-white shadow-[0_1px_0_rgba(18,20,23,0.04)]"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6">
        <a href="/" className="shrink-0" aria-label="Freq home">
          <FreqWordmark className="h-8 w-auto" />
        </a>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Sections">
          {LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#121417] transition-colors duration-200 hover:text-[#0040FF]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <SignInButton intent="nav" className={signUpClass} />
          <button
            type="button"
            onClick={openDemo}
            className="inline-flex h-10 items-center justify-center bg-[#0040FF] px-4 text-sm font-medium text-white transition hover:bg-[#0036d6]"
          >
            Demo
          </button>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-[#c8ced8] text-[#121417] md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            onClick={() => setIsOpen((value) => !value)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            className="border-t border-[#e6e8ee] bg-white px-4 py-3 md:hidden"
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
