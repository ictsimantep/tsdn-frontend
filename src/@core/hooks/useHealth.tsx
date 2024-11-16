// React Imports
import { useContext } from 'react'

// Context Imports
import { HealthContext } from '@core/contexts/healthContext'

export const useHealth = () => {
  // Hooks
  const context = useContext(HealthContext)

  if (!context) {
    throw new Error('useHealthContext must be used within a HealthProvider')
  }

  return context
}
