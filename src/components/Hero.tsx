import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Github, MapPin, Calendar } from "lucide-react";
import { useRef } from "react";

const stats = [
  { 
    value: "Founder", 
    label: "RootBash Security", 
    sub: "Cybersecurity & Pentesting" 
  },
  { 
    value: "FinTech", 
    label: "PNC Bank Operations", 
    sub: "Data Privacy & Compliance" 
  },
  { 
    value: "Logistics", 
    label: "DoorDash Systems", 
    sub: "Real-time Problem Solving" 
  },
  { 
    value: "EdTech", 
    label: "CYLF English Academy", 
    sub: "Educational Strategy" 
  },
];

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const gridOpacity = useTransform(scrollYProgress, [0, 0.6], [0.04, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center section-padding pt-32 overflow-hidden">
      {/* Animated grid */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: gridOpacity }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
      </motion.div>

      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, hsl(var(--primary) / 0.06) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      <motion.div className="container relative" style={{ y: contentY }}>
        <div className="max-w-3xl">
          <motion.div
            className="mb-5 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.span
              className="block text-sm font-mono text-primary tracking-[0.3em] uppercase"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Luis Felipe Gutiérrez Camacho
            </motion.span>
          </motion.div>

          <motion.div
            className="mb-8 flex flex-wrap items-center gap-5"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <span className="status-dot h-2 w-2 rounded-full bg-primary" />
              <span className="text-sm font-mono text-muted-foreground">
                Available for engineering roles
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              <span className="font-mono">Barrancabermeja, Colombia</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-3.5 w-3.5" />
              <span className="font-mono">4+ yrs experience</span>
            </div>
          </motion.div>

          <h1 className="text-4xl md:text-5xl lg:text-[3.75rem] font-bold tracking-tight leading-[1.08] mb-7">
            {["Full", "Stack", "Engineer", "building"].map((word, i) => (
              <span key={word} className="inline-block overflow-hidden mr-[0.28em]">
                <motion.span
                  className="inline-block"
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 0.65,
                    delay: 0.75 + i * 0.09,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {word}
                </motion.span>
              </span>
            ))}{" "}
            <span className="overflow-hidden inline-block">
              <motion.span
                className="inline-block text-gradient"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.85,
                  delay: 1.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                scalable production systems.
              </motion.span>
            </span>
          </h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-5"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.5, ease: "easeOut" }}
          >
            Clean architecture. High-performance APIs. Observable infrastructure.
          </motion.p>

          <motion.p
            className="text-base text-subtle leading-relaxed max-w-xl mb-12"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.65, ease: "easeOut" }}
          >
            CEO at RootBash Security — Self-taught engineer since a young age,
            crafting secure, high-performance systems with a focus on clean architecture
            and scalability.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.85, ease: "easeOut" }}
          >
            <a
              href="#cases"
              className="group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 hover:translate-y-[-1px] hover:shadow-lg hover:shadow-primary/20"
            >
              View Case Studies
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://github.com/ProgramadorGod"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 border border-border text-foreground px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:border-primary/30 hover:translate-y-[-1px]"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 2.1, ease: "easeOut" }}
          className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-10"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.2 + i * 0.07 }}
              className="group"
            >
              <div className="text-2xl md:text-3xl font-bold text-foreground font-mono metric-value mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              <div className="text-xs font-mono text-primary/60 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {stat.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.6 }}
      >
        <span className="text-xs font-mono text-muted-foreground tracking-widest uppercase">scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [0, 1, 0], y: [0, 8, 16] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
