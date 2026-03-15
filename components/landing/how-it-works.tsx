"use client"

import { ClipboardList, Mic, BarChart3, Map } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Complete Your Profile",
    description:
      "A structured 5-step career intake form collects your current role, target position, technical strengths, experience level, and goals to personalize your session.",
  },
  {
    number: "02",
    icon: Mic,
    title: "Interview Session",
    description:
      "Answer 3 tailored questions — a mix of behavioral and technical — at your own pace. A 30-second timer and one-click microphone recording keep you focused.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "AI Evaluation",
    description:
      "Receive a scored breakdown across 5 dimensions: communication clarity, storytelling, technical explanation, answer structure, and interviewer perception.",
  },
  {
    number: "04",
    icon: Map,
    title: "Career Roadmap",
    description:
      "Get a personalized 7-day sprint plan and 30-day improvement roadmap targeting your exact weaknesses — not generic tips, but precise coaching.",
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">How it works</p>
          <h2 className="text-balance text-4xl font-bold text-foreground md:text-5xl">
            From intake to roadmap in one session
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-muted-foreground">
            A structured 4-step system designed to surface real signal about your interview readiness.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="group relative rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
              >
                {/* Connector line (desktop) */}
                {i < steps.length - 1 && (
                  <div className="absolute -right-3 top-8 hidden h-px w-6 bg-border lg:block" />
                )}

                <div className="mb-5 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={20} className="text-primary" />
                  </div>
                  <span className="font-mono text-2xl font-bold text-border">{step.number}</span>
                </div>

                <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
