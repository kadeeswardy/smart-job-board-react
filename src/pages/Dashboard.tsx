import { useAuth } from '../context/AuthContext'
import { useAppSelector } from '../store/hooks'

function Dashboard() {
  const { authMode, user } = useAuth()
  const jobs = useAppSelector((state) => state.jobs.jobs)
  const savedJobIds = useAppSelector((state) => state.jobs.savedJobIds)
  const savedJobs = jobs.filter((job) => savedJobIds.includes(job.id))

  const cards = [
    { label: 'Saved roles', value: savedJobs.length.toString() },
    { label: 'Featured roles', value: jobs.filter((job) => job.featured).length.toString() },
    { label: 'Remote roles', value: jobs.filter((job) => job.workMode === 'Remote').length.toString() },
    { label: 'Senior openings', value: jobs.filter((job) => job.level === 'Senior').length.toString() },
  ]

  return (
    <div className="space-y-8 pb-10">
      <section className="panel p-8">
        <span className="pill">Candidate Dashboard</span>
        <h1 className="section-title mt-5">
          {user ? `Welcome back, ${user.name}` : 'Track progress and saved opportunities'}
        </h1>
        <p className="mt-4 max-w-2xl text-slate-600 dark:text-slate-300">
          {authMode === 'firebase'
            ? 'Your authenticated dashboard is active. Next, connect Firestore persistence for user-specific data.'
            : 'You are using demo auth right now. Your dashboard flow works, and Firebase can replace it later without changing the UI.'}
        </p>
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.label} className="panel p-6">
            <p className="text-sm uppercase tracking-[0.22em] text-slate-400 dark:text-slate-500">{card.label}</p>
            <p className="mt-4 text-4xl font-semibold text-slate-950 dark:text-slate-50">{card.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-6">
          <p className="text-lg font-semibold text-slate-950 dark:text-slate-50">Suggested next steps</p>
          <div className="mt-5 space-y-3">
            {[
              'Connect Firebase Auth to protect user dashboards.',
              'Persist saved jobs and applications in Firestore.',
              'Send analyzer requests to a secure Claude backend route.',
              'Add application status updates and recruiter notes.',
            ].map((step, index) => (
              <div key={step} className="flex gap-4 rounded-3xl bg-slate-100 p-4 dark:bg-slate-800">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-bold text-white dark:bg-amber-400 dark:text-slate-950">
                  {index + 1}
                </div>
                <p className="pt-1 text-slate-600 dark:text-slate-300">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex items-center justify-between gap-4">
            <p className="text-lg font-semibold text-slate-950 dark:text-slate-50">Saved jobs</p>
            <span className="pill">{savedJobs.length} tracked</span>
          </div>

          <div className="mt-5 space-y-4">
            {savedJobs.length > 0 ? (
              savedJobs.map((job) => (
                <div
                  key={job.id}
                  className="rounded-[26px] border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950/65"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="text-xl font-semibold text-slate-950 dark:text-slate-50">{job.title}</p>
                      <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        {job.company} - {job.location}
                      </p>
                    </div>
                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
                      {job.matchScore}% match
                    </span>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="rounded-3xl bg-slate-100 px-4 py-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                Save roles from the Jobs page and they will appear here.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
