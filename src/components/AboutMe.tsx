import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { prepare, layout } from "@chenglou/pretext";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";
import profilePic from '../assets/LuisProfilePic2.png'; // Importación estática
/* ─── tipos ─── */





import { useCallback } from "react";
import { useSpring, useTransform } from "motion/react";

/* ─── Una letra con física de resorte ─── */
function MagneticLetter({
  char,
  index,
  onMouseMove,
}: {
  char: string;
  index: number;
  onMouseMove: (index: number, x: number, y: number) => void;
}) {
  const x = useSpring(0, { stiffness: 200, damping: 15, mass: 0.5 });
  const y = useSpring(0, { stiffness: 200, damping: 15, mass: 0.5 });
  const scale = useSpring(1, { stiffness: 300, damping: 20 });
  const color = useSpring(0, { stiffness: 150, damping: 20 });

  const colorValue = useTransform(color, [0, 1], ["hsl(var(--muted-foreground))", "hsl(var(--primary))"]);

  const ref = useRef<HTMLSpanElement>(null);

  const handleParentMove = useCallback(
    (mouseX: number, mouseY: number) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 80;

      if (dist < radius) {
        const force = (1 - dist / radius) * 18;
        const angle = Math.atan2(dy, dx);
        x.set(-Math.cos(angle) * force);
        y.set(-Math.sin(angle) * force);
        scale.set(1 + (1 - dist / radius) * 0.4);
        color.set(1 - dist / radius);
      } else {
        x.set(0);
        y.set(0);
        scale.set(1);
        color.set(0);
      }
    },
    [x, y, scale, color]
  );

  // Exponer handler al padre
  useCallback(() => {
    onMouseMove(index, 0, 0);
  }, []);

  if (char === " ") return <span>&nbsp;</span>;

  return (
    <motion.span
      ref={ref}
      style={{ x, y, scale, color: colorValue, display: "inline-block", cursor: "default" }}
      data-index={index}
    >
      {char}
    </motion.span>
  );
}

/* ─── Párrafo con física por letra ─── */
export function PhysicsText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLParagraphElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    if (!containerRef.current) return;

    containerRef.current.querySelectorAll<HTMLElement>("[data-letter]").forEach((el) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = mouseX - cx;
      const dy = mouseY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const radius = 80;

      if (dist < radius) {
        const force = (1 - dist / radius) * 20;
        const angle = Math.atan2(dy, dx);
        (el as any)._xSpring?.set(-Math.cos(angle) * force);
        (el as any)._ySpring?.set(-Math.sin(angle) * force);
        (el as any)._scaleSpring?.set(1 + (1 - dist / radius) * 0.5);
        (el as any)._colorSpring?.set(1 - dist / radius);
      } else {
        (el as any)._xSpring?.set(0);
        (el as any)._ySpring?.set(0);
        (el as any)._scaleSpring?.set(1);
        (el as any)._colorSpring?.set(0);
      }
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!containerRef.current) return;
    containerRef.current.querySelectorAll<HTMLElement>("[data-letter]").forEach((el) => {
      (el as any)._xSpring?.set(0);
      (el as any)._ySpring?.set(0);
      (el as any)._scaleSpring?.set(1);
      (el as any)._colorSpring?.set(0);
    });
  }, []);

  // Separar en palabras preservando espacios
  const words = text.split(" ");

  return (
    <p
      ref={containerRef}
      className={`text-sm leading-relaxed ${className}`}
      style={{ wordBreak: "normal", overflowWrap: "normal" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {words.map((word, wi) => (
        // inline-block en la palabra = nunca se corta a mitad
        <span key={wi} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
          {word.split("").map((char, ci) => (
            <LetterSpan key={ci} char={char} />
          ))}
          {/* espacio entre palabras fuera del span para que el wrap ocurra aquí */}
          {wi < words.length - 1 && (
            <span style={{ display: "inline-block", width: "0.3em" }} />
          )}
        </span>
      ))}
    </p>
  );
}

/* ─── Letra individual con springs internos ─── */
function LetterSpan({ char }: { char: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 14, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 14, mass: 0.4 });
  const scale = useSpring(1, { stiffness: 300, damping: 18 });
  const colorProgress = useSpring(0, { stiffness: 160, damping: 18 });
  const color = useTransform(colorProgress, [0, 1], ["hsl(var(--muted-foreground))", "hsl(var(--primary))"]);

  // Adjuntar springs al DOM node para acceso desde el padre
  const attachSprings = useCallback((node: HTMLSpanElement | null) => {
    (ref as any).current = node;
    if (node) {
      (node as any)._xSpring = x;
      (node as any)._ySpring = y;
      (node as any)._scaleSpring = scale;
      (node as any)._colorSpring = colorProgress;
    }
  }, [x, y, scale, colorProgress]);

  if (char === " ") return <span style={{ display: "inline-block", width: "0.3em" }}> </span>;

  return (
    <motion.span
      ref={attachSprings}
      data-letter="true"
      style={{
        x,
        y,
        scale,
        color,
        display: "inline-block",
        cursor: "default",
        willChange: "transform",
      }}
    >
      {char}
    </motion.span>
  );
}






















