import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="px-6 md:px-8 py-16 border-b border-border">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          >
            <div>
              <p className="text-sm font-mono text-primary mb-2 tracking-wide uppercase">
                Open to opportunities
              </p>
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                Let's build something great.
              </h3>
              <p className="text-muted-foreground max-w-md">
                Looking for a full-stack engineer who thinks in systems and ships production-grade software? Let's talk.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:luis.dev0519@gmail.com"
                className="group inline-flex items-center gap-2.5 bg-primary text-primary-foreground px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90 hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" />
                Get in touch
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="https://www.linkedin.com/in/luisfullstack/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-border text-foreground px-6 py-3 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-accent hover:border-primary/30 hover:-translate-y-0.5"
              >
                <Linkedin className="h-4 w-4" />
                LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="px-6 md:px-8 py-8">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-sm font-medium">
              <span className="text-muted-foreground">lfgc</span>
              <span className="text-primary">.</span>
              <span className="text-muted-foreground">dev</span>
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              Luis Felipe Gutiérrez Camacho
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://github.com/ProgramadorGod"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/luisfullstack/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href="mailto:luis.dev0519@gmail.com"
              className="text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
            <span className="text-xs font-mono text-muted-foreground">
              © {year}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
