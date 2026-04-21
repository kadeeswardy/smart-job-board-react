import { motion } from 'framer-motion'
import JobCard from '../components/JobCard'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  resetFilters,
  setLevel,
  setLocation,
  setSearch,
  setWorkMode,
  toggleSavedJob,
} from '../store/jobsSlice'
import type { ExperienceLevel, WorkMode } from '../types/job'

function Jobs() {
  const dispatch = useAppDispatch()
  const jobs = useAppSelector((state) => state.jobs.jobs)
  const filters = useAppSelector((state) => state.jobs.filters)
  const savedJobIds = useAppSelector((state) => state.jobs.savedJobIds)

  const locations = ['All', ...new Set(jobs.map((job) => job.location))]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      filters.search.trim().length === 0 ||
      `${job.title} ${job.company} ${job.tags.join(' ')} ${job.description}`
        .toLowerCase()
        .includes(filters.search.toLowerCase())

    const matchesLocation = filters.location === 'All' || job.location === filters.location
    const matchesLevel = filters.level === 'All' || job.level === filters.level
    const matchesWorkMode = filters.workMode === 'All' || job.workMode === filters.workMode

    return matchesSearch && matchesLocation && matchesLevel && matchesWorkMode
  })

  return (
    <div className="space-y-8 pb-10">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="panel p-8"
      >
        <span className="pill">Jobs Explorer</span>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="section-title">Find roles that fit your AI stack</h1>
            <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
              Filter by location, seniority, and work mode. Redux keeps the search state
              consistent across the app and ready for future Firestore sync.
            </p>
          </div>
          <div className="rounded-3xl bg-slate-950 px-5 py-4 text-white dark:bg-[#12233b] dark:text-slate-100">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-300 dark:text-slate-400">Results</p>
            <p className="mt-2 text-3xl font-semibold">{filteredJobs.length}</p>
          </div>
        </div>
      </motion.section>

      <section className="panel p-6">
        <div className="grid gap-4 lg:grid-cols-[2fr_repeat(3,1fr)_auto]">
          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Search</span>
            <input
              value={filters.search}
              onChange={(event) => dispatch(setSearch(event.target.value))}
              placeholder="React, Firebase, Claude, recruiter tools..."
              className="field"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Location</span>
            <select
              value={filters.location}
              onChange={(event) => dispatch(setLocation(event.target.value))}
              className="field"
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Level</span>
            <select
              value={filters.level}
              onChange={(event) =>
                dispatch(setLevel(event.target.value as 'All' | ExperienceLevel))
              }
              className="field"
            >
              {['All', 'Junior', 'Mid', 'Senior'].map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">Work mode</span>
            <select
              value={filters.workMode}
              onChange={(event) =>
                dispatch(setWorkMode(event.target.value as 'All' | WorkMode))
              }
              className="field"
            >
              {['All', 'Remote', 'Hybrid', 'On-site'].map((workMode) => (
                <option key={workMode} value={workMode}>
                  {workMode}
                </option>
              ))}
            </select>
          </label>

          <button
            type="button"
            onClick={() => dispatch(resetFilters())}
            className="secondary-button"
          >
            Reset
          </button>
        </div>
      </section>

      {filteredJobs.length > 0 ? (
        <section className="grid gap-6 xl:grid-cols-2">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isSaved={savedJobIds.includes(job.id)}
              onToggleSave={(jobId) => dispatch(toggleSavedJob(jobId))}
            />
          ))}
        </section>
      ) : (
        <section className="panel p-10 text-center">
          <p className="text-xl font-semibold text-slate-900 dark:text-slate-50">No jobs match these filters yet.</p>
          <p className="mt-3 text-slate-600 dark:text-slate-300">Try broadening the search or resetting the filters.</p>
        </section>
      )}
    </div>
  )
}

export default Jobs
