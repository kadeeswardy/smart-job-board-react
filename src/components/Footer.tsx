import { motion } from 'framer-motion'

interface FooterProps {
  authMode: string
}

function Footer({ authMode }: FooterProps) {
  const technologies = [
    { name: 'Vite', icon: '⚡' },
    { name: 'React', icon: '⚛️' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Tailwind', icon: '🎨' },
    { name: 'Firebase', icon: '🔥' },
    { name: 'Claude', icon: '🤖' },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="mx-auto w-full max-w-7xl px-4 pb-8 pt-8 sm:px-6 lg:px-8">
      <div className="panel flex flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 md:px-8">
        {/* Tech Stack Section - Responsive */}
        <motion.div
          className="flex flex-col gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-600 dark:text-slate-300">
            Built with
          </h3>
          <motion.div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 lg:gap-3"
            variants={containerVariants}
          >
            {technologies.map((tech) => (
              <motion.div
                key={tech.name}
                className="flex flex-col items-center gap-2 rounded-lg border border-slate-200/50 bg-white/50 px-2 py-3 transition hover:bg-slate-50 dark:border-slate-700/50 dark:bg-slate-900/30 dark:hover:bg-slate-800/50 sm:px-3 sm:py-4"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <span className="text-2xl sm:text-3xl">{tech.icon}</span>
                <span className="text-xs font-medium text-slate-600 dark:text-slate-300 sm:text-sm">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700" />

        {/* Info Section - Responsive */}
        <motion.div
          className="flex flex-col gap-3 sm:gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Built with Vite, React, TypeScript, Redux Toolkit, Tailwind, Firebase, and Framer Motion.
          </p>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            {authMode === 'firebase'
              ? 'Firebase auth is active. Next step: connect Firestore and a secure Claude endpoint.'
              : 'Demo auth is active. Add Firebase env keys to switch this to production auth.'}
          </p>
        </motion.div>

        {/* Footer Bottom - Responsive */}
        <motion.div
          className="flex flex-col items-center gap-4 pt-4 text-center sm:flex-row sm:justify-between sm:pt-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs text-slate-500 dark:text-slate-500">
            © 2024 AI Job Board. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6">
            <a
              href="#"
              className="text-xs text-slate-500 transition hover:text-slate-700 dark:hover:text-slate-300"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 transition hover:text-slate-700 dark:hover:text-slate-300"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-xs text-slate-500 transition hover:text-slate-700 dark:hover:text-slate-300"
            >
              Contact
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
