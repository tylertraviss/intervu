export const INTERVIEW_QUESTIONS = [
  {
    id: 1,
    type: "Behavioral",
    category: "Problem Solving",
    question:
      "Tell me about a time when you had to debug a complex issue in a production environment. Walk me through your process — how did you identify the root cause, what tools did you use, and what did you learn from it?",
    tip: "Use the STAR method: Situation, Task, Action, Result. Be specific about the tools and steps.",
  },
  {
    id: 2,
    type: "Technical",
    category: "System Design",
    question:
      "How would you design a URL shortening service like bit.ly? Walk me through the core components — the data model, the hashing strategy, how you'd handle redirects at scale, and any trade-offs you'd consider.",
    tip: "Start with requirements, then cover: data storage, ID generation, caching, and scalability concerns.",
  },
  {
    id: 3,
    type: "Behavioral",
    category: "Collaboration",
    question:
      "Describe a situation where you disagreed with a teammate or senior engineer on a technical approach. How did you handle the disagreement, what was the outcome, and what would you do differently in hindsight?",
    tip: "Focus on respectful communication, data-driven reasoning, and showing you can compromise while maintaining quality.",
  },
]

export const MOCK_RESULTS = {
  overallScore: 74,
  scores: {
    communication: 78,
    storytelling: 71,
    technicalExplanation: 82,
    answerStructure: 68,
    interviewerPerception: 73,
  },
  interviewerSummary:
    "This candidate demonstrates solid foundational knowledge and genuine curiosity about engineering challenges. Their technical answers show real-world experience, though responses could be more structured and concise. The candidate would likely advance past a phone screen at a mid-tier tech company but may need polish for top-tier FAANG loops. There's clear potential — the fundamentals are there, the signal just needs stronger framing.",
  strengths: [
    "Shows genuine hands-on experience with debugging and production systems",
    "Able to reason through system design trade-offs at a high level",
    "Uses concrete examples rather than vague platitudes",
  ],
  weaknesses: [
    "Answers often start with context overload before reaching the point",
    "System design answer lacks depth on failure modes and edge cases",
    "Behavioral responses don't consistently quantify impact or outcomes",
  ],
  communicationFeedback:
    "Your verbal communication is clear and confident, but you tend to frontload responses with background context before addressing the core question. Interviewers at top companies are pattern-matching for signal quickly — lead with your conclusion or result, then provide context. Practice the 'headline first' technique: state your answer in one sentence, then elaborate.",
  roadmap: {
    topImprovements: [
      {
        area: "Answer Structure (STAR Framework)",
        description:
          "Your behavioral answers meander before reaching the point. Practice writing STAR-structured answers and then delivering them conversationally.",
        priority: "High",
      },
      {
        area: "System Design Depth",
        description:
          "Surface-level design answers need to go deeper on failure handling, consistency trade-offs, and capacity estimates.",
        priority: "High",
      },
      {
        area: "Quantifying Impact",
        description:
          "Most stories lack numbers. Go back through your experience and add concrete metrics: latency improved by X%, reduced incidents by Y per month.",
        priority: "Medium",
      },
    ],
    sevenDayPlan: [
      { day: "Day 1–2", task: "Write out 5 STAR stories from past experience. Focus on debug, collaboration, and ownership stories." },
      { day: "Day 3", task: "Record yourself answering 3 behavioral questions. Watch playback and identify filler words and structure gaps." },
      { day: "Day 4–5", task: "Study system design fundamentals: consistent hashing, CAP theorem, DB indexing, and caching strategies." },
      { day: "Day 6", task: "Do a full mock design session for a rate limiter or notification service. Time-box to 45 minutes." },
      { day: "Day 7", task: "Re-record your 3 interview answers from Day 3. Compare and note measurable improvements." },
    ],
    thirtyDayPlan: [
      {
        week: "Week 1",
        focus: "Behavioral Bank",
        actions: [
          "Build a library of 10 STAR stories covering all major competencies",
          "Map each story to multiple question types",
          "Practice 2 stories per day with a friend or recording",
        ],
      },
      {
        week: "Week 2",
        focus: "System Design Foundations",
        actions: [
          "Read 'Designing Data-Intensive Applications' chapters 1–4",
          "Complete 3 system design mock sessions (URL shortener, chat app, feed)",
          "Study real architecture posts on the Engineering blogs of Stripe, Cloudflare, and Shopify",
        ],
      },
      {
        week: "Week 3",
        focus: "Technical Communication",
        actions: [
          "Practice explaining 3 technical concepts to a non-engineer",
          "Do 5 LeetCode medium problems, but focus on narrating your thought process aloud",
          "Read 'The Staff Engineer's Path' chapter on technical leadership",
        ],
      },
      {
        week: "Week 4",
        focus: "Full Loop Simulation",
        actions: [
          "Complete 2 full mock interview loops with peers or a service",
          "Get written feedback and revise your weakest answer category",
          "Apply to 5–10 target companies to create real urgency and feedback loops",
        ],
      },
    ],
  },
}
