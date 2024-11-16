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

// Healths type
export type Healths = {
  mode?: Mode
  skin?: Skin
  semiDark?: boolean
  layout?: Layout
  navbarContentWidth?: LayoutComponentWidth
  contentWidth?: LayoutComponentWidth
  footerContentWidth?: LayoutComponentWidth
  primaryColor?: string
}

// UpdateHealthsOptions type
type UpdateHealthsOptions = {
  updateCookie?: boolean
}

// HealthsContextProps type
type HealthsContextProps = {
  healths: Healths
  updateHealths: (healths: Partial<Healths>, options?: UpdateHealthsOptions) => void
  isHealthsChanged: boolean
  resetHealths: () => void
  updatePageHealths: (healths: Partial<Healths>) => () => void
}

type Props = {
  children: ReactNode
  healthsCookie: Healths | null
  mode?: Mode
}

// Initial Healths Context
export const HealthsContext = createContext<HealthsContextProps | null>(null)

// Healths Provider
export const HealthsProvider = (props: Props) => {
  // Initial Healths
  const initialHealths: Healths = {
    mode: themeConfig.mode,
    skin: themeConfig.skin,
    semiDark: themeConfig.semiDark,
    layout: themeConfig.layout,
    navbarContentWidth: themeConfig.navbar.contentWidth,
    contentWidth: themeConfig.contentWidth,
    footerContentWidth: themeConfig.footer.contentWidth,
    primaryColor: primaryColorConfig[0].main
  }

  const updatedInitialHealths = {
    ...initialHealths,
    mode: props.mode || themeConfig.mode
  }

  // Cookies
  const [healthsCookie, updateHealthsCookie] = useObjectCookie<Healths>(
    themeConfig.healthsCookieName,
    JSON.stringify(props.healthsCookie) !== '{}' ? props.healthsCookie : updatedInitialHealths
  )

  // State
  const [_healthsState, _updateHealthsState] = useState<Healths>(
    JSON.stringify(healthsCookie) !== '{}' ? healthsCookie : updatedInitialHealths
  )

  const updateHealths = (healths: Partial<Healths>, options?: UpdateHealthsOptions) => {
    const { updateCookie = true } = options || {}

    _updateHealthsState(prev => {
      const newHealths = { ...prev, ...healths }

      // Update cookie if needed
      if (updateCookie) updateHealthsCookie(newHealths)

      return newHealths
    })
  }

  /**
   * Updates the healths for page with the provided healths object.
   * Updated healths won't be saved to cookie hence will be reverted once navigating away from the page.
   *
   * @param healths - The partial healths object containing the properties to update.
   * @returns A function to reset the page healths.
   *
   * @example
   * useEffect(() => {
   *     return updatePageHealths({ theme: 'dark' });
   * }, []);
   */
  const updatePageHealths = (healths: Partial<Healths>): (() => void) => {
    updateHealths(healths, { updateCookie: false })

    // Returns a function to reset the page healths
    return () => updateHealths(healthsCookie, { updateCookie: false })
  }

  const resetHealths = () => {
    updateHealths(initialHealths)
  }

  const isHealthsChanged = useMemo(
    () => JSON.stringify(initialHealths) !== JSON.stringify(_healthsState),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [_healthsState]
  )

  return (
    <HealthsContext.Provider
      value={{
        healths: _healthsState,
        updateHealths,
        isHealthsChanged,
        resetHealths,
        updatePageHealths
      }}
    >
      {props.children}
    </HealthsContext.Provider>
  )
}
