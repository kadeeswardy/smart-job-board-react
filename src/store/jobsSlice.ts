import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { mockJobs } from '../data/mockJobs'
import type { ExperienceLevel, JobFilters, WorkMode } from '../types/job'

interface JobsState {
  jobs: typeof mockJobs
  filters: JobFilters
  savedJobIds: string[]
}

const initialState: JobsState = {
  jobs: mockJobs,
  filters: {
    search: '',
    location: 'All',
    level: 'All',
    workMode: 'All',
  },
  savedJobIds: ['job-002', 'job-004'],
}

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload
    },
    setLocation(state, action: PayloadAction<string>) {
      state.filters.location = action.payload
    },
    setLevel(state, action: PayloadAction<'All' | ExperienceLevel>) {
      state.filters.level = action.payload
    },
    setWorkMode(state, action: PayloadAction<'All' | WorkMode>) {
      state.filters.workMode = action.payload
    },
    resetFilters(state) {
      state.filters = initialState.filters
    },
    toggleSavedJob(state, action: PayloadAction<string>) {
      const jobId = action.payload

      if (state.savedJobIds.includes(jobId)) {
        state.savedJobIds = state.savedJobIds.filter((id) => id !== jobId)
        return
      }

      state.savedJobIds.push(jobId)
    },
  },
})

export const {
  resetFilters,
  setLevel,
  setLocation,
  setSearch,
  setWorkMode,
  toggleSavedJob,
} = jobsSlice.actions

export default jobsSlice.reducer
