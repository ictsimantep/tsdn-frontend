// React Imports
import { useContext } from 'react'

// Context Imports
import { HealthsContext } from '@core/contexts/healthsContext'

export const useHealths = () => {
  // Hooks
  const context = useContext(HealthsContext)

  if (!context) {
    throw new Error('useHealthsContext must be used within a HealthsProvider')
  }

  return context
}
