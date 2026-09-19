'use client'

import { useEffect, useState } from 'react'
import type { FundCampaign } from '@/types/fundCampaign'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

// bn -> language_id 1, en -> language_id 2 (same convention as /scholarship-info)
const LANGUAGE_ID_MAP: Record<string, number> = {
  bn: 1,
  en: 2,
}

export function useFeaturedCampaign(language: string) {
  const [campaign, setCampaign] = useState<FundCampaign | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setIsLoading(true)

    const languageId = LANGUAGE_ID_MAP[language] ?? 1
    const params = new URLSearchParams({ language_id: String(languageId) })

    fetch(`${API_BASE_URL}/fund-campaigns/featured?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    })
      .then(res => (res.ok ? res.json() : null))
      .then(json => {
        if (!cancelled && json) setCampaign(json)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [language])

  return { campaign, isLoading }
}
