'use client'

import { useEffect, useMemo, useState } from 'react'
import { School, Users2, Award, Star, Wallet, Filter, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'

const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
function toBn(input: number | string) {
  return String(input).replace(/[0-9]/g, d => bnDigits[Number(d)])
}
function toBnNumber(n: number) {
  return toBn(n.toLocaleString('en-IN'))
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
const IMAGE_BASE = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

type Stat = {
  label: string
  unit: string
  value: number
  icon: React.ElementType
  iconBg: string
  iconColor: string
  bgColor: string
}

// Shape returned by GET {API_BASE}/school-achievement
type ApiSchool = {
  id: number
  name: string
  enname?: string | null
  headname?: string | null
  logo?: string | null
  address?: string | null
  division_id?: string | null
  district_id?: string | null
  upazila_id?: string | null
  zone_id?: string | null
  status?: string | null
  // The endpoint currently only returns institution/profile fields.
  // Result & scholarship counts aren't part of this response yet, so
  // we read them defensively in case the backend adds them later.
  enrolled?: number | null
  totalResult?: number | null
  scholarship?: number | null
  avgResult?: number | null
}

type ApiResponse = {
  status: boolean
  message: string
  data: ApiSchool[]
}

type Institution = {
  serial: number
  id: number
  name: string
  logo?: string | null
  enrolled: number | null
  totalResult: number | null
  scholarship: number | null
  avgResult: number | null
}

const SESSIONS = ['২০২৪', '২০২৩', '২০২২', '২০২১']
const PAGE_SIZE_OPTIONS = [
  { label: '১০', value: 10 },
  { label: '২৫', value: 25 },
  { label: '৫০', value: 50 },
]

function StatCard({ stat }: { stat: Stat }) {
  const Icon = stat.icon
  return (
    <div className={`flex flex-1 min-w-[150px]  items-center gap-2 rounded-xl ${stat.bgColor}  px-5 py-5 text-center shadow-sm ring-1 ring-black/5`}>
      <div className={`flex h-11 w-11 items-center justify-center rounded-full ${stat.iconBg} ${stat.iconColor}`}>
        <Icon className='h-5 w-5' strokeWidth={2} />
      </div>
      <div>
        <div className='text-sm text-slate-500'>{stat.label}</div>
        <div className='text-xl font-semibold text-slate-800 tabular-nums'>{toBnNumber(stat.value)}</div>
        <div className='text-xs text-slate-400'>{stat.unit}</div>
      </div>
    </div>
  )
}

function fmt(n: number | null | undefined) {
  return n === null || n === undefined ? '—' : toBnNumber(n)
}

export function AchievementHero() {
  const [session, setSession] = useState(SESSIONS[0])
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0].value)
  const [page, setPage] = useState(1)

  const [schools, setSchools] = useState<ApiSchool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${API_BASE}/school-achievement`, {
          headers: { Accept: 'application/json' },
        })
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }
        const json: ApiResponse = await res.json()
        if (!json.status) {
          throw new Error(json.message || 'Request failed')
        }
        if (!cancelled) {
          setSchools(json.data ?? [])
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Something went wrong')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
    // Re-fetch when the session filter changes (backend can add ?session= later)
  }, [session])

  const institutions: Institution[] = useMemo(
    () =>
      schools.map((s, idx) => ({
        serial: idx + 1,
        id: s.id,
        name: s.name,
        logo: s.logo,
        enrolled: s.enrolled ?? null,
        totalResult: s.totalResult ?? null,
        scholarship: s.scholarship ?? null,
        avgResult: s.avgResult ?? null,
      })),
    [schools]
  )

  const totalSchools = schools.length
  const totalPages = Math.max(1, Math.ceil(totalSchools / pageSize))
  const currentPage = Math.min(page, totalPages)

  const pageRows = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return institutions.slice(start, start + pageSize)
  }, [institutions, currentPage, pageSize])

  const pageNumbers = useMemo(() => {
    const nums: number[] = []
    for (let p = 1; p <= Math.min(3, totalPages); p++) nums.push(p)
    return nums
  }, [totalPages])

  // Aggregate stats derived from the live school list. Fields the API
  // doesn't return yet (participation/scholarship counts) fall back to 0
  // until the backend response is extended.
  const stats: Stat[] = [
    { label: 'স্কুল', unit: 'টি স্কুল', value: totalSchools, icon: School, iconBg: 'bg-blue-100', bgColor: 'bg-[#D1FAE5]', iconColor: 'text-blue-600' },
    {
      label: 'শিক্ষার্থী অংশগ্রহণ',
      unit: 'জন',
      value: institutions.reduce((sum, i) => sum + (i.enrolled ?? 0), 0),
      icon: Users2,
      iconBg: 'bg-slate-100',
      bgColor: 'bg-[#FEF3C7]',
      iconColor: 'text-slate-500',
    },
    {
      label: 'সাধারণ বৃত্তি',
      unit: 'জন',
      value: institutions.reduce((sum, i) => sum + (i.totalResult ?? 0), 0),
      icon: Award,
      iconBg: 'bg-orange-100',
      bgColor: 'bg-[#F3E8FF]',
      iconColor: 'text-orange-500',
    },
    {
      label: 'ট্যালেন্টপুল',
      unit: 'জন',
      value: institutions.reduce((sum, i) => sum + (i.avgResult ?? 0), 0),
      icon: Star,
      iconBg: 'bg-purple-100',
      bgColor: 'bg-[#DCFCE7]',
      iconColor: 'text-purple-500',
    },
    {
      label: 'মোট বৃত্তি',
      unit: 'জন',
      value: institutions.reduce((sum, i) => sum + (i.scholarship ?? 0), 0),
      icon: Wallet,
      iconBg: 'bg-green-100',
      bgColor: 'bg-[#DBEAFE]',
      iconColor: 'text-green-600',
    },
  ]

  return (
    <section className='font-bn w-full bg-slate-50 py-8'>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap');`}</style>

      <div className='mx-auto max-w-[1320px] px-4'>
        {/* Banner */}
        <div className='rounded-2xl bg-[#4A4DE1] px-6 py-7 text-center shadow-sm'>
          <h1 className='text-2xl font-bold text-white sm:text-[26px]'>প্রতিষ্ঠানের অর্জন</h1>
          <p className='mt-1 text-sm text-white'>শিক্ষা প্রতিষ্ঠানের সার্বিক ফলাফলের সংক্ষিপ্ত চিত্র</p>
        </div>

        {/* Stat cards */}
        <div className='mt-6 flex flex-wrap gap-4'>
          {stats.map(s => (
            <StatCard key={s.label} stat={s} />
          ))}
        </div>

        {/* Filter bar */}
        <div className='mt-6 flex flex-wrap items-center justify-between gap-3'>
          <label className='flex items-center gap-2 text-sm text-slate-600'>
            সেশন
            <select
              value={session}
              onChange={e => {
                setSession(e.target.value)
                setPage(1)
              }}
              className='rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
            >
              {SESSIONS.map(s => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>

          <button
            type='button'
            onClick={() => setPage(1)}
            className='flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-orange-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300'
          >
            <Filter className='h-4 w-4' />
            ফলাফল দেখুন
          </button>
        </div>

        {/* Table */}
        <div className='mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5'>
          <div className='bg-[#E3E8FF] px-5 py-4 text-center'>
            <h2 className='text-base font-semibold text-slate-800'>প্রাতিষ্ঠানিক সাফল্য (স্কুল ভিত্তিক)</h2>
          </div>

          {error && <div className='px-5 py-6 text-center text-sm text-red-500'>তথ্য আনতে সমস্যা হয়েছে: {error}</div>}

          {!error && loading && (
            <div className='flex items-center justify-center gap-2 px-5 py-10 text-sm text-slate-400'>
              <Loader2 className='h-4 w-4 animate-spin' />
              তথ্য লোড হচ্ছে...
            </div>
          )}

          {!error && !loading && institutions.length === 0 && <div className='px-5 py-10 text-center text-sm text-slate-400'>কোনো তথ্য পাওয়া যায়নি।</div>}

          {!error && !loading && institutions.length > 0 && (
            <>
              <div className='overflow-x-auto'>
                <table className='w-full min-w-[640px] border-collapse text-sm'>
                  <thead>
                    <tr className='bg-[#FFF6D7] text-left text-xs font-medium text-slate-500'>
                      <th className='px-5 py-3'>নম্বর</th>
                      <th className='px-5 py-3'>বিদ্যালয়ের নাম</th>
                      <th className='px-5 py-3 text-right'>শিক্ষার্থী অংশগ্রহণ</th>
                      <th className='px-5 py-3 text-right'>মোট বৃত্তি</th>
                      <th className='px-5 py-3 text-right'>ট্যালেন্টপুল</th>
                      <th className='px-5 py-3 text-right'>সাধারণ বৃত্তি</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageRows.map((r, idx) => (
                      <tr key={r.id} className={`border-t border-slate-100 ${idx % 2 === 1 ? 'bg-slate-50/60' : 'bg-white'} hover:bg-indigo-50/40 transition-colors`}>
                        <td className='px-5 py-3'>
                          <span className='flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 text-xs font-medium text-white'>{toBn((currentPage - 1) * pageSize + idx + 1)}</span>
                        </td>
                        <td className='px-5 py-3 font-medium text-slate-700'>
                          <div className='flex items-center gap-2'>
                            {r.logo && <img src={`${IMAGE_BASE}${r.logo}`} alt='' className='h-6 w-6 rounded-full object-cover ring-1 ring-slate-200' />}
                            {r.name}
                          </div>
                        </td>
                        <td className='px-5 py-3 text-right tabular-nums text-slate-600'>{fmt(r.enrolled)}</td>
                        <td className='px-5 py-3 text-right tabular-nums text-slate-600'>{fmt(r.totalResult)}</td>
                        <td className='px-5 py-3 text-right tabular-nums text-slate-600'>{fmt(r.scholarship)}</td>
                        <td className='px-5 py-3 text-right tabular-nums font-semibold text-indigo-600'>{fmt(r.avgResult)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className='flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-5 py-3 text-sm text-slate-500'>
                <span>মোট স্কুল: {toBnNumber(totalSchools)} টি</span>

                <div className='flex items-center gap-4'>
                  <label className='flex items-center gap-2'>
                    প্রতি পৃষ্ঠায়
                    <select
                      value={pageSize}
                      onChange={e => {
                        setPageSize(Number(e.target.value))
                        setPage(1)
                      }}
                      className='rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500'
                    >
                      {PAGE_SIZE_OPTIONS.map(o => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <div className='flex items-center gap-1'>
                    <button
                      type='button'
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      className='flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 disabled:opacity-40'
                      disabled={currentPage === 1}
                      aria-label='পূর্ববর্তী পাতা'
                    >
                      <ChevronLeft className='h-4 w-4' />
                    </button>
                    {pageNumbers.map(p => (
                      <button
                        key={p}
                        type='button'
                        onClick={() => setPage(p)}
                        className={`flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors ${p === currentPage ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                      >
                        {toBn(p)}
                      </button>
                    ))}
                    {totalPages > 3 && (
                      <>
                        <span className='px-1 text-slate-400'>...</span>
                        <button
                          type='button'
                          onClick={() => setPage(totalPages)}
                          className={`flex h-7 w-7 items-center justify-center rounded-md text-xs transition-colors ${currentPage === totalPages ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                        >
                          {toBn(totalPages)}
                        </button>
                      </>
                    )}
                    <button
                      type='button'
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      className='flex h-7 w-7 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 disabled:opacity-40'
                      disabled={currentPage === totalPages}
                      aria-label='পরবর্তী পাতা'
                    >
                      <ChevronRight className='h-4 w-4' />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default AchievementHero
