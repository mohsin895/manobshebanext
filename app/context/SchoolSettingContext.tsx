'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

type TimelineKey = 1 | 2 | 3 | 4 | 5 | 6

type SchoolSetting = {
  id: number
  status: string
  applicationStart: string
  examStart: string
  maxStudents: number | null
  examTime: string | null
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

  useEffect(() => {
    // NOTE: no "fetch once" ref guard here. In React 18 StrictMode (dev only),
    // this effect intentionally runs mount -> cleanup -> mount. The
    // AbortController below already cancels the first (throwaway) request on
    // cleanup, and the second mount fires a clean one that completes normally.
    // A ref that blocks re-running this effect breaks that pattern: the first
    // request gets aborted, and the guard then prevents the second, real
    // request from ever starting — so `loading` never resolves.
    const controller = new AbortController()

    const fetchSetting = async () => {
      setLoading(true)
      setError(null)

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
        // Don't flip loading to false if this request was aborted — the
        // follow-up request (StrictMode's second mount, or any future
        // re-fetch) owns that responsibility instead.
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    fetchSetting()

    return () => controller.abort()
  }, [])

  return <SchoolSettingContext.Provider value={{ setting, loading, error }}>{children}</SchoolSettingContext.Provider>
}

export function useSchoolSetting() {
  const ctx = useContext(SchoolSettingContext)
  if (!ctx) throw new Error('useSchoolSetting must be used within a SchoolSettingProvider')
  return ctx
}
