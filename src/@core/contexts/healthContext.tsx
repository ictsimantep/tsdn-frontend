'use client'

// React Imports
import type { ReactNode } from 'react'
import { createContext, useMemo, useState } from 'react'

// Type Imports
import type { Mode, Skin, Layout, LayoutComponentWidth } from '@core/types'

// Config Imports
import themeConfig from '@configs/themeConfig'
import primaryColorConfig from '@configs/primaryColorConfig'

// Hook Imports
import { useObjectCookie } from '@core/hooks/useObjectCookie'

// Health type
export type Health = {
  mode?: Mode
  skin?: Skin
  semiDark?: boolean
  layout?: Layout
  navbarContentWidth?: LayoutComponentWidth
  contentWidth?: LayoutComponentWidth
  footerContentWidth?: LayoutComponentWidth
  primaryColor?: string
}

// UpdateHealthOptions type
type UpdateHealthOptions = {
  updateCookie?: boolean
}

// HealthContextProps type
type HealthContextProps = {
  health: Health
  updateHealth: (health: Partial<Health>, options?: UpdateHealthOptions) => void
  isHealthChanged: boolean
  resetHealth: () => void
  updatePageHealth: (health: Partial<Health>) => () => void
}

type Props = {
  children: ReactNode
  healthCookie: Health | null
  mode?: Mode
}

// Initial Health Context
export const HealthContext = createContext<HealthContextProps | null>(null)

// Health Provider
export const HealthProvider = (props: Props) => {
  // Initial Health
  const initialHealth: Health = {
    mode: themeConfig.mode,
    skin: themeConfig.skin,
    semiDark: themeConfig.semiDark,
    layout: themeConfig.layout,
    navbarContentWidth: themeConfig.navbar.contentWidth,
    contentWidth: themeConfig.contentWidth,
    footerContentWidth: themeConfig.footer.contentWidth,
    primaryColor: primaryColorConfig[0].main
  }

  const updatedInitialHealth = {
    ...initialHealth,
    mode: props.mode || themeConfig.mode
  }

  // Cookies
  const [healthCookie, updateHealthCookie] = useObjectCookie<Health>(
    themeConfig.healthCookieName,
    JSON.stringify(props.healthCookie) !== '{}' ? props.healthCookie : updatedInitialHealth
  )

  // State
  const [_healthState, _updateHealthState] = useState<Health>(
    JSON.stringify(healthCookie) !== '{}' ? healthCookie : updatedInitialHealth
  )

  const updateHealth = (health: Partial<Health>, options?: UpdateHealthOptions) => {
    const { updateCookie = true } = options || {}

    _updateHealthState(prev => {
      const newHealth = { ...prev, ...health }

      // Update cookie if needed
      if (updateCookie) updateHealthCookie(newHealth)

      return newHealth
    })
  }

  /**
   * Updates the health for page with the provided health object.
   * Updated health won't be saved to cookie hence will be reverted once navigating away from the page.
   *
   * @param health - The partial health object containing the properties to update.
   * @returns A function to reset the page health.
   *
   * @example
   * useEffect(() => {
   *     return updatePageHealth({ theme: 'dark' });
   * }, []);
   */
  const updatePageHealth = (health: Partial<Health>): (() => void) => {
    updateHealth(health, { updateCookie: false })

    // Returns a function to reset the page health
    return () => updateHealth(healthCookie, { updateCookie: false })
  }

  const resetHealth = () => {
    updateHealth(initialHealth)
  }

  const isHealthChanged = useMemo(
    () => JSON.stringify(initialHealth) !== JSON.stringify(_healthState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_healthState]
  )

  return (
    <HealthContext.Provider
      value={{
        health: _healthState,
        updateHealth,
        isHealthChanged,
        resetHealth,
        updatePageHealth
      }}
    >
      {props.children}
    </HealthContext.Provider>
  )
}
