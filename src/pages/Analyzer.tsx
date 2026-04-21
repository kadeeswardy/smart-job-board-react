import { motion } from 'framer-motion'
import { useState } from 'react'
import { claudeNotes, claudeStatus } from '../lib/claude'

interface AnalysisResult {
  score: number
  matchedKeywords: string[]
  missingKeywords: string[]
  strengths: string[]
  suggestions: string[]
}

const scoringKeywords = [
  'react',
  'typescript',
  'firebase',
  'redux',
  'api',
  'llm',
  'claude',
  'prompt',
  'analytics',
  'testing',
]

function analyzeResume(resumeText: string, targetRole: string): AnalysisResult {
  const normalizedResume = resumeText.toLowerCase()
  const matchedKeywords = scoringKeywords.filter((keyword) =>
    normalizedResume.includes(keyword),
  )
  const missingKeywords = scoringKeywords.filter(
    (keyword) => !normalizedResume.includes(keyword),
  )

  let score = 45
  score += Math.min(matchedKeywords.length * 5, 35)

  if (resumeText.length > 350) {
    score += 8
  }

  if (normalizedResume.includes(targetRole.toLowerCase().split(' ')[0])) {
    score += 6
  }

  score = Math.min(score, 98)

  const strengths = [
    matchedKeywords.length >= 4
      ? 'Good technical coverage for a modern AI product role.'
      : 'The resume has some relevant keywords but needs stronger alignment.',
    resumeText.length > 350
      ? 'The resume has enough context to evaluate experience depth.'
      : 'Add more measurable achievements to improve signal quality.',
  ]

  const suggestions = [
    missingKeywords.length > 0
      ? `Add or strengthen experience around: ${missingKeywords.slice(0, 4).join(', ')}.`
      : 'You already cover the core stack keywords well.',
    'Rewrite bullet points using outcomes, metrics, and shipped project impact.',
    'Tailor the top summary to the exact role you are targeting.',
  ]

  return {
    score,
    matchedKeywords,
    missingKeywords,
    strengths,
    suggestions,
  }
}

function Analyzer() {
  const [targetRole, setTargetRole] = useState('Frontend Engineer, Talent AI')
  const [resumeText, setResumeText] = useState('')
  const [result, setResult] = useState<AnalysisResult | null>(null)

  return (
    <div className="space-y-8 pb-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel p-8"
      >
        <span className="pill">Claude-Ready Analyzer</span>
        <h1 className="section-title mt-5">Score resumes against AI job requirements</h1>
        <p className="mt-4 max-w-3xl text-slate-600 dark:text-slate-300">
          This screen ships with a local scoring simulation now, and a clean place to swap in your
          backend Claude endpoint when ready.
        </p>
      </motion.section>

      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="panel p-6">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Target role</span>
            <input
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              className="field"
            />
          </label>

          <label className="mt-5 block space-y-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Paste resume text</span>
            <textarea
              rows={14}
              value={resumeText}
              onChange={(event) => setResumeText(event.target.value)}
              placeholder="Paste your resume or candidate summary here..."
              className="field min-h-72 rounded-3xl px-4 py-4"
            />
          </label>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setResult(analyzeResume(resumeText, targetRole))}
              className="primary-button rounded-full px-6 py-3 text-sm"
            >
              Analyze now
            </button>
            <button
              type="button"
              onClick={() =>
                setResumeText(
                  'Frontend engineer with 4 years of experience building React and TypeScript products. Worked with Firebase Auth, Firestore, APIs, analytics dashboards, and recruiter workflows. Shipped AI-assisted search features and collaborated on prompt design for LLM-powered candidate evaluation.',
                )
              }
              className="secondary-button rounded-full px-6 py-3 text-sm"
            >
              Load demo sample
            </button>
          </div>
        </div>

        <div className="space-y-5">
          <div className="panel p-6">
            <span className="pill">Integration Status</span>
            <div className="mt-5 rounded-3xl bg-sky-50 p-4 dark:bg-sky-500/10">
              <p className="font-semibold text-sky-900">Claude backend</p>
              <p className="mt-2 text-sm text-sky-800 dark:text-sky-200">
                {claudeStatus.configured
                  ? 'Configured. Replace the local scorer with your API request.'
                  : `Missing ${claudeStatus.missing.join(', ')} in your Vite environment.`}
              </p>
            </div>
            <div className="mt-4 space-y-3">
              {claudeNotes.map((note) => (
                <p
                  key={note}
                  className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                >
                  {note}
                </p>
              ))}
            </div>
          </div>

          {result ? (
            <div className="panel p-6">
              <div className="rounded-[28px] bg-slate-950 p-5 text-white dark:bg-[#10213a] dark:text-slate-100">
                <p className="text-sm uppercase tracking-[0.22em] text-slate-300 dark:text-slate-400">Resume score</p>
                <p className="mt-3 text-5xl font-semibold">{result.score}%</p>
              </div>

              <div className="mt-5 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Matched keywords</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {result.matchedKeywords.map((keyword) => (
                      <span
                        key={keyword}
                        className="rounded-full bg-emerald-100 px-3 py-1 text-sm text-emerald-800"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Strengths</p>
                  <div className="mt-3 space-y-2">
                    {result.strengths.map((strength) => (
                      <p
                        key={strength}
                        className="rounded-2xl bg-slate-100 px-4 py-3 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {strength}
                      </p>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">Suggestions</p>
                  <div className="mt-3 space-y-2">
                    {result.suggestions.map((suggestion) => (
                      <p
                        key={suggestion}
                        className="rounded-2xl bg-orange-50 px-4 py-3 text-sm text-orange-900 dark:bg-amber-500/10 dark:text-amber-200"
                      >
                        {suggestion}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="panel p-6">
              <p className="text-lg font-semibold text-slate-900 dark:text-slate-50">No analysis yet</p>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Paste a resume, choose a role, and run the analyzer to see strengths, keyword match,
                and improvement suggestions.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Analyzer
