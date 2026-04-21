import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import JobCard from '../components/JobCard'
import { useAuth } from '../context/AuthContext'
import { claudeStatus } from '../lib/claude'
import { firebaseStatus } from '../lib/firebase'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { toggleSavedJob } from '../store/jobsSlice'

const highlights = [
  'Discover AI-focused roles from startups and product teams.',
  'Analyze resumes with a Claude-ready workflow.',
  'Save opportunities and track your personal pipeline.',
]

function Home() {
  const { user } = useAuth()
  const dispatch = useAppDispatch()
  const jobs = useAppSelector((state) => state.jobs.jobs)
  const savedJobIds = useAppSelector((state) => state.jobs.savedJobIds)
  const featuredJobs = jobs.filter((job) => job.featured).slice(0, 3)

  const stats = [
    { label: 'Open AI Roles', value: `${jobs.length}+` },
    { label: 'Saved Positions', value: savedJobIds.length.toString() },
    { label: 'Remote Friendly', value: `${jobs.filter((job) => job.workMode === 'Remote').length}` },
  ]

  return (
    <div className="space-y-14 pb-10">
      <section className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="panel overflow-hidden p-8 md:p-10"
        >
          <span className="pill">AI Hiring Platform</span>
          <h1 className="mt-6 max-w-3xl text-5xl font-semibold leading-tight text-slate-950 dark:text-slate-50 md:text-6xl">
            Launch a smarter job board for AI talent with React, Firebase, and Claude.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            This starter gives you a polished frontend, typed job data, Redux-powered filters,
            and clear integration points for Auth, Firestore, and AI resume analysis.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={user ? '/dashboard' : '/jobs'}
              className="primary-button rounded-full px-6 py-3 text-sm"
            >
              {user ? 'Open dashboard' : 'Browse jobs'}
            </Link>
            <Link
              to="/analyzer"
              className="secondary-button rounded-full px-6 py-3 text-sm"
            >
              Try resume analyzer
            </Link>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-3xl bg-slate-950 px-5 py-5 text-white dark:bg-[#12233b] dark:text-slate-100"
              >
                <p className="text-sm uppercase tracking-[0.24em] text-slate-300 dark:text-slate-400">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <div className="panel p-6">
            <span className="pill">Project Flow</span>
            <div className="mt-5 space-y-4">
              {highlights.map((item, index) => (
                <div key={item} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-orange-500 text-sm font-bold text-white dark:bg-amber-400 dark:text-slate-950">
                    0{index + 1}
                  </div>
                  <p className="pt-1 text-slate-600 dark:text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <span className="pill">Integrations</span>
            <div className="mt-5 space-y-4">
              <div className="rounded-3xl bg-emerald-50 p-4 dark:bg-emerald-500/10">
                <p className="font-semibold text-emerald-900">Firebase setup</p>
                <p className="mt-2 text-sm text-emerald-800 dark:text-emerald-200">
                  {firebaseStatus.configured
                    ? 'Configured and ready to power Auth + Firestore.'
                    : `Missing ${firebaseStatus.missing.length} environment value(s).`}
                </p>
              </div>
              <div className="rounded-3xl bg-sky-50 p-4 dark:bg-sky-500/10">
                <p className="font-semibold text-sky-900">Claude workflow</p>
                <p className="mt-2 text-sm text-sky-800 dark:text-sky-200">
                  {claudeStatus.configured
                    ? 'Frontend is ready to call your backend analysis endpoint.'
                    : 'Add your public backend URL and chosen model name to finish the hookup.'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="pill">Featured Jobs</span>
            <h2 className="section-title mt-4">High-signal AI opportunities</h2>
          </div>
          <Link
            to="/jobs"
            className="text-sm font-semibold text-slate-700 hover:text-slate-950 dark:text-slate-300 dark:hover:text-slate-50"
          >
            View all jobs {'->'}
          </Link>
        </div>

        <div className="grid gap-6 xl:grid-cols-3">
          {featuredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              onToggleSave={(jobId) => dispatch(toggleSavedJob(jobId))}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home
