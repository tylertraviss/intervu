"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { useInterview } from "@/lib/interview-context"
import { INTERVIEW_QUESTIONS } from "@/lib/interview-data"
import { Mic, Square, RotateCcw, ArrowRight, CheckCircle2, Lightbulb, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const TIMER_SECONDS = 30

type RecordState = "idle" | "recording" | "recorded"

export default function InterviewPage() {
  const router = useRouter()
  const { markAnswered } = useInterview()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [recordState, setRecordState] = useState<RecordState>("idle")
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS)
  const [timerActive, setTimerActive] = useState(false)
  const [showTip, setShowTip] = useState(false)
  const [completed, setCompleted] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const question = INTERVIEW_QUESTIONS[currentIndex]
  const totalQuestions = INTERVIEW_QUESTIONS.length

  // Clean up timer
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  // Timer logic
  useEffect(() => {
    if (timerActive) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            stopRecording()
            return 0
          }
          return t - 1
        })
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerActive])

  const startRecording = useCallback(async () => {
    setTimeLeft(TIMER_SECONDS)
    setRecordState("recording")
    setTimerActive(true)

    // Try to get real microphone access; if denied, simulate
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      const mr = new MediaRecorder(stream)
      mediaRecorderRef.current = mr
      mr.start()
    } catch {
      // Microphone permission denied — simulate recording
    }
  }, [])

  const stopRecording = useCallback(() => {
    setTimerActive(false)
    setRecordState("recorded")

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [])

  const retryAnswer = () => {
    setRecordState("idle")
    setTimeLeft(TIMER_SECONDS)
    setTimerActive(false)
  }

  const nextQuestion = () => {
    markAnswered()
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((i) => i + 1)
      setRecordState("idle")
      setTimeLeft(TIMER_SECONDS)
      setTimerActive(false)
      setShowTip(false)
    } else {
      markAnswered()
      setCompleted(true)
    }
  }

  const goToResults = () => {
    router.push("/email-capture")
  }

  const timerPercent = (timeLeft / TIMER_SECONDS) * 100
  const timerColor =
    timeLeft > 15 ? "var(--primary)" : timeLeft > 8 ? "var(--amber)" : "var(--rose)"

  if (completed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 font-sans">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 size={32} className="text-primary" />
          </div>
          <h1 className="mb-3 text-3xl font-bold text-foreground">Interview Complete</h1>
          <p className="mb-8 text-muted-foreground">
            You have answered all {totalQuestions} questions. Your AI evaluation is ready.
          </p>
          <Button
            onClick={goToResults}
            size="lg"
            className="gap-2 bg-primary px-10 text-primary-foreground hover:bg-primary/90"
          >
            View Evaluation Dashboard
            <ArrowRight size={16} />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-border px-6 py-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="Intervu" className="h-7 w-7" />
          <span className="font-semibold text-foreground">Intervu</span>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Progress bar */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{currentIndex + 1}/{totalQuestions}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500"
                style={{ width: `${((currentIndex) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="rounded-2xl border border-border bg-card p-8 shadow-lg">
            {/* Meta */}
            <div className="mb-5 flex items-center gap-2.5">
              <span
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  question.type === "Technical"
                    ? "bg-amber-dim text-amber"
                    : "bg-primary/10 text-primary"
                )}
                style={
                  question.type === "Technical"
                    ? { background: "var(--amber-dim)", color: "var(--amber)" }
                    : undefined
                }
              >
                {question.type}
              </span>
              <span className="text-xs text-muted-foreground">{question.category}</span>
            </div>

            {/* Question text */}
            <p className="mb-8 text-xl font-medium leading-relaxed text-foreground">
              {question.question}
            </p>

            {/* Timer */}
            {recordState !== "idle" && (
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {recordState === "recording" ? "Time remaining" : "Response recorded"}
                  </span>
                  {recordState === "recording" && (
                    <span className="font-mono font-semibold" style={{ color: timerColor }}>
                      {timeLeft}s
                    </span>
                  )}
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${recordState === "recorded" ? 100 : timerPercent}%`,
                      background: recordState === "recorded" ? "var(--primary)" : timerColor,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Recording controls */}
            <div className="flex flex-wrap items-center gap-3">
              {recordState === "idle" && (
                <button
                  onClick={startRecording}
                  className="flex items-center gap-2.5 rounded-xl border border-primary/40 bg-primary/10 px-6 py-3.5 font-medium text-primary transition-all hover:bg-primary/20"
                >
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <Mic size={18} />
                  </div>
                  Start Recording
                </button>
              )}

              {recordState === "recording" && (
                <button
                  onClick={stopRecording}
                  className="flex items-center gap-2.5 rounded-xl bg-destructive/90 px-6 py-3.5 font-medium text-destructive-foreground transition-all hover:bg-destructive"
                >
                  <div className="relative flex h-5 w-5 items-center justify-center">
                    <span className="absolute h-3 w-3 animate-ping rounded-full bg-white opacity-60" />
                    <Square size={14} className="relative fill-white" />
                  </div>
                  Stop Recording
                </button>
              )}

              {recordState === "recorded" && (
                <>
                  <div className="flex items-center gap-2 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm font-medium text-primary">
                    <CheckCircle2 size={16} />
                    Answer Recorded
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={retryAnswer}
                    className="gap-1.5 text-muted-foreground"
                  >
                    <RotateCcw size={14} />
                    Retry
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    size="sm"
                    className="ml-auto gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    {currentIndex < totalQuestions - 1 ? "Next Question" : "Finish Interview"}
                    <ArrowRight size={14} />
                  </Button>
                </>
              )}
            </div>
          </div>

          {/* Tip toggle */}
          <div className="mt-4">
            <button
              onClick={() => setShowTip(!showTip)}
              className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              <Lightbulb size={13} style={{ color: "var(--amber)" }} />
              Interviewer tip
              <ChevronDown
                size={13}
                className={cn("transition-transform", showTip && "rotate-180")}
              />
            </button>
            {showTip && (
              <div className="mt-2 rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                {question.tip}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
