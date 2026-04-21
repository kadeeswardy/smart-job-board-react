import { motion } from 'framer-motion'
import type { Job } from '../types/job'

interface JobCardProps {
  job: Job
  isSaved: boolean
  onToggleSave: (jobId: string) => void
}

function JobCard({ job, isSaved, onToggleSave }: JobCardProps) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel flex h-full flex-col gap-5 p-6"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="pill">{job.workMode}</span>
            <span className="pill">{job.level}</span>
          </div>
          <h3 className="text-2xl font-semibold text-slate-950 dark:text-slate-50">{job.title}</h3>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            {job.company} - {job.location}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onToggleSave(job.id)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            isSaved
              ? 'bg-orange-500 text-white hover:bg-orange-600 dark:bg-amber-400 dark:text-slate-950 dark:hover:bg-amber-300'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          {isSaved ? 'Saved' : 'Save'}
        </button>
      </div>

      <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{job.description}</p>

      <div className="flex flex-wrap gap-2">
        {job.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-auto grid gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400 sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Salary</p>
          <p className="mt-1 font-medium text-slate-700 dark:text-slate-200">{job.salary}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Posted</p>
          <p className="mt-1 font-medium text-slate-700 dark:text-slate-200">{job.postedAt}</p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">AI Match</p>
          <p className="mt-1 font-medium text-emerald-700">{job.matchScore}% match</p>
        </div>
      </div>
    </motion.article>
  )
}

export default JobCard
