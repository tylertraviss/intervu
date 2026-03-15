"use client"

import { useRouter } from "next/navigation"
import { useInterview } from "@/lib/interview-context"
import { INTERVIEW_QUESTIONS } from "@/lib/interview-data"
import { ArrowRight, User, Target, Brain, MessageSquare, Wrench, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const FOCUS_AREAS = [
  { icon: MessageSquare, label: "Behavioral Storytelling", desc: "STAR-format behavioral answers" },
  { icon: Brain, label: "System Design Thinking", desc: "Architecture and trade-off reasoning" },
  { icon: Wrench, label: "Technical Explanation", desc: "Communicating complex concepts clearly" },
]

export default function SummaryPage() {
  const router = useRouter()
  const { intakeData, resetInterview } = useInterview()

  // Fallback defaults for demo/preview
  const name = "Candidate"
  const currentRole = intakeData?.currentRole ?? "Junior Software Engineer"
  const yearsExp = intakeData?.yearsExperience ?? "1–2 years"
  const industry = intakeData?.industry ?? "Technology / SaaS"
  const targetRole = intakeData?.targetRole ?? "Software Engineer (General)"
  const companyType = intakeData?.targetCompanyType ?? "Series A–C Startup"
  const strongSkills = intakeData?.strongestSkills ?? ["JavaScript / TypeScript", "React / Next.js"]
  const confidence = intakeData?.confidenceLevel ?? 5

  const handleBegin = () => {
    resetInterview()
    router.push("/interview")
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 font-sans">
      {/* Header */}
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <img src="/logo.png" alt="Intervu" className="h-7 w-7" />
          <span className="font-semibold text-foreground">Intervu</span>
        </div>
        <h1 className="text-3xl font-bold text-foreground">Interview Summary</h1>
        <p className="mt-2 text-muted-foreground">
          Based on your profile, here is what your mock interview will focus on.
        </p>
      </div>

      <div className="mx-auto max-w-3xl space-y-5">
        {/* Candidate + Target cards */}
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Candidate Profile Card */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <User size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Candidate Profile</p>
                <p className="font-semibold text-foreground">{name}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <Row label="Role" value={currentRole} />
              <Row label="Experience" value={yearsExp} />
              <Row label="Industry" value={industry} />
              <Row label="Confidence" value={`${confidence}/10`} />
            </div>
            {strongSkills.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {strongSkills.slice(0, 4).map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-primary/30 bg-primary/10 px-2 py-0.5 text-xs text-primary"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Target Role Card */}
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                <Target size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Target Position</p>
                <p className="font-semibold text-foreground">{targetRole}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <Row label="Company Type" value={companyType} />
              <Row
                label="Leadership"
                value={intakeData?.leadershipExperience ? "Yes" : "No"}
              />
              <Row
                label="System Design"
                value={intakeData?.systemDesignExperience ? "Yes" : "No"}
              />
              <Row
                label="Shipped to Production"
                value={intakeData?.shippedProduction ? "Yes" : "No"}
              />
            </div>
          </div>
        </div>

        {/* Interview Focus Areas */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="mb-4 text-sm font-semibold text-foreground">Interview Focus Areas</p>
          <div className="grid gap-3 sm:grid-cols-3">
            {FOCUS_AREAS.map((area) => {
              const Icon = area.icon
              return (
                <div
                  key={area.label}
                  className="flex items-start gap-3 rounded-lg border border-border bg-secondary/30 p-3"
                >
                  <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary/10">
                    <Icon size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">{area.label}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{area.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Questions Preview */}
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-foreground">Questions in This Session</p>
            <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {INTERVIEW_QUESTIONS.length} Questions
            </span>
          </div>
          <div className="space-y-3">
            {INTERVIEW_QUESTIONS.map((q, i) => (
              <div key={q.id} className="flex items-start gap-3 rounded-lg border border-border bg-secondary/20 px-4 py-3">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-border text-xs font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        q.type === "Technical"
                          ? "bg-amber-dim text-amber"
                          : "border border-primary/20 bg-primary/10 text-primary"
                      }`}
                      style={
                        q.type === "Technical"
                          ? { background: "var(--amber-dim)", color: "var(--amber)" }
                          : undefined
                      }
                    >
                      {q.type}
                    </span>
                    <span className="text-xs text-muted-foreground">{q.category}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">{q.question}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timer notice */}
        <div className="flex items-center gap-3 rounded-xl border border-amber/20 bg-amber/5 px-4 py-3">
          <Clock size={16} style={{ color: "var(--amber)" }} className="shrink-0" />
          <p className="text-sm text-muted-foreground">
            Each question has a <span className="font-semibold text-foreground">30-second response timer.</span> You can
            retry your answer before moving to the next question.
          </p>
        </div>

        {/* CTA */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleBegin}
            size="lg"
            className="gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
          >
            Begin Mock Interview
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  )
}
