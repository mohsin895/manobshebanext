'use client'

import { useLanguage } from '@/app/context/LanguageContext'
import { BookOpenCheck, Briefcase, GraduationCap, HandCoins, HandHeart, HeartHandshake, PackageOpen, ShieldPlus, Sparkles, Users } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

// bn -> language_id 1, en -> language_id 2
const LANGUAGE_ID_MAP: Record<string, number> = {
  bn: 1,
  en: 2,
}

// Tabs shown, in this order. Remove a type here to hide it.
// A tab only appears if the API returns it.
const VISIBLE_TAB_TYPES = ['mission', 'vision', 'values']

/* -------------------------------------------------------------------------- */
/*  Icons                                                                     */
/* -------------------------------------------------------------------------- */

type IconComponent = React.ElementType

// Default icons used while the API sends `icon: null`.
// Picked by tab type + item index (cycles if there are more items than icons).
const DEFAULT_ICONS: Record<string, IconComponent[]> = {
  mission: [GraduationCap, HandHeart, PackageOpen],
  vision: [BookOpenCheck, Briefcase, ShieldPlus],
  values: [HandCoins, HeartHandshake, Users],
}
const FALLBACK_ICON: IconComponent = Sparkles

const getDefaultIcon = (tabType: string, index: number): IconComponent => {
  const list = DEFAULT_ICONS[tabType]
  return list && list.length > 0 ? list[index % list.length] : FALLBACK_ICON
}

// When the API sends `icon`, it can be a lucide icon name
// (e.g. "GraduationCap" / "graduation-cap") or an image URL / path.
// To support more names, just add them here.
const normalizeIconName = (name: string) => name.replace(/[^a-z0-9]/gi, '').toLowerCase()

const ICON_REGISTRY: Record<string, IconComponent> = {
  graduationcap: GraduationCap,
  handheart: HandHeart,
  packageopen: PackageOpen,
  bookopencheck: BookOpenCheck,
  briefcase: Briefcase,
  shieldplus: ShieldPlus,
  handcoins: HandCoins,
  hearthandshake: HeartHandshake,
  users: Users,
  sparkles: Sparkles,
}

const isImageIcon = (icon: string) => /^(https?:)?\/\//i.test(icon) || icon.startsWith('/') || icon.startsWith('data:image')

type GoalIconProps = {
  icon?: string | null
  fallback: IconComponent
}

function GoalIcon({ icon, fallback }: GoalIconProps) {
  const value = icon?.trim()

  // 1) API sent an image URL/path
  if (value && isImageIcon(value)) {
    return <img src={safeUrl(value)} alt='' className='h-5 w-5 object-contain' />
  }

  // 2) API sent a lucide icon name -> use it if we know it, else default
  const Icon = (value && ICON_REGISTRY[normalizeIconName(value)]) || fallback
  return <Icon className='h-[18px] w-[18px]' />
}

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type Goal = {
  icon: string | null
  defaultIcon: IconComponent // used when `icon` is null / unknown
  title: string
  description: string
}

type GalleryImage = {
  src: string
  caption: string | null
}

type TabContent = {
  id: string // "mission" | "vision" | "values" (comes from API `type`)
  label: string
  heroImage: string | null
  tagText: string | null
  aboutDescription: string | null
  goalsTitle: string | null
  goals: Goal[]
  galleryTitle: string | null
  gallerySubtitle: string | null
  gallery: GalleryImage[]
}

// ---- API response shape (GET /about-us) ----
type ApiItem = {
  title: string | null
  description: string | null
  icon: string | null
}

type ApiGalleryImage = {
  imageUrl: string | null
  caption: string | null
}

type ApiTab = {
  type: string
  tabLabel: string | null
  imageUrl: string | null
  highlightLabel: string | null
  highlightDescription: string | null
  sectionTitle: string | null
  items?: ApiItem[] | null
  gallery?: {
    title: string | null
    subtitle: string | null
    images?: ApiGalleryImage[] | null
  } | null
}

type AboutUsResponse = {
  tabs?: ApiTab[]
  data?: { tabs?: ApiTab[] }
}

