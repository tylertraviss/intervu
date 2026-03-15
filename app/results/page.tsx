"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useInterview } from "@/lib/interview-context"
import { MOCK_RESULTS } from "@/lib/interview-data"
import {
  CheckCircle2,
  XCircle,
  TrendingUp,
  MessageSquare,
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"

// Company success data
const COMPANY_SUCCESSES = [
  {
    company: "Google",
    logo: "🔵",
    role: "Software Engineer",
    testimonial:
      "Intervu helped me ace my behavioral rounds and land an offer at Google. The feedback was incredibly specific.",
    author: "Sarah M.",
  },
  {
    company: "Meta",
    logo: "📘",
    role: "Backend Engineer",
    testimonial:
      "The mock interview practice and real-time feedback was exactly what I needed. Got an offer in 3 weeks.",
    author: "James K.",
  },
  {
    company: "Amazon",
    logo: "🟠",
    role: "Full-Stack Engineer",
    testimonial:
      "The 30-day plan was realistic and actionable. Helped me improve my system design explanations.",
    author: "Priya S.",
  },
  {
    company: "Apple",
    logo: "🍎",
    role: "iOS Engineer",
    testimonial:
      "Best interview prep I've done. The dimension breakdown showed me exactly what to work on.",
    author: "Michael T.",
  },
  {
    company: "Microsoft",
    logo: "💚",
    role: "Cloud Engineer",
    testimonial:
      "The structured feedback and career roadmap gave me confidence going into my interviews.",
    author: "Alex R.",
  },
  {
    company: "Netflix",
    logo: "🔴",
    role: "Full-Stack Engineer",
    testimonial:
      "Recording my answers and seeing the AI feedback really helped me identify communication patterns.",
    author: "Emma W.",
  },
  {
    company: "Stripe",
    logo: "💳",
    role: "Software Engineer",
    testimonial:
      "The targeted questions felt like actual Stripe interviews. Converted in 2 rounds.",
    author: "David L.",
  },
  {
    company: "Uber",
    logo: "🚗",
    role: "Backend Engineer",
    testimonial:
      "The coaching feedback on my storytelling made all the difference in my final round.",
    author: "Nina P.",
  },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeading({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-primary">{label}</p>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ResultsPage() {
  const router = useRouter()
  const { intakeData } = useInterview()
  const [carouselIndex, setCarouselIndex] = useState(0)

  useEffect(() => {
    // Redirect to email capture if email not provided
    if (!intakeData?.userEmail) {
      router.push("/email-capture")
    }
  }, [intakeData, router])

  if (!intakeData?.userEmail) {
    return null // Don't render anything while redirecting
  }

  const r = MOCK_RESULTS
  const targetRole = intakeData?.targetRole ?? "Software Engineer"

  const handlePrevious = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? COMPANY_SUCCESSES.length - 1 : prev - 1
    )
  }

  const handleNext = () => {
    setCarouselIndex((prev) =>
      prev === COMPANY_SUCCESSES.length - 1 ? 0 : prev + 1
    )
  }

  const currentSuccess = COMPANY_SUCCESSES[carouselIndex]

  return (
    <div className="min-h-screen bg-background font-sans">
      {/* Top bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-background/90 px-6 py-4 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Intervu" className="h-7 w-7" />
          <span className="font-semibold text-foreground">Intervu</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:block">
            Evaluation for: <span className="font-medium text-foreground">{targetRole}</span>
          </span>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="gap-1.5 border-border text-muted-foreground"
          >
            <Link href="/">
              <Home size={13} />
              Home
            </Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10">
        {/* ── Section 1: Overview ── */}
        <section className="mb-10">
          <div className="flex flex-col items-center rounded-2xl border border-border bg-card p-7 text-center">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Interview Readiness
            </p>
            <div className="relative my-4 h-36 w-36">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="var(--primary)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${r.overallScore * 2.639} ${
                    (100 - r.overallScore) * 2.639
                  }`}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-foreground">
                  {r.overallScore}
                </span>
                <span className="text-xs text-muted-foreground">/ 100</span>
              </div>
            </div>
            <p className="text-sm font-semibold text-foreground">
              Good — Above Average
            </p>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              Would likely advance past a phone screen at mid-tier tech companies.
            </p>
          </div>
        </section>

        {/* ── Section 2: Interviewer Perception ── */}
        <section className="mb-10">
          <SectionHeading
            label="AI Analysis"
            title="How a Technical Interviewer Would Perceive You"
          />
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <MessageSquare size={15} className="text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {r.interviewerSummary}
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 3: Strengths & Weaknesses ── */}
        <section className="mb-10">
          <SectionHeading label="Profile Assessment" title="Strengths & Gaps" />
          <div className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl border border-primary/20 bg-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <CheckCircle2 size={16} className="text-primary" />
                <span className="font-semibold text-foreground">Strengths</span>
              </div>
              <ul className="space-y-3">
                {r.strengths.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-destructive/20 bg-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <XCircle size={16} className="text-destructive" />
                <span className="font-semibold text-foreground">
                  Gaps to Address
                </span>
              </div>
              <ul className="space-y-3">
                {r.weaknesses.map((w) => (
                  <li
                    key={w}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Section 4: Communication Feedback ── */}
        <section className="mb-10">
          <SectionHeading label="Coaching Feedback" title="Communication Deep Dive" />
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <BookOpen size={15} className="text-primary" />
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {r.communicationFeedback}
              </p>
            </div>
          </div>
        </section>

        {/* ── Section 5: Success Stories Carousel ── */}
        <section className="mb-10">
          <SectionHeading
            label="Success Stories"
            title="Engineers Landing Their Dream Roles"
          />
          <div className="rounded-2xl border border-border bg-card p-8">
            <div className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <div className="text-3xl">{currentSuccess.logo}</div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {carouselIndex + 1} / {COMPANY_SUCCESSES.length}
                </span>
              </div>
              <h3 className="mb-1 text-xl font-bold text-foreground">
                {currentSuccess.company}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground">
                {currentSuccess.role}
              </p>
              <p className="mb-6 text-sm leading-relaxed text-foreground italic">
                "{currentSuccess.testimonial}"
              </p>
              <p className="text-xs font-medium text-muted-foreground">
                — {currentSuccess.author}
              </p>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={handlePrevious}
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Previous success story"
              >
                <ChevronLeft size={18} />
              </button>

              {/* Dot indicators */}
              <div className="flex gap-2">
                {COMPANY_SUCCESSES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCarouselIndex(i)}
                    className={`h-2 rounded-full transition-all ${
                      i === carouselIndex
                        ? "w-6 bg-primary"
                        : "w-2 bg-muted-foreground/40"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                aria-label="Next success story"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="rounded-2xl border border-primary/20 bg-card p-8 text-center">
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
          </div>
          <TrendingUp size={24} className="mx-auto mb-3 text-primary" />
          <h3 className="mb-2 text-xl font-bold text-foreground">
            Ready to be next?
          </h3>
          <p className="mb-6 text-sm text-muted-foreground">
            Your score is solid. Retake the interview to track improvement and
            refine your edge.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              asChild
              className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/intake">
                Retake Assessment
                <ChevronRight size={14} />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-border text-muted-foreground"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}
