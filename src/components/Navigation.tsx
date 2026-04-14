import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, Github } from "lucide-react";

const navItems = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Case Studies", href: "#cases" },
  { label: "Stack", href: "#stack" },
];

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 40);
  });

  // Bloquear scroll cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

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
      className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
      style={{
        borderBottom: scrolled || isOpen ? "1px solid hsl(var(--border))" : "1px solid transparent",
        backgroundColor: scrolled || isOpen ? "hsl(var(--background) / 0.88)" : "transparent",
        backdropFilter: scrolled || isOpen ? "blur(20px) saturate(180%)" : "none",
      }}
    >
      <div className="container flex h-14 items-center justify-between relative z-[110]">
        <Logo />

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink 
              key={item.href} 
              item={item} 
              isActive={activeSection === item.href.replace("#", "")} 
            />
          ))}
          <div className="w-px h-4 bg-border mx-2" />
          <GitHubLink />
          <ContactButton />
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-foreground transition-colors"
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 bg-background md:hidden z-[105] flex flex-col pt-24 px-6"
          >
            <div className="flex flex-col gap-6">
              <span className="text-[10px] font-mono text-primary tracking-[0.3em] uppercase opacity-60">
                Navigation
              </span>
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-bold tracking-tight text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto mb-12 flex flex-col gap-4">
              <div className="h-px w-full bg-border" />
              <div className="flex items-center justify-between">
                <GitHubLink />
                <ContactButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

// --- Sub-componentes para mantener el DRY (Don't Repeat Yourself) ---

const Logo = () => (
  <a href="#" className="font-mono text-sm font-medium text-foreground tracking-tight group">
    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">lfgc</span>
    <span className="text-primary">.</span>
    <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">dev</span>
  </a>
);

const NavLink = ({ item, isActive }: { item: any; isActive: boolean }) => (
  <a
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

const GitHubLink = () => (
  <a
    href="https://github.com/ProgramadorGod"
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground px-3 py-1.5 flex items-center gap-2"
  >
    <Github size={16} />
    <span className="md:hidden lg:inline">GitHub</span>
  </a>
);

const ContactButton = () => (
  <a
    href="https://wa.me/573132157378?text=Hola%20Luis,%20vi%20tu%20portfolio%20y%20me%20gustaría%20ponerme%20en%20contacto%20contigo."
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm font-medium bg-primary text-primary-foreground px-4 py-1.5 rounded-md hover:opacity-90 transition-opacity duration-200 text-center"
  >
    Contact
  </a>
);

export default Navigation;