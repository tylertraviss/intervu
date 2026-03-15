"use client"

export function DashboardPreview() {
  const scores = [
    { label: "Communication", value: 78, color: "var(--chart-1)" },
    { label: "Storytelling", value: 71, color: "var(--chart-2)" },
    { label: "Technical", value: 82, color: "var(--chart-1)" },
    { label: "Structure", value: 68, color: "var(--chart-3)" },
    { label: "Perception", value: 73, color: "var(--chart-2)" },
  ]

  return (
    <section id="preview" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">Evaluation Dashboard</p>
          <h2 className="text-balance text-4xl font-bold text-foreground md:text-5xl">
            See exactly where you stand
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            A comprehensive feedback dashboard with scored dimensions, coaching commentary, and your personalized roadmap.
          </p>
        </div>

        {/* Mock dashboard */}
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-2xl">
          {/* Top bar */}
          <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-5 py-3">
            <div className="h-3 w-3 rounded-full bg-destructive/60" />
            <div className="h-3 w-3 rounded-full" style={{ background: "var(--amber)", opacity: 0.6 }} />
            <div className="h-3 w-3 rounded-full bg-primary/60" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">interviewai.app/results</span>
          </div>

          <div className="grid gap-0 lg:grid-cols-5">
            {/* Left panel */}
            <div className="col-span-2 border-r border-border p-6">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Interview Readiness
              </p>
              <div className="mb-6 flex items-end gap-3">
                <span className="text-6xl font-bold text-foreground">74</span>
                <span className="mb-2 text-xl text-muted-foreground">/100</span>
              </div>

              {/* Score ring */}
              <div className="relative mx-auto mb-6 h-36 w-36">
                <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="var(--border)" strokeWidth="8" />
                  <circle
                    cx="50"
                    cy="50"
                    r="42"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${74 * 2.639} ${(100 - 74) * 2.639}`}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold text-foreground">74%</span>
                  <span className="text-xs text-muted-foreground">Ready</span>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-secondary/30 p-3 text-xs leading-relaxed text-muted-foreground">
                Strong fundamentals. Polish answer structure and deepen system design coverage.
              </div>
            </div>

            {/* Right panel */}
            <div className="col-span-3 p-6">
              <p className="mb-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Dimension Scores
              </p>
              <div className="space-y-4">
                {scores.map((score) => (
                  <div key={score.label}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{score.label}</span>
                      <span className="text-sm font-semibold text-foreground">{score.value}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{ width: `${score.value}%`, background: score.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Strengths / Gaps preview */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                  <p className="mb-2 text-xs font-semibold text-primary">Strengths</p>
                  <ul className="space-y-1">
                    {["Real hands-on examples", "Good technical reasoning"].map((s) => (
                      <li key={s} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
                  <p className="mb-2 text-xs font-semibold text-destructive">Gaps</p>
                  <ul className="space-y-1">
                    {["Answer structure", "Quantifying impact"].map((s) => (
                      <li key={s} className="flex items-start gap-1.5 text-xs text-muted-foreground">
                        <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