/* -------------------------------------------------------------------------- */
/*  Helpers                                                                   */
/* -------------------------------------------------------------------------- */

// API image URLs contain spaces / parentheses ("Rectangle (3).png").
// Encode safely without double-encoding.
function safeUrl(url: string) {
  try {
    return encodeURI(decodeURI(url)).replace(/\(/g, '%28').replace(/\)/g, '%29')
  } catch {
    return url
  }
}

const clean = (value: string | null | undefined) => (typeof value === 'string' && value.trim() !== '' ? value : null)

// Makes "Values", " values " etc. match "values".
const normalizeType = (type: string | null | undefined) => (typeof type === 'string' ? type.trim().toLowerCase() : '')

/* -------------------------------------------------------------------------- */
/*  API -> TabContent mapping                                                 */
/* -------------------------------------------------------------------------- */

function mapTab(api: ApiTab): TabContent {
  const type = normalizeType(api.type)

  const goals: Goal[] = (api.items ?? [])
    .filter(item => clean(item.title) || clean(item.description))
    .map((item, i) => ({
      icon: clean(item.icon),
      defaultIcon: getDefaultIcon(type, i),
      title: item.title ?? '',
      description: item.description ?? '',
    }))

  const gallery: GalleryImage[] = (api.gallery?.images ?? []).filter(img => clean(img.imageUrl)).map(img => ({ src: safeUrl(img.imageUrl as string), caption: clean(img.caption) }))

  const heroRaw = clean(api.imageUrl)

  return {
    id: type,
    label: clean(api.tabLabel) ?? type,
    heroImage: heroRaw ? safeUrl(heroRaw) : null,
    tagText: clean(api.highlightLabel),
    aboutDescription: clean(api.highlightDescription),
    goalsTitle: clean(api.sectionTitle),
    goals,
    galleryTitle: clean(api.gallery?.title),
    gallerySubtitle: clean(api.gallery?.subtitle),
    gallery,
  }
}

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

