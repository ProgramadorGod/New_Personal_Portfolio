import { motion } from "framer-motion";
import { Shield, Gauge, Eye, Layers, Cog, Wrench } from "lucide-react";

const principles = [
  {
    icon: Gauge,
    number: "01",
    title: "Performance-first engineering",
    description:
      "Every architectural decision is measured against real-world benchmarks. Latency budgets, throughput targets, and resource efficiency are design constraints — not afterthoughts.",
    tag: "Sub-500ms SLA",
  },
  {
    icon: Eye,
    number: "02",
    title: "Observability by design",
    description:
      "Prometheus metrics, structured logging, and Grafana dashboards are integrated from commit one. You can't improve what you can't measure — and you can't debug what you can't see.",
    tag: "Prometheus · Grafana",
  },
  {
    icon: Shield,
    number: "03",
    title: "Security as foundation",
    description:
      "JWT, OAuth, RBAC, and input validation are architectural primitives, not features bolted on at the end. Security decisions shape every service boundary.",
    tag: "JWT · OAuth · RBAC",
  },
  {
    icon: Layers,
    number: "04",
    title: "Separation of concerns",
    description:
      "Clean boundaries between layers. Domain logic stays pure. Infrastructure adapts. Explicit contracts enforce discipline between services and prevent accidental coupling.",
    tag: "Clean Architecture",
  },
  {
    icon: Cog,
    number: "05",
    title: "Automation as optimization",
    description:
      "CI/CD pipelines, containerized deployments, and infrastructure as code eliminate manual overhead and reduce human error surface. 70% reduction in manual work, shipped.",
    tag: "Docker · CI/CD",
  },
  {
    icon: Wrench,
    number: "06",
    title: "Designed for maintainability",
    description:
      "Code is written for the engineer who reads it next. Explicit over clever. Documented trade-offs. Predictable patterns. Systems that are easy to reason about at 2 AM.",
    tag: "Long-term thinking",
  },
];

const Philosophy = () => {
  return (
    <section id="philosophy" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-20 max-w-2xl"
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wide uppercase">
            Engineering Philosophy
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Principles that shape every system.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Good engineering isn't about choosing the latest framework. It's about making
            deliberate decisions that compound into reliable, scalable systems over time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: "easeOut" }}
              className="surface-card-hover p-7 group flex flex-col"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="font-mono text-xs text-primary/40 tracking-wider">{p.number}</span>
                <div className="p-2 rounded-lg bg-primary/8 group-hover:bg-primary/12 transition-colors duration-300">
                  <p.icon
                    className="h-4 w-4 text-primary transition-transform duration-300 group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <h3 className="text-base font-semibold mb-3 text-foreground leading-snug">
                {p.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1 mb-5">
                {p.description}
              </p>

              <div className="mt-auto">
                <span className="code-tag">{p.tag}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
