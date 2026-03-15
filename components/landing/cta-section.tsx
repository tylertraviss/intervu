"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-card p-12 text-center">
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
          </div>

          <div className="relative z-10">
            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-primary">Ready to begin?</p>
            <h2 className="mb-4 text-balance text-4xl font-bold text-foreground md:text-5xl">
              Your next offer starts with this assessment.
            </h2>
            <p className="mx-auto mb-10 max-w-xl text-pretty text-lg text-muted-foreground">
              3 targeted questions. 5-minute session. A full coaching report and 30-day roadmap — ready when you finish.
            </p>

            <Button
              asChild
              size="lg"
              className="gap-2 bg-primary px-10 text-primary-foreground hover:bg-primary/90"
            >
              <Link href="/intake">
                Start Free Assessment
                <ArrowRight size={16} />
              </Link>
            </Button>

            <p className="mt-4 text-xs text-muted-foreground">
              No sign-up required. Takes under 15 minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