export function AboutTabs() {
  const { language } = useLanguage()
  const languageId = LANGUAGE_ID_MAP[language] ?? 1

  const [apiTabs, setApiTabs] = useState<ApiTab[] | null>(null)
  const [activeTab, setActiveTab] = useState<string>('mission')

  useEffect(() => {
    let cancelled = false

    const params = new URLSearchParams({ language_id: String(languageId) })
    fetch(`${API_BASE_URL}/about-us?${params.toString()}`, {
      headers: { Accept: 'application/json' },
      cache: 'no-store',
    })
      .then(res => (res.ok ? res.json() : null))
      .then((json: AboutUsResponse | null) => {
        console.log('about-us URL:', `${API_BASE_URL}/about-us?${params.toString()}`)
        console.log(
          'about-us tabs:',
          json?.tabs?.map(t => t.type)
        )
        if (cancelled || !json) return
        const tabs = json.tabs ?? json.data?.tabs
        if (Array.isArray(tabs) && tabs.length > 0) setApiTabs(tabs)
      })
      .catch(() => {})

    return () => {
      cancelled = true
    }
  }, [languageId])

  // One tab per VISIBLE_TAB_TYPES (in that order), only if the API returned it.
  const tabsContent: TabContent[] = useMemo(() => {
    if (!apiTabs) return []

    const byType = new Map<string, ApiTab>()
    for (const t of apiTabs) {
      const key = normalizeType(t?.type)
      if (key) byType.set(key, t)
    }

    const result: TabContent[] = []
    for (const type of VISIBLE_TAB_TYPES) {
      const api = byType.get(type)
      if (api) result.push(mapTab({ ...api, type }))
    }
    return result
  }, [apiTabs])

  // If the active tab no longer exists (e.g. after data loads), use the first one
  const content = tabsContent.find(tab => tab.id === activeTab) ?? tabsContent[0]

  // Nothing to show until the API responds (or if it fails)
  if (!content) return null

  return (
    <section className='w-full bg-[#FFF8F5] py-8 mt-[65px] md:mt-[115px]'>
      <div className='mx-auto w-full max-w-[1320px] px-4'>
        {/* Eyebrow badge */}
        <div className='flex justify-center'>
          <span className='inline-flex items-center gap-1.5 px-4 py-1.5 font-bn text-[24px] font-semibold leading-[32px] text-[#4A4DE1]'>
            <Image src='/aboutus.svg' alt='About Us icon' width={24} height={24} className='h-5 w-5 shrink-0 md:h-6 md:w-6' />
            আমাদের সম্পর্কে
          </span>
        </div>

        {/* Tab bar */}
        <div className='mt-4 flex justify-center'>
          <div className='flex w-full max-w-full flex-wrap justify-center gap-1.5 rounded-full border border-[#E7E9FE] bg-white/70 p-1.5 sm:w-auto sm:flex-nowrap'>
            {tabsContent.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-medium transition-colors sm:px-5 sm:text-sm ${
                  content.id === tab.id ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-600 hover:bg-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Hero image */}
        {content.heroImage && (
          <div className='relative mx-auto mt-6 h-[220px] w-full overflow-hidden rounded-[20px] shadow-md sm:h-[280px] md:h-[380px] md:rounded-[32px]'>
            <div
              className='absolute inset-0 bg-cover bg-center bg-no-repeat'
              style={{
                backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%), url("${content.heroImage}")`,
              }}
            />
          </div>
        )}

        {/* About / description box */}
        {(content.tagText || content.aboutDescription) && (
          <div className='mt-5 rounded-2xl border border-indigo-100 bg-white p-5'>
            {content.tagText && <span className='inline-block rounded-full bg-indigo-600 px-3 py-1 font-bn text-[16px] font-semibold leading-normal text-white'>{content.tagText}</span>}
            {content.aboutDescription && <p className='mt-3 font-bn text-[24px] font-normal leading-[32px] text-[#545959]'>{content.aboutDescription}</p>}
          </div>
        )}

        {/* Key goals / objectives */}
        {content.goals.length > 0 && (
          <div className='mt-8'>
            {content.goalsTitle && <h2 className='font-bn text-[20px] font-bold leading-normal text-[#4A4DE1] md:text-[28px] md:font-semibold md:leading-[36px]'>{content.goalsTitle}</h2>}

            <div className='mt-4 flex flex-col gap-4'>
              {content.goals.map((goal, i) => (
                <div key={`${content.id}-goal-${i}`} className='flex items-start gap-3 rounded-2xl border border-[#FFEBE5] bg-white p-4'>
                  <span className='flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500'>
                    {/* API icon if provided, otherwise the default icon */}
                    <GoalIcon icon={goal.icon} fallback={goal.defaultIcon} />
                  </span>
                  <div>
                    <h4 className='font-bn text-[16px] font-bold leading-normal text-[#282929] md:text-[20px] md:font-semibold md:leading-[28px]'>{goal.title}</h4>
                    <p className='mt-1 font-bn text-[13px] font-normal leading-[18px] text-[#545959] md:text-[16px] md:leading-[24px]'>{goal.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Gallery */}
        {content.gallery.length > 0 && (
          <div className='mt-8'>
            {content.galleryTitle && <h2 className='font-bn text-[20px] font-bold leading-normal text-[#4A4DE1] md:text-[28px]'>{content.galleryTitle}</h2>}
            {content.gallerySubtitle && <p className='mt-1 font-bn text-[13px] font-normal leading-normal text-[#545959] md:text-[16px]'>{content.gallerySubtitle}</p>}

            <div className='mt-4 grid grid-cols-2 gap-3'>
              {content.gallery.map((img, i) => (
                <div key={`${content.id}-${img.src}-${i}`} className='h-32 overflow-hidden rounded-2xl sm:h-44'>
                  <img
                    src={img.src}
                    alt={img.caption ?? `${content.galleryTitle ?? 'Gallery'} ${i + 1}`}
                    className='h-full w-full object-cover'
                    loading='lazy'
                    onError={e => {
                      // Hide the tile if the image fails to load
                      const parent = e.currentTarget.parentElement
                      if (parent) parent.style.display = 'none'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AboutTabs
