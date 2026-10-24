"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { SignInButton } from "@/components/SignInButton";

const LINKS = [
  { label: "How it works", href: "/#how" },
  { label: "Airspace", href: "/#airspace" },
  { label: "Safety", href: "/#safety" },
];

const signInClass =
  "inline-flex h-9 items-center justify-center rounded-full bg-white px-4 text-sm font-medium text-black transition hover:bg-white/90 disabled:opacity-60";

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <div className="sticky top-0 z-40 flex w-full justify-center px-4 py-4">
      <div className="relative z-10 flex w-full max-w-3xl items-center justify-between rounded-full border border-white/10 bg-black/60 px-5 py-3 shadow-lg backdrop-blur-md">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-medium tracking-tight text-white">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#e8ff1f]"
            aria-hidden
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          />
          Freq
        </a>

        <nav className="hidden items-center space-x-8 md:flex" aria-label="Sections">
          {LINKS.map((item) => (
            <motion.div
              key={item.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.05 }}
            >
              <a href={item.href} className="text-sm font-medium text-white/80 transition-colors hover:text-white">
                {item.label}
              </a>
            </motion.div>
          ))}
        </nav>

        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <SignInButton intent="nav" className={signInClass} />
        </motion.div>

        <motion.button
          type="button"
          className="flex items-center md:hidden"
          onClick={toggleMenu}
          whileTap={{ scale: 0.9 }}
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6 text-white" />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 px-6 pt-24 md:hidden"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <motion.button
              type="button"
              className="absolute top-6 right-6 p-2"
              onClick={toggleMenu}
              whileTap={{ scale: 0.9 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              aria-label="Close menu"
            >
              <X className="h-6 w-6 text-white" />
            </motion.button>
            <div className="flex flex-col space-y-6">
              {LINKS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <a href={item.href} className="text-base font-medium text-white" onClick={toggleMenu}>
                    {item.label}
                  </a>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                exit={{ opacity: 0, y: 20 }}
                className="pt-6"
                onClick={toggleMenu}
              >
                <SignInButton intent="nav" className={`${signInClass} w-full`} />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { Navbar1 };
