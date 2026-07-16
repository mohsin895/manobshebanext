'use client'

import { createContext, useContext, useEffect, useRef, useState, ReactNode } from 'react'

type TimelineKey = 1 | 2 | 3 | 4 | 5 | 6

type SchoolSetting = {
  id: number
  status: string
  created_at: string
  updated_at: string
} & {
  [K in TimelineKey as `timeline${K}_date`]: string | null
} & {
  [K in TimelineKey as `timeline${K}_title`]: string | null
} & {
  [K in TimelineKey as `timeline${K}_icon`]: string | null
}

type SchoolSettingContextValue = {
  setting: SchoolSetting | null
  loading: boolean
  error: string | null
}

const SchoolSettingContext = createContext<SchoolSettingContextValue>({
  setting: null,
  loading: true,
  error: null,
})

export function SchoolSettingProvider({ children }: { children: ReactNode }) {
  const [setting, setSetting] = useState<SchoolSetting | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // guards against setting state after unmount / re-fetch races
  const hasFetchedRef = useRef(false)

  useEffect(() => {
    // Only fetch once for the lifetime of the app (StrictMode-safe)
    if (hasFetchedRef.current) return
    hasFetchedRef.current = true

    const controller = new AbortController()

    const fetchSetting = async () => {
      try {
        const token = localStorage.getItem('token')

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/school-setting`, {
          headers: {
            Accept: 'application/json',
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          signal: controller.signal,
        })

        if (!res.ok) throw new Error('Failed to load school setting')

        const json = await res.json()
        setSetting(json.data)
      } catch (err) {
        // Ignore abort errors — they happen on intentional cleanup, not real failures
        if (err instanceof DOMException && err.name === 'AbortError') return
        console.error('Failed to fetch school-setting:', err)
        setError('সেটিংস লোড করা যায়নি')
      } finally {
        setLoading(false)
      }
    }

    fetchSetting()

    // "stop the system" — cancel the in-flight request if the provider unmounts
    return () => controller.abort()
  }, [])

  return <SchoolSettingContext.Provider value={{ setting, loading, error }}>{children}</SchoolSettingContext.Provider>
}

export function useSchoolSetting() {
  const ctx = useContext(SchoolSettingContext)
  if (!ctx) throw new Error('useSchoolSetting must be used within a SchoolSettingProvider')
  return ctx
}
