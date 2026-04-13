import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" as const },
};

const cases = [
  {
    id: "thesistrack",
    index: "01",
    title: "ThesisTrack",
    tagline: "Academic document management platform",
    year: "2023",
    type: "Full-Stack System",
    problem:
      "Universities lacked a unified system to manage thesis workflows — document submission, advisor reviews, full-text search, and access control were fragmented across multiple tools, causing delays and lost documents.",
    architecture: [
      "React + TypeScript",
      "Django REST Framework",
      "Elasticsearch",
      "AWS S3",
      "Docker",
      "PostgreSQL",
      "JWT Auth",
      "RBAC",
    ],
    decisions: [
      {
        title: "Elasticsearch over SQL LIKE queries",
        reasoning:
          "Full-text search across 10,000+ thesis documents required inverted indexing with custom analyzers. SQL pattern matching couldn't meet the sub-500ms latency requirement at scale.",
      },
      {
        title: "S3 for document storage",
        reasoning:
          "Decoupling binary storage from the application database reduced backup complexity and enabled CDN-level distribution for document downloads — zero I/O pressure on Postgres.",
      },
      {
        title: "Role-Based Access Control",
        reasoning:
          "Students, advisors, and administrators required different permission boundaries. JWT + custom middleware enforced access at the API layer — zero privilege escalation surface.",
      },
    ],
    metrics: [
      { value: "<500ms", label: "Search latency", accent: true },
      { value: "99.9%", label: "Uptime SLA", accent: false },
      { value: "70%", label: "Manual work eliminated", accent: false },
      { value: "10K+", label: "Documents indexed", accent: false },
    ],
    tradeoffs:
      "Chose Elasticsearch over Solr for better REST API ergonomics and ecosystem tooling, accepting higher memory overhead. Chose monolithic Django API over microservices to minimize operational complexity at current scale — with clear seams for future decomposition.",
  },
  {
    id: "fluentking",
    index: "02",
    title: "FluentKing",
    tagline: "High-conversion landing page platform",
    year: "2023",
    type: "Frontend Architecture",
    problem:
      "The existing landing page suffered from slow load times, poor Core Web Vitals, and accessibility gaps — resulting in low conversion rates, missed leads, and poor search engine rankings.",
    architecture: [
      "React + TypeScript",
      "Component Architecture",
      "Code Splitting",
      "Critical CSS",
      "Lazy Loading",
      "WCAG AA",
      "SEO Pipeline",
      "Lighthouse CI",
    ],
    decisions: [
      {
        title: "Component architecture for conversion",
        reasoning:
          "Every UI component was built as a self-contained module with lazy loading boundaries, reducing initial bundle size and improving Time to Interactive below the 1.5s target.",
      },
      {
        title: "Performance as a first-class feature",
        reasoning:
          "Image optimization, code splitting, and critical CSS extraction delivered 40%+ improvement in page load. Performance regressions are caught via Lighthouse CI before merge.",
      },
      {
        title: "Accessibility-driven development",
        reasoning:
          "WCAG AA compliance was a design constraint, not a post-launch audit. Semantic HTML, ARIA attributes, and keyboard navigation were first-class concerns from day one.",
      },
    ],
    metrics: [
      { value: "30–45%", label: "Lead increase", accent: true },
      { value: "40%+", label: "Performance gain", accent: false },
      { value: "AA", label: "WCAG compliance", accent: false },
      { value: "95+", label: "Lighthouse score", accent: false },
    ],
    tradeoffs:
      "Prioritized load performance over rich animations — every animation was evaluated against its impact on LCP and CLS. Chose client-side rendering for interactive conversion forms while keeping static generation for SEO-critical content pages.",
  },
];

const CaseStudies = () => {
  return (
    <section id="cases" className="section-padding">
      <div className="container">
        <motion.div {...fadeUp} className="mb-20 max-w-2xl">
          <p className="text-sm font-mono text-primary mb-3 tracking-wide uppercase">
            Case Studies
          </p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-5">
            Systems built for production.
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Technical deep-dives into real systems — architecture decisions, trade-offs,
            and measurable outcomes that ship to real users.
          </p>
        </motion.div>

        <div className="space-y-8">
          {cases.map((c, idx) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: idx * 0.08 }}
              className="surface-card overflow-hidden"
            >
              {/* Header */}
              <div className="p-8 md:p-10 border-b border-border">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-xs text-primary/50">{c.index}</span>
                      <span className="h-px w-6 bg-border" />
                      <span className="text-xs font-mono text-muted-foreground">{c.type}</span>
                      <span className="text-xs font-mono text-muted-foreground">·</span>
                      <span className="text-xs font-mono text-muted-foreground">{c.year}</span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                      {c.title}
                    </h3>
                    <p className="text-muted-foreground mt-1.5">{c.tagline}</p>
                  </div>
                  <button className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all duration-200 group">
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50 border border-border/50">
                  <p className="text-xs font-mono text-primary/70 uppercase tracking-wider mb-2">Problem</p>
                  <p className="text-sm text-subtle leading-relaxed">{c.problem}</p>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-border">
                {/* Left */}
                <div className="p-8 md:p-10">
                  <div className="mb-9">
                    <h4 className="text-xs font-mono text-primary uppercase tracking-wider mb-4">
                      Architecture Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {c.architecture.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs font-mono bg-secondary text-secondary-foreground rounded-md border border-border/50 hover:border-primary/30 hover:text-foreground transition-colors duration-150"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-primary uppercase tracking-wider mb-5">
                      Key Decisions
                    </h4>
                    <div className="space-y-5">
                      {c.decisions.map((d, i) => (
                        <div key={d.title} className="flex gap-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-5 h-5 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                              <span className="font-mono text-[9px] text-primary">{String(i + 1).padStart(2, "0")}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground mb-1.5">{d.title}</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">{d.reasoning}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right */}
                <div className="p-8 md:p-10">
                  <h4 className="text-xs font-mono text-primary uppercase tracking-wider mb-6">
                    Measured Impact
                  </h4>
                  <div className="grid grid-cols-2 gap-6 mb-10">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="group">
                        <div
                          className="text-2xl font-bold font-mono metric-value mb-1"
                          style={{
                            color: m.accent
                              ? "hsl(var(--primary))"
                              : "hsl(var(--foreground))",
                          }}
                        >
                          {m.value}
                        </div>
                        <div className="text-xs text-muted-foreground">{m.label}</div>
                        <div className="mt-2 h-px bg-border group-hover:bg-primary/30 transition-colors duration-300" />
                      </div>
                    ))}
                  </div>
                  <div className="pt-6 border-t border-border">
                    <h4 className="text-xs font-mono text-primary uppercase tracking-wider mb-3">
                      Trade-offs & Rationale
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{c.tradeoffs}</p>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
