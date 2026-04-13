import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";

const navItems = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Case Studies", href: "#cases" },
  { label: "Stack", href: "#stack" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  useEffect(() => {
    const sections = ["philosophy", "cases", "stack"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        borderBottom: scrolled ? "1px solid hsl(var(--border))" : "1px solid transparent",
        backgroundColor: scrolled ? "hsl(var(--background) / 0.88)" : "transparent",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <div className="container flex h-14 items-center justify-between">
        <a
          href="#"
          className="font-mono text-sm font-medium text-foreground tracking-tight group"
        >
          <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
            lfgc
          </span>
          <span className="text-primary">.</span>
          <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
            dev
          </span>
        </a>
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const sectionId = item.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={item.href}
                href={item.href}
                className="relative px-4 py-1.5 text-sm transition-colors duration-200 rounded-md"
                style={{
                  color: isActive ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground))",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-md bg-accent"
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
          <div className="w-px h-4 bg-border mx-2" />
          <a
            href="https://github.com/ProgramadorGod"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground px-3 py-1.5"
          >
            GitHub
          </a>
          <a
            href="mailto:luis.dev0519@gmail.com"
            className="ml-1 text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity duration-200"
          >
            Contact
          </a>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
