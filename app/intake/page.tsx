"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useInterview, type IntakeData } from "@/lib/interview-context"
import { Check, ChevronRight, ChevronLeft, User, Target, Code, Briefcase, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// ─── Step definitions ────────────────────────────────────────────────────────

const STEPS = [
  { id: 1, label: "Current Role", icon: User },
  { id: 2, label: "Target Role", icon: Target },
  { id: 3, label: "Skills", icon: Code },
  { id: 4, label: "Experience", icon: Briefcase },
  { id: 5, label: "Goals", icon: TrendingUp },
]

// ─── Field components ─────────────────────────────────────────────────────────

function FormLabel({ children }: { children: React.ReactNode }) {
  return <label className="mb-1.5 block text-sm font-medium text-foreground">{children}</label>
}

function FormSelect({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder: string
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-input bg-input px-3 py-2.5 text-sm text-foreground outline-none ring-0 transition focus:border-primary focus:ring-1 focus:ring-primary"
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  )
}

function ToggleCard({
  label,
  selected,
  onClick,
}: {
  label: string
  selected: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex items-center justify-between rounded-lg border px-3 py-2.5 text-sm transition-all text-left",
        selected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
      )}
    >
      <span>{label}</span>
      {selected && <Check size={13} className="ml-2 shrink-0" />}
    </button>
  )
}

