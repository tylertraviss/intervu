import { Navbar } from "@/components/landing/navbar"
import { HeroSection } from "@/components/landing/hero"
import { HowItWorks } from "@/components/landing/how-it-works"
import { Features } from "@/components/landing/features"
import { DashboardPreview } from "@/components/landing/dashboard-preview"
import { CTASection } from "@/components/landing/cta-section"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      <main>
        <HeroSection />
        <HowItWorks />
        <Features />
        <DashboardPreview />
        <CTASection />
      </main>

      {/* Footer */}
      <footer className="border-t border-border px-6 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Intervu" className="h-6 w-6" />
            <span className="text-sm font-semibold text-foreground">Intervu</span>
          </div>
          <p className="text-xs text-muted-foreground">
            AI-powered interview coaching for early-career software engineers.
          </p>
          <div className="flex gap-4">
            <Link href="/intake" className="text-xs text-muted-foreground hover:text-foreground">
              Get Started
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
