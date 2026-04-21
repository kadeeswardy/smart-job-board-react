const publicClaudeKeys = ['VITE_APP_API_URL', 'VITE_CLAUDE_MODEL'] as const

export const claudeStatus = {
  configured: publicClaudeKeys.every((key) => {
    const value = import.meta.env[key]
    return typeof value === 'string' && value.trim().length > 0
  }),
  missing: publicClaudeKeys.filter((key) => {
    const value = import.meta.env[key]
    return typeof value !== 'string' || value.trim().length === 0
  }),
}

export const claudeNotes = [
  'Keep the Anthropic API key on the server, not in the Vite client.',
  'Expose a safe backend endpoint like /api/analyze-resume for the frontend.',
  'Store the active public model name in VITE_CLAUDE_MODEL for UI display.',
]
