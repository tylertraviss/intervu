"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface IntakeData {
  currentRole: string
  yearsExperience: string
  industry: string
  targetRole: string
  targetCompanyType: string[]
  strongestSkills: string[]
  weakestAreas: string[]
  interviewWeaknesses: string[]
  leadershipExperience: boolean
  systemDesignExperience: boolean
  shippedProduction: boolean
  careerTimeline: string
  confidenceLevel: number
  userEmail?: string
}

interface InterviewContextType {
  intakeData: IntakeData | null
  setIntakeData: (data: IntakeData) => void
  answeredQuestions: number
  markAnswered: () => void
  resetInterview: () => void
}

const InterviewContext = createContext<InterviewContextType | null>(null)

export function InterviewProvider({ children }: { children: ReactNode }) {
  const [intakeData, setIntakeDataState] = useState<IntakeData | null>(null)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("interviewai_intake")
      if (saved) setIntakeDataState(JSON.parse(saved))
      const savedAnswers = sessionStorage.getItem("interviewai_answers")
      if (savedAnswers) setAnsweredQuestions(parseInt(savedAnswers, 10))
    } catch {
      // sessionStorage not available
    }
  }, [])

  const setIntakeData = (data: IntakeData) => {
    try {
      sessionStorage.setItem("interviewai_intake", JSON.stringify(data))
    } catch {
      // ignore
    }
    setIntakeDataState(data)
  }

  const markAnswered = () => {
    setAnsweredQuestions((prev) => {
      const next = prev + 1
      try {
        sessionStorage.setItem("interviewai_answers", String(next))
      } catch {
        // ignore
      }
      return next
    })
  }

  const resetInterview = () => {
    setAnsweredQuestions(0)
    try {
      sessionStorage.removeItem("interviewai_answers")
    } catch {
      // ignore
    }
  }

  return (
    <InterviewContext.Provider
      value={{ intakeData, setIntakeData, answeredQuestions, markAnswered, resetInterview }}
    >
      {children}
    </InterviewContext.Provider>
  )
}

export function useInterview() {
  const ctx = useContext(InterviewContext)
  if (!ctx) throw new Error("useInterview must be used within InterviewProvider")
  return ctx
}
