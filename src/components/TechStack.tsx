import { motion } from "framer-motion";

const categories = [
  {
    title: "Frontend Architecture",
    icon: "◈",
    items: [
      { name: "TypeScript", level: 5 },
      { name: "React", level: 5 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Component Systems", level: 4 },
      { name: "State Management", level: 4 },
      { name: "Performance Optimization", level: 4 },
    ],
  },
  {
    title: "Backend Systems",
    icon: "◉",
    items: [
      { name: "Python", level: 5 },
      { name: "Django REST Framework", level: 5 },
      { name: "RESTful API Design", level: 5 },
      { name: "PostgreSQL", level: 4 },
      { name: "Data Modeling", level: 4 },
      { name: "API Contracts", level: 4 },
    ],
  },
  {
    title: "Search & Data",
    icon: "◎",
    items: [
      { name: "Elasticsearch", level: 4 },
      { name: "Full-text Search", level: 4 },
      { name: "Custom Analyzers", level: 4 },
      { name: "Indexing Strategies", level: 3 },
      { name: "Query Optimization", level: 4 },
    ],
  },
  {
    title: "Infrastructure & DevOps",
    icon: "◆",
    items: [
      { name: "Docker", level: 5 },
      { name: "CI/CD Pipelines", level: 4 },
      { name: "AWS S3", level: 4 },
      { name: "Infrastructure as Code", level: 3 },
      { name: "Containerization", level: 5 },
      { name: "Deployment Automation", level: 4 },
    ],
  },
  {
    title: "Security & Auth",
    icon: "◐",
    items: [
      { name: "JWT", level: 5 },
      { name: "OAuth 2.0", level: 4 },
      { name: "RBAC", level: 5 },
      { name: "Input Validation", level: 5 },
      { name: "Secure API Design", level: 4 },
      { name: "Access Control Patterns", level: 4 },
    ],
  },
  {
    title: "Observability & Monitoring",
    icon: "◑",
    items: [
      { name: "Prometheus", level: 4 },
      { name: "Grafana", level: 4 },
      { name: "Structured Logging", level: 4 },
      { name: "Alerting", level: 3 },
      { name: "Performance Metrics", level: 4 },
      { name: "SLA Monitoring", level: 4 },
    ],
  },
];

const TechStack = () => {
  return (
    <section id="stack" className="section-padding">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-20 max-w-2xl"
        >
          <p className="text-sm font-mono text-primary mb-3 tracking-wide uppercase">
            Technical Stack
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Organized as a system, not a list.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Technologies chosen for production reliability, team scalability, and long-term
            maintainability — each with real production time behind it.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
              className="surface-card-hover p-7 group"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-mono text-primary uppercase tracking-wider">
                  {cat.title}
                </h3>
                <span className="text-primary/30 group-hover:text-primary/60 transition-colors duration-300 font-mono text-sm">
                  {cat.icon}
                </span>
              </div>

              <div className="space-y-3">
                {cat.items.map((item, j) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.07 + j * 0.04 }}
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm text-secondary-foreground hover:text-foreground transition-colors duration-150 cursor-default">
                      {item.name}
                    </span>
                    <div className="flex items-center gap-0.5 flex-shrink-0">
                      {Array.from({ length: 5 }).map((_, k) => (
                        <div
                          key={k}
                          className="w-1 h-1 rounded-full transition-colors duration-200"
                          style={{
                            backgroundColor:
                              k < item.level
                                ? "hsl(var(--primary) / 0.7)"
                                : "hsl(var(--border))",
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;
