"use client"

import { Target, Mic2, Brain, TrendingUp, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Personalized Question Selection",
    description:
      "Questions are selected based on your target role, company type, experience level, and self-identified weaknesses — not a generic bank.",
    accent: "primary",
    large: true,
  },
  {
    icon: Mic2,
    title: "Voice Recording",
    description:
      "One-click microphone recording with a visible timer. Retry any answer before moving on. No pressure, no judgment — just practice.",
    accent: "primary",
    large: false,
  },
  {
    icon: Brain,
    title: "5-Dimension AI Scoring",
    description:
      "Scored on communication clarity, storytelling, technical depth, answer structure, and interviewer perception — the metrics that actually matter.",
    accent: "amber",
    large: false,
  },
  {
    icon: TrendingUp,
    title: "30-Day Improvement Plan",
    description:
      "A week-by-week roadmap with specific actions, resources, and exercises targeting your exact gaps.",
    accent: "primary",
    large: false,
  },
  {
    icon: Shield,
    title: "Realistic Interview Conditions",
    description:
      "Timed responses and a distraction-free interface simulate the real pressure of a live technical interview screen.",
    accent: "amber",
    large: false,
  },
  {
    icon: Zap,
    title: "Instant Feedback",
    description:
      "No waiting. Complete your session and immediately access your full evaluation dashboard with detailed coaching notes.",
    accent: "primary",
    large: false,
  },
]

export function Features() {
  return (
    <section id="features" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">Features</p>
          <h2 className="text-balance text-4xl font-bold text-foreground md:text-5xl">
            Built for serious candidates
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            Every feature is designed around one goal: maximizing your interview readiness in the shortest amount of time.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            const isAmber = feature.accent === "amber"
            return (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/30"
              >
                <div
                  className={`mb-4 flex h-10 w-10 items-center justify-center rounded-lg ${
                    isAmber ? "bg-amber/15" : "bg-primary/10"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isAmber ? "text-amber" : "text-primary"}
                    style={isAmber ? { color: "var(--amber)" } : undefined}
                  />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
