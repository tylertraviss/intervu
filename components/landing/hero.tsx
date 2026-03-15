"use client"

import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-foreground) 1px, transparent 1px), linear-gradient(90deg, var(--color-foreground) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow behind headline */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        {/* Headline */}
        <h1 className="text-balance text-5xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl">
          Land your dream{" "}
          <span className="text-primary">engineering</span>{" "}
          role.
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Practice real interview questions tailored to your profile, record your answers, and receive a comprehensive
          AI evaluation with personalized coaching feedback.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button
            asChild
            size="lg"
            className="gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            <Link href="/intake">
              Start Free Assessment
              <ArrowRight size={16} />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:bg-secondary">
            <Link href="#how-it-works">See how it works</Link>
          </Button>
        </div>


      </div>
    </section>
  )
}