function YesNoToggle({
  value,
  onChange,
  label,
}: {
  value: boolean | null
  onChange: (v: boolean) => void
  label: string
}) {
  return (
    <div>
      <FormLabel>{label}</FormLabel>
      <div className="flex gap-3">
        {["Yes", "No"].map((opt) => {
          const isYes = opt === "Yes"
          const active = value === isYes
          return (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(isYes)}
              className={cn(
                "flex-1 rounded-lg border py-2.5 text-sm font-medium transition-all",
                active
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/40"
              )}
            >
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Step data ────────────────────────────────────────────────────────────────

const TECH_SKILLS = [
  "JavaScript / TypeScript",
  "Python",
  "Java / Kotlin",
  "C / C++",
  "Go",
  "Rust",
  "Ruby on Rails",
  "PHP / Laravel",
  "React / Next.js",
  "Vue / Nuxt",
  "Angular",
  "Node.js",
  "Django / FastAPI",
  "Spring Boot",
  "SQL / PostgreSQL",
  "NoSQL / MongoDB",
  "Redis / Caching",
  "AWS / Cloud Services",
  "Docker / Kubernetes",
  "CI/CD Pipelines",
  "System Design",
  "Data Structures & Algorithms",
  "REST / GraphQL APIs",
  "gRPC / Microservices",
  "Machine Learning / AI",
  "Mobile (iOS / Android)",
  "Testing / QA Automation",
  "Git / Version Control",
]

const COMPANY_TYPES = [
  "FAANG / Big Tech",
  "Series A–C Startup",
  "Growth-stage Startup (Series D+)",
  "Mid-size Tech (500–5k employees)",
  "Enterprise / Fortune 500",
  "Consulting / Agency",
  "Government / Public sector",
  "Non-profit / NGO",
  "Fintech / Banking",
  "Healthcare / Biotech",
  "Defense / Aerospace",
  "Open to anything",
]

const INTERVIEW_WEAKNESSES = [
  "Structuring answers (STAR method)",
  "Speaking clearly under pressure",
  "System design questions",
  "Coding / algorithm problems",
  "Data structures knowledge",
  "Showing measurable impact",
  "Asking good clarifying questions",
  "Selling myself / self-advocacy",
  "Handling unexpected follow-ups",
  "Time management during coding",
  "Explaining thought process out loud",
  "Behavioral / culture-fit questions",
  "Negotiating offers",
  "Dealing with nerves / anxiety",
]

// ─── Step components ──────────────────────────────────────────────────────────

function Step1({ data, setData }: { data: Partial<IntakeData>; setData: (d: Partial<IntakeData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <FormLabel>Current Role</FormLabel>
        <FormSelect
          value={data.currentRole ?? ""}
          onChange={(v) => setData({ ...data, currentRole: v })}
          placeholder="Select your current role"
          options={[
            "Student / Bootcamp Graduate",
            "Junior Software Engineer",
            "Software Engineer I",
            "Software Engineer II",
            "Mid-level Full Stack Developer",
            "Frontend Developer",
            "Backend Developer",
            "QA Engineer",
            "Other",
          ]}
        />
      </div>
      <div>
        <FormLabel>Years of Experience</FormLabel>
        <FormSelect
          value={data.yearsExperience ?? ""}
          onChange={(v) => setData({ ...data, yearsExperience: v })}
          placeholder="Select experience level"
          options={["Less than 1 year", "1–2 years", "2–3 years", "3–5 years", "5+ years"]}
        />
      </div>
      <div>
        <FormLabel>Current Industry</FormLabel>
        <FormSelect
          value={data.industry ?? ""}
          onChange={(v) => setData({ ...data, industry: v })}
          placeholder="Select your industry"
          options={[
            "Technology / SaaS",
            "Finance / Fintech",
            "Healthcare / Healthtech",
            "E-commerce / Retail",
            "Education / Edtech",
            "Government / Non-profit",
            "Consulting / Agency",
            "Still in school",
            "Other",
          ]}
        />
      </div>
    </div>
  )
}

function Step2({ data, setData }: { data: Partial<IntakeData>; setData: (d: Partial<IntakeData>) => void }) {
  const toggleCompany = (opt: string) => {
    const current = data.targetCompanyType ?? []
    const updated = current.includes(opt) ? current.filter((c) => c !== opt) : [...current, opt]
    setData({ ...data, targetCompanyType: updated })
  }

  return (
    <div className="space-y-5">
      <div>
        <FormLabel>Target Role</FormLabel>
        <FormSelect
          value={data.targetRole ?? ""}
          onChange={(v) => setData({ ...data, targetRole: v })}
          placeholder="What role are you targeting?"
          options={[
            "Software Engineer (General)",
            "Frontend Engineer",
            "Backend Engineer",
            "Full Stack Engineer",
            "iOS / Android Engineer",
            "Data Engineer",
            "ML / AI Engineer",
            "DevOps / Platform Engineer",
            "Security Engineer",
          ]}
        />
      </div>
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <FormLabel>Target Company Type</FormLabel>
          <span className="text-xs text-muted-foreground">
            {(data.targetCompanyType ?? []).length > 0
              ? `${(data.targetCompanyType ?? []).length} selected`
              : "Select all that apply"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {COMPANY_TYPES.map((opt) => (
            <ToggleCard
              key={opt}
              label={opt}
              selected={(data.targetCompanyType ?? []).includes(opt)}
              onClick={() => toggleCompany(opt)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Step3({ data, setData }: { data: Partial<IntakeData>; setData: (d: Partial<IntakeData>) => void }) {
  const toggleSkill = (skill: string, field: "strongestSkills" | "weakestAreas") => {
    const current = (data[field] ?? []) as string[]
    const updated = current.includes(skill) ? current.filter((s) => s !== skill) : [...current, skill]
    setData({ ...data, [field]: updated })
  }

  const toggleWeakness = (item: string) => {
    const current = data.interviewWeaknesses ?? []
    const updated = current.includes(item) ? current.filter((w) => w !== item) : [...current, item]
    setData({ ...data, interviewWeaknesses: updated })
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <FormLabel>Strongest Technical Skills</FormLabel>
          <span className="text-xs text-muted-foreground">
            {(data.strongestSkills ?? []).length > 0
              ? `${(data.strongestSkills ?? []).length} selected`
              : "Select all that apply"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TECH_SKILLS.map((skill) => (
            <ToggleCard
              key={skill}
              label={skill}
              selected={(data.strongestSkills ?? []).includes(skill)}
              onClick={() => toggleSkill(skill, "strongestSkills")}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <FormLabel>Weakest Technical Areas</FormLabel>
          <span className="text-xs text-muted-foreground">
            {(data.weakestAreas ?? []).length > 0
              ? `${(data.weakestAreas ?? []).length} selected`
              : "Select all that apply"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {TECH_SKILLS.map((skill) => (
            <ToggleCard
              key={skill}
              label={skill}
              selected={(data.weakestAreas ?? []).includes(skill)}
              onClick={() => toggleSkill(skill, "weakestAreas")}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between">
          <FormLabel>Biggest Interview Weaknesses</FormLabel>
          <span className="text-xs text-muted-foreground">
            {(data.interviewWeaknesses ?? []).length > 0
              ? `${(data.interviewWeaknesses ?? []).length} selected`
              : "Select all that apply"}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {INTERVIEW_WEAKNESSES.map((item) => (
            <ToggleCard
              key={item}
              label={item}
              selected={(data.interviewWeaknesses ?? []).includes(item)}
              onClick={() => toggleWeakness(item)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Step4({ data, setData }: { data: Partial<IntakeData>; setData: (d: Partial<IntakeData>) => void }) {
  return (
    <div className="space-y-5">
      <YesNoToggle
        label="Do you have leadership or people management experience?"
        value={data.leadershipExperience ?? null}
        onChange={(v) => setData({ ...data, leadershipExperience: v })}
      />
      <YesNoToggle
        label="Have you participated in system design interviews before?"
        value={data.systemDesignExperience ?? null}
        onChange={(v) => setData({ ...data, systemDesignExperience: v })}
      />
      <YesNoToggle
        label="Have you shipped code to production systems used by real users?"
        value={data.shippedProduction ?? null}
        onChange={(v) => setData({ ...data, shippedProduction: v })}
      />
    </div>
  )
}

function Step5({ data, setData }: { data: Partial<IntakeData>; setData: (d: Partial<IntakeData>) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <FormLabel>Career Timeline Goal</FormLabel>
        <FormSelect
          value={data.careerTimeline ?? ""}
          onChange={(v) => setData({ ...data, careerTimeline: v })}
          placeholder="When do you want to land your next role?"
          options={[
            "Actively interviewing now",
            "Within the next 1–3 months",
            "Within the next 3–6 months",
            "6–12 months from now",
            "Just exploring / no deadline",
          ]}
        />
      </div>
      <div>
        <FormLabel>
          Overall Interview Confidence Level —{" "}
          <span className="font-semibold text-primary">{data.confidenceLevel ?? 5} / 10</span>
        </FormLabel>
        <p className="mb-3 text-xs text-muted-foreground">1 = very unconfident, 10 = highly confident</p>
        <input
          type="range"
          min={1}
          max={10}
          value={data.confidenceLevel ?? 5}
          onChange={(e) => setData({ ...data, confidenceLevel: Number(e.target.value) })}
          className="w-full accent-primary"
        />
        <div className="mt-1 flex justify-between text-xs text-muted-foreground">
          <span>1</span>
          <span>5</span>
          <span>10</span>
        </div>
      </div>
    </div>
  )
}

// ─── Validation ───────────────────────────────────────────────────────────────

function isStepValid(step: number, data: Partial<IntakeData>): boolean {
  switch (step) {
    case 1:
      return !!(data.currentRole && data.yearsExperience && data.industry)
    case 2:
      return !!(data.targetRole && (data.targetCompanyType ?? []).length > 0)
    case 3:
      return (
        (data.strongestSkills ?? []).length > 0 &&
        (data.weakestAreas ?? []).length > 0 &&
        (data.interviewWeaknesses ?? []).length > 0
      )
    case 4:
      return (
        data.leadershipExperience !== undefined &&
        data.systemDesignExperience !== undefined &&
        data.shippedProduction !== undefined
      )
    case 5:
      return !!(data.careerTimeline && data.confidenceLevel)
    default:
      return true
  }
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function IntakePage() {
  const router = useRouter()
  const { setIntakeData } = useInterview()
  const [step, setStep] = useState(1)
  const [data, setData] = useState<Partial<IntakeData>>({
    confidenceLevel: 5,
    strongestSkills: [],
    weakestAreas: [],
    interviewWeaknesses: [],
    targetCompanyType: [],
    leadershipExperience: undefined,
    systemDesignExperience: undefined,
    shippedProduction: undefined,
  })

  const valid = isStepValid(step, data)

  const next = () => {
    if (step < 5) {
      setStep((s) => s + 1)
    } else {
      setIntakeData(data as IntakeData)
      router.push("/summary")
    }
  }

  const back = () => setStep((s) => s - 1)

  const stepProps = { data, setData }

  return (
    <div className="min-h-screen bg-background px-4 py-12 font-sans">
      {/* Header */}
      <div className="mx-auto mb-10 max-w-xl text-center">
        <div className="mb-3 flex items-center justify-center gap-2">
          <img src="/logo.png" alt="Intervu" className="h-7 w-7" />
          <span className="font-semibold text-foreground">Intervu</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">Career Intake</h1>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Tell us about your background so we can personalize your interview session.
        </p>
      </div>

      {/* Progress steps */}
      <div className="mx-auto mb-8 max-w-xl">
        <div className="flex items-center justify-between">
          {STEPS.map((s, i) => {
            const Icon = s.icon
            const done = step > s.id
            const active = step === s.id
            return (
              <div key={s.id} className="flex flex-1 flex-col items-center">
                <div className="relative flex w-full items-center">
                  {i > 0 && (
                    <div
                      className={cn(
                        "absolute left-0 right-1/2 h-px",
                        done || active ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                  {i < STEPS.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-1/2 right-0 h-px",
                        done ? "bg-primary" : "bg-border"
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "relative z-10 mx-auto flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-medium transition-all",
                      done
                        ? "border-primary bg-primary text-primary-foreground"
                        : active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-card text-muted-foreground"
                    )}
                  >
                    {done ? <Check size={14} /> : <Icon size={13} />}
                  </div>
                </div>
                <span
                  className={cn(
                    "mt-2 text-[11px] font-medium",
                    active ? "text-primary" : done ? "text-muted-foreground" : "text-muted-foreground/60"
                  )}
                >
                  {s.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Card */}
      <div className="mx-auto max-w-xl rounded-xl border border-border bg-card p-6 shadow-lg">
        {/* Step header */}
        <div className="mb-6 border-b border-border pb-4">
          <div className="flex items-center gap-3">
            {(() => {
              const s = STEPS[step - 1]
              const Icon = s.icon
              return (
                <>
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-muted-foreground">Step {step} of {STEPS.length}</p>
                    <h2 className="font-semibold text-foreground">{s.label}</h2>
                  </div>
                </>
              )
            })()}
          </div>
        </div>

        {/* Step content */}
        <div className="min-h-[320px]">
          {step === 1 && <Step1 {...stepProps} />}
          {step === 2 && <Step2 {...stepProps} />}
          {step === 3 && <Step3 {...stepProps} />}
          {step === 4 && <Step4 {...stepProps} />}
          {step === 5 && <Step5 {...stepProps} />}
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={back}
            disabled={step === 1}
            className="gap-1 text-muted-foreground"
          >
            <ChevronLeft size={15} />
            Back
          </Button>

          <Button
            size="sm"
            onClick={next}
            disabled={!valid}
            className="gap-1 bg-primary px-5 text-primary-foreground hover:bg-primary/90 disabled:opacity-40"
          >
            {step === 5 ? "View Interview Summary" : "Continue"}
            <ChevronRight size={15} />
          </Button>
        </div>
      </div>
    </div>
  )
}