interface WordToken {
  word: string;
  x: number;
  y: number;
  width: number;
}







/* ─── hook: convierte texto en tokens con coordenadas exactas via Pretext ─── */
function useTextTokens(
  text: string,
  font: string,
  containerWidth: number,
  lineHeight: number
): WordToken[] {
  const [tokens, setTokens] = useState<WordToken[]>([]);

  useEffect(() => {
    if (containerWidth <= 0) return;

    const prepared = prepareWithSegments(text, font);
    const { lines } = layoutWithLines(prepared, containerWidth, lineHeight);

    const result: WordToken[] = [];

    lines.forEach((line, lineIndex) => {
      const y = lineIndex * lineHeight;
      const words = line.text.trim().split(" ");
      let x = 0;

      words.forEach((word) => {
        if (!word) return;
        // mide el ancho de esta palabra individualmente
        const wordPrepared = prepareWithSegments(word + " ", font);
        const { lines: wLines } = layoutWithLines(wordPrepared, 9999, lineHeight);
        const wordWidth = wLines[0]?.width ?? 0;

        result.push({ word, x, y, width: wordWidth });
        x += wordWidth;
      });
    });

    setTokens(result);
  }, [text, font, containerWidth, lineHeight]);

  return tokens;
}

/* ─── componente de párrafo animado ─── */
function AnimatedParagraph({
  text,
  delay = 0,
  className = "",
}: {
  text: string;
  delay?: number;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-60px" });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const LINE_HEIGHT = 24;
  const FONT = "14px Inter, sans-serif";
  const tokens = useTextTokens(text, FONT, width, LINE_HEIGHT);

  // Altura total del bloque
  const totalHeight =
    tokens.length > 0
      ? Math.max(...tokens.map((t) => t.y)) + LINE_HEIGHT
      : LINE_HEIGHT * 3;

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ height: width > 0 ? totalHeight : "auto", minHeight: 48 }}
    >
      {width === 0 && (
        <p className="text-sm text-muted-foreground leading-relaxed opacity-0">
          {text}
        </p>
      )}
      {tokens.map((token, i) => {
        // origen aleatorio alrededor del token
        const angle = (i * 137.5) % 360;
        const dist = 60 + (i % 3) * 40;
        const ox = Math.cos((angle * Math.PI) / 180) * dist;
        const oy = Math.sin((angle * Math.PI) / 180) * dist;

        return (
          <motion.span
            key={i}
            className="absolute text-sm text-muted-foreground"
            style={{
              left: token.x,
              top: token.y,
              lineHeight: `${LINE_HEIGHT}px`,
              whiteSpace: "nowrap",
            }}
            initial={{ opacity: 0, x: ox, y: oy, filter: "blur(4px)" }}
            animate={
              inView
                ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                : { opacity: 0, x: ox, y: oy, filter: "blur(4px)" }
            }
            transition={{
              duration: 0.55,
              delay: delay + i * 0.018,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {token.word}{" "}
          </motion.span>
        );
      })}
    </div>
  );
}

/* ─── datos ─── */
const interests = [
  "History & geopolitics",
  "Physics & chemistry",
  "Mathematics",
  "Brazilian Jiu-Jitsu",
  "Strength training",
  "Anime",
  "Minecraft & modding",
  "Language learning",
];

const goals = [
  {
    index: "01",
    text: "Become a genuinely great software engineer — not just competent, but the kind of developer people trust to architect real systems.",
  },
  {
    index: "02",
    text: "Build and own a company. Not for vanity — to create something that lasts and gives me the freedom to live fully.",
  },
  {
    index: "03",
    text: "Protect the people I love by building a life full of experiences, stability, and real financial freedom.",
  },
];

const stats = [
  { value: "21", label: "years old" },
  { value: "BJJ", label: "practitioner" },
  { value: "EN", label: "self-taught" },
  { value: "∞", label: "curiosity" },
];

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

