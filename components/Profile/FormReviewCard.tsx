'use client'

import { useState } from 'react'

export interface ReviewField {
  label: string
  value: string
}

const DEFAULT_FIELDS: ReviewField[] = [
  { label: 'নাম', value: 'রেহনুম রকি' },
  { label: 'পিতার নাম', value: 'রহমান' },
  { label: 'মাতার নাম', value: 'আফরোজা' },
  { label: 'মোবাইল', value: '০১৭xxxxxxxx' },
  { label: 'লিঙ্গ', value: 'পুরুষ' },
  { label: 'জন্ম তারিখ', value: '১২.১১.১৯৯৪' },
  { label: 'রক্তের গ্রুপ', value: 'ও পজিটিভ' },
  { label: 'পেশা', value: 'ছাত্র' },
  { label: 'বর্তমান ঠিকানা', value: 'মিরপুর, ঢাকা' },
  { label: 'স্থায়ী ঠিকানা', value: 'কুষ্টিয়া' },
]

interface PerforatedFrameProps {
  src: string
  alt: string
}

function PerforatedFrame({ src, alt }: PerforatedFrameProps) {
  return (
    <div className='relative mx-auto h-28 w-28'>
      <div
        className='h-full w-full overflow-hidden rounded-2xl bg-[color:var(--hairline)] p-[3px]'
        style={{
          backgroundImage: 'radial-gradient(circle, var(--paper) 1.1px, transparent 1.2px)',
          backgroundSize: '7px 7px',
          backgroundPosition: 'center',
        }}
      >
        <img src={src} alt={alt} className='h-full w-full rounded-[13px] object-cover' />
      </div>
    </div>
  )
}

interface FieldRowProps {
  label: string
  value: string
  index: number
}

function FieldRow({ label, value, index }: FieldRowProps) {
  return (
    <div className={`flex items-baseline justify-between gap-4 px-5 py-3 ${index % 2 === 1 ? 'bg-[color:var(--row-tint)]' : ''}`}>
      <span className='shrink-0 font-body text-[13px] text-[color:var(--muted)]'>{label}</span>
      <span className='text-right font-body text-[14px] font-semibold text-[color:var(--ink)]'>{value}</span>
    </div>
  )
}

export interface FormReviewCardProps {
  photoSrc?: string
  applicantName?: string
  fields?: ReviewField[]
  onEdit?: () => void
  onConfirm?: () => void | Promise<void>
}

export default function FormReviewCard({ photoSrc = 'https://i.pravatar.cc/160?img=13', applicantName = 'রেহনুম রকি', fields = DEFAULT_FIELDS, onEdit, onConfirm }: FormReviewCardProps) {
  const [submitting, setSubmitting] = useState(false)

  const handleConfirm = async () => {
    setSubmitting(true)
    try {
      await onConfirm?.()
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className='mx-auto w-full max-w-[560px] font-body'
      style={
        {
          '--paper': '#F3F1EB',
          '--ink': '#132A42',
          '--muted': '#6E7580',
          '--forest': '#1C6E56',
          '--forest-tint': '#E7F1EC',
          '--orange': '#DD5B27',
          '--hairline': '#E4DFD2',
          '--row-tint': '#FAF9F5',
          '--seal': '#1C6E56',
        } as React.CSSProperties
      }
    >
      <div
        className='
    flex
    w-full
    max-w-[560px]
    flex-col
    gap-[14px]
    rounded-[12px]
    border
    border-[#DEDEE380]
    bg-[#F8F8F9]
    px-[20px]
    py-[16px]
  '
      >
        <div className='relative bg-[color:var(--ink)] px-4 pb-5 pt-4 text-center'>
          <button aria-label='পেছনে যান' className='absolute left-3 top-4 rounded-full p-1.5 text-white/80 transition hover:bg-white/10 hover:text-white'>
            <svg viewBox='0 0 24 24' className='h-5 w-5' fill='none'>
              <path d='M15 5l-7 7 7 7' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
            </svg>
          </button>
          <h1 className='font-display text-[17px] tracking-wide text-white'>ফরম যাচাই করুন</h1>
          <p className='mt-0.5 text-[11px] text-white/60'>জমা দেওয়ার আগে তথ্যগুলো ভালোভাবে দেখে নিন</p>
        </div>

        {/* Info banner */}
        <div className='mx-4 -mt-2.5 flex items-start gap-2.5 rounded-xl border border-[color:var(--forest)]/20 bg-[color:var(--forest-tint)] px-3.5 py-2.5'>
          <svg viewBox='0 0 24 24' className='mt-0.5 h-4 w-4 shrink-0 text-[color:var(--forest)]' fill='none'>
            <circle cx='12' cy='12' r='9' stroke='currentColor' strokeWidth='1.8' />
            <path d='M12 8v5' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' />
            <circle cx='12' cy='16' r='0.9' fill='currentColor' />
          </svg>
          <p className='text-[12px] leading-snug text-[color:var(--forest)]'>
            ভুল তথ্য পেলে নিচে থাকা <span className='font-semibold'>&quot;সংশোধন করুন&quot;</span> বোতাম চাপুন
          </p>
        </div>

        {/* Photo */}
        <div className='pb-4 pt-6'>
          <PerforatedFrame src={photoSrc} alt={applicantName} />
        </div>

        {/* Fields */}
        <div className='divide-y divide-[color:var(--hairline)] border-y border-[color:var(--hairline)]'>
          {fields.map((f, i) => (
            <FieldRow key={f.label} label={f.label} value={f.value} index={i} />
          ))}
        </div>

        {/* Actions */}
        <div className='flex gap-3 px-4 py-4'>
          <button
            type='button'
            onClick={onEdit}
            className='flex-1 rounded-xl border-[1.5px] border-[color:var(--orange)] py-3 text-[14px] font-semibold text-[color:var(--orange)] transition active:scale-[0.98]'
          >
            সংশোধন করুন
          </button>
          <button
            type='button'
            onClick={handleConfirm}
            disabled={submitting}
            className='flex-1 rounded-xl bg-[color:var(--orange)] py-3 text-[14px] font-semibold text-white shadow-[0_8px_16px_-8px_rgba(221,91,39,0.7)] transition active:scale-[0.98] disabled:opacity-60'
          >
            {submitting ? 'অপেক্ষা করুন…' : 'নিশ্চিত করুন'}
          </button>
        </div>
      </div>
    </div>
  )
}
