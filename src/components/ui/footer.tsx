import { ADVISORY } from "@/lib/copy";

const links = [
  { title: "How it works", href: "/#how" },
  { title: "Airspace", href: "/#airspace" },
  { title: "Safety", href: "/#safety" },
  { title: "Privacy", href: "/privacy" },
  { title: "Terms", href: "/terms" },
];

export default function FooterSection() {
  return (
    <footer className="border-t border-border py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <a href="/" aria-label="Freq home" className="mx-auto flex w-fit items-center gap-2 text-sm font-medium text-white">
          <span className="h-1.5 w-1.5 rounded-full bg-[#e8ff1f]" aria-hidden />
          Freq
        </a>

        <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-relaxed text-muted-foreground">
          Hands-free AI radio for drone pilots. c0mpiled-16 · UCSD · Invisible Interfaces.
        </p>

        <nav className="my-8 flex flex-wrap justify-center gap-6 text-sm" aria-label="Footer">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="block text-muted-foreground duration-150 hover:text-primary">
              <span>{link.title}</span>
            </a>
          ))}
        </nav>

        <p className="mx-auto block max-w-md text-center text-xs leading-relaxed text-muted-foreground">{ADVISORY}</p>
      </div>
    </footer>
  );
}