/* ─── componente principal ─── */
const AboutMe = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSrc, setImageSrc] = useState<string>(profilePic);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
    }
  };
  return (
    <section id="about" className="section-padding">
      <div className="container">

        {/* Hero row */}
        <div className="grid md:grid-cols-2 gap-16 items-center mb-20">

          {/* Photo */}
          <motion.div {...fadeUp} className="relative">
            {/* Decoración técnica de esquina (estilo HUD/Cybersecurity) */}
            <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary/40" />
            <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary/40" />

            <div
              className="relative w-full max-w-sm mx-auto cursor-pointer group p-2 bg-background border border-border/50 hover:border-primary/50 transition-all duration-500 ease-out"
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {/* Contenedor de la imagen con overlay técnico */}
              <div className="relative w-full aspect-[4/5] rounded-none border border-border bg-secondary/30 overflow-hidden">

                {/* Overlay de escaneo (solo visible en hover) */}
                <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent h-1/2 w-full animate-scan" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_20%,black_70%)] opacity-40" />
                </div>

                <img
                  src={imageSrc}
                  alt="Luis Profile"
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out"
                />

                {/* Badge de estado (Esquina inferior) */}
                <div className="absolute bottom-2 right-2 z-20 bg-background/80 backdrop-blur-md px-2 py-1 border border-border flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-mono uppercase tracking-tighter text-primary">System.Active</span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-3 px-1">
                <p className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                  RootBash_Identity_01
                </p>
                <p className="text-[10px] text-primary/60 font-mono">
                  4:5_RATIO
                </p>
              </div>
            </div>
          </motion.div>

          {/* Intro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex flex-col gap-5"
          >
            <p className="text-xs font-mono text-primary/60 uppercase tracking-widest">About me</p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              Hi, I'm a<br />
              <span className="text-primary">builder.</span>
            </h2>
            <p className="text-sm font-mono text-muted-foreground">21 years old · Software developer · Colombia</p>
            <p className="text-muted-foreground text-base leading-relaxed border-l border-border pl-4 italic">
              "Always curious, always building — from my first Minecraft mod to my first startup."
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Full-Stack Dev", "BJJ practitioner", "Anime fan", "History nerd", "Physics & Math", "Lifelong learner"].map((tag) => (
                <span key={tag} className="px-2.5 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded-md border border-border/50 hover:border-primary/30 hover:text-foreground transition-colors duration-150">
                  {tag}
                </span>
              ))}
            </div>
            <div className="grid grid-cols-4 gap-4 pt-4 border-t border-border">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-xl font-bold font-mono text-foreground">{s.value}</div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Body */}
        <div className="grid lg:grid-cols-2 gap-12">

          {/* Left col */}
          <motion.div {...fadeUp} className="space-y-10">

            {/* Story — párrafos animados con Pretext */}
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-4">My story</p>
              <div className="space-y-6">
                <PhysicsText text="I've always been the kind of kid who wanted to understand how everything works. History, physics, chemistry, math — I wasn't just interested, I was obsessed. That same curiosity led me to learn English on my own, mostly because I wanted to read Minecraft mod documentation in Java and understand what the YouTubers were actually saying." />
              </div>
            </div>

            {/* Interests */}
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-4">Interests</p>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                {interests.map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
                    <PhysicsText text={item}></PhysicsText>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right col */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.12 }}
            className="space-y-10"
          >

            {/* Life */}
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-4">Life outside the screen</p>
              <div className="space-y-6">
                <PhysicsText

                  text="I live with my mom, my stepdad, and my two-year-old baby sister — who is basically the most chaotic and wonderful person I know. I also have a close relationship with my dad. Family is something I genuinely value, not just take for granted."
                />

                <PhysicsText

                  text="I have a partner who keeps me grounded, and a small but meaningful circle of people I'd do anything for. That's actually one of the biggest reasons I work as hard as I do."
                />
              </div>
            </div>

            {/* Goals */}
            <div>
              <p className="text-xs font-mono text-primary uppercase tracking-wider mb-5">Where I'm headed</p>
              <div className="space-y-6">
                {goals.map((g) => (
                  <div key={g.index} className="flex gap-4">
                    <div className="flex-shrink-0 mt-0.5">
                      <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <span className="font-mono text-[9px] text-primary">{g.index}</span>
                      </div>
                    </div>
                    <PhysicsText text={g.text} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;