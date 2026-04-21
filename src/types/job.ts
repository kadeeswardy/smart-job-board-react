export type JobType = 'Full-time' | 'Part-time' | 'Contract'
export type WorkMode = 'Remote' | 'Hybrid' | 'On-site'
export type ExperienceLevel = 'Junior' | 'Mid' | 'Senior'

export interface Job {
  id: string
  title: string
  company: string
  location: string
  type: JobType
  workMode: WorkMode
  level: ExperienceLevel
  salary: string
  postedAt: string
  matchScore: number
  featured?: boolean
  description: string
  tags: string[]
}

export interface JobFilters {
  search: string
  location: string
  level: 'All' | ExperienceLevel
  workMode: 'All' | WorkMode
}
