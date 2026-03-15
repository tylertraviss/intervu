"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useInterview } from "@/lib/interview-context"
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function EmailCapturePage() {
  const router = useRouter()
  const { intakeData, setIntakeData } = useInterview()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic email validation
    if (!email || !email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address")
      return
    }

    setLoading(true)

    // Simulate a brief delay (in a real app, this would send to a backend)
    await new Promise((resolve) => setTimeout(resolve, 500))

    // Save email to context
    if (intakeData) {
      setIntakeData({ ...intakeData, userEmail: email })
    }

    // Navigate to results
    router.push("/results")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 flex items-center justify-center gap-2">
          <img src="/logo.png" alt="Intervu" className="h-8 w-8" />
          <span className="font-semibold text-foreground">Intervu</span>
        </div>

        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <Mail size={24} className="text-primary" />
          </div>
          <h1 className="mb-2 text-3xl font-bold text-foreground">Almost there!</h1>
          <p className="text-muted-foreground">
            Enter your email to unlock your personalized evaluation dashboard and career roadmap.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
              Email address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
            {error && <p className="mt-1.5 text-xs text-destructive">{error}</p>}
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full gap-2 bg-primary py-3 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Processing...
              </>
            ) : (
              <>
                View My Results
                <ArrowRight size={16} />
              </>
            )}
          </Button>
        </form>

        {/* Trust signal */}
        <div className="rounded-lg border border-border bg-card px-4 py-3 text-center text-xs text-muted-foreground">
          <div className="mb-1.5 flex items-center justify-center gap-1.5">
            <CheckCircle2 size={13} className="text-primary" />
            <span className="font-medium text-foreground">Your data is secure</span>
          </div>
          We never share your email or interview data. We only use it to send you insights and tips.
        </div>
      </div>
    </div>
  )
}
