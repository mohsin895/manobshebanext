'use client'

import { useRef, useState } from 'react'

const inputClass =
  'w-full h-10 rounded-[8px] border border-[#E2E2E2] bg-white px-3 py-2 font-bn text-[16px] font-normal leading-[24px] tracking-[0] text-[#282929] placeholder:font-bn placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:tracking-[0] placeholder:text-[#BBBCC5] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
const labelClass = 'mb-1.5 block font-bn text-[16px] font-normal leading-[24px] tracking-[0] text-[#282929]'

function Field({ label, children, optional = false }: { label: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <div>
      <label className='mb-1.5 block font-bn text-[16px] font-normal leading-[24px] tracking-[0] text-[#282929]'>
        {label}
        {optional && <span className='text-gray-400'> (ঐচ্ছিক)</span>}
      </label>
      {children}
    </div>
  )
}

function Select({ placeholder, options, value, onChange }: { placeholder: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className='relative'>
      <select className={`${inputClass} appearance-none pr-9`} value={value} onChange={e => onChange(e.target.value)}>
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map(o => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <svg className='pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
        <path strokeLinecap='round' strokeLinejoin='round' d='M19 9l-7 7-7-7' />
      </svg>
    </div>
  )
}

// Modal shown when the user starts picking a profile photo
function PhotoPickerModal({ onClose, onPick }: { onClose: () => void; onPick: (file: File) => void }) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4'>
      <div className='relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl'>
        <button onClick={onClose} aria-label='বন্ধ করুন' className='absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600'>
          <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>
        </button>

        <div className='mx-auto mb-5 h-40 w-40 overflow-hidden rounded-xl bg-gray-100'>
          <img src='https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=300&fit=crop&crop=faces' alt='নমুনা প্রোফাইল ছবি' className='h-full w-full object-cover' />
        </div>

        <ul className='mb-5 space-y-2 text-sm text-gray-600'>
          <li className='flex gap-2'>
            <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500' />
            প্রোফাইল ছবি নির্বাচনের ক্ষেত্রে এই ধরনের ছবি নির্বাচন করুন। (নমুনা ছবি দেওয়া হয়েছে)
          </li>
          <li className='flex gap-2'>
            <span className='mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-orange-500' />
            SVG, PNG, JPG, অথবা GIF (সর্বোচ্চ 400x400px)
          </li>
        </ul>

        <input
          ref={fileInputRef}
          type='file'
          accept='.svg,.png,.jpg,.jpeg,.gif'
          className='hidden'
          onChange={e => {
            const file = e.target.files?.[0]
            if (file) {
              onPick(file)
              onClose()
            }
          }}
        />
        <button onClick={() => fileInputRef.current?.click()} className='w-full rounded-lg bg-orange-500 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600'>
          ছবি নির্বাচন করুন
        </button>
      </div>
    </div>
  )
}

export default function StudentInfoForm() {
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [gender, setGender] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [religion, setReligion] = useState('')
  const [nationality, setNationality] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: wire up submission logic
  }

  return (
    <div
      className='
    w-full
    bg-gray-50

    px-[18px]
    pt-[76px]
    pb-10

    md:px-[60px]
    md:pt-[50px]
  '
    >
      <form
        onSubmit={handleSubmit}
        className='
    mx-auto
    w-full
    max-w-[1280px]

    rounded-[20px]
    border
    border-transparent

    p-3
    md:p-8

    backdrop-blur-[10px]

    [background:linear-gradient(#fff,#fff)_padding-box,linear-gradient(279.83deg,#FFDACD_0%,#FFB59A_100%)_border-box]

    flex
    flex-col
    gap-6

    md:rounded-[28px]
  '
      >
        <h1
          className='
    mb-8
    text-center
    font-bn
    font-normal
    text-[20px]
    leading-[28px]
    tracking-[0]
    text-[#282929]
    md:text-[24px]
    md:leading-[24px]
  '
        >
          শিক্ষার্থীর তথ্য দিন
        </h1>

        <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2'>
          <Field label='পরীক্ষার্থীর নাম (বাংলায়)'>
            <input className={inputClass} placeholder='পরীক্ষার্থীর নাম লিখুন' />
          </Field>
          <Field label='পরীক্ষার্থীর নাম (ইংরেজিতে)'>
            <input className={inputClass} placeholder='পরীক্ষার্থীর নাম লিখুন' />
          </Field>

          <Field label='পিতার নাম (বাংলায়)'>
            <input className={inputClass} placeholder='পিতার নাম লিখুন' />
          </Field>
          <Field label='মাতার নাম (বাংলায়)'>
            <input className={inputClass} placeholder='মাতার নাম লিখুন' />
          </Field>

          <Field label='পিতার নাম (ইংরেজিতে)'>
            <input className={inputClass} placeholder='পিতার নাম লিখুন' />
          </Field>
          <Field label='মাতার নাম (ইংরেজিতে)'>
            <input className={inputClass} placeholder='মাতার নাম লিখুন' />
          </Field>

          <Field label='লিঙ্গ'>
            <Select placeholder='নির্বাচন করুন...' options={['ছেলে', 'মেয়ে', 'অন্যান্য']} value={gender} onChange={setGender} />
          </Field>
          <Field label='রক্তের গ্রুপ'>
            <Select placeholder='নির্বাচন করুন...' options={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']} value={bloodGroup} onChange={setBloodGroup} />
          </Field>

          <Field label='জন্ম তারিখ'>
            <input type='date' className={inputClass} placeholder='পরীক্ষার্থীর জন্ম তারিখ নির্বাচন করুন' />
          </Field>
          <Field label='ধর্ম'>
            <Select placeholder='নির্বাচন করুন...' options={['ইসলাম', 'হিন্দু', 'বৌদ্ধ', 'খ্রিস্টান', 'অন্যান্য']} value={religion} onChange={setReligion} />
          </Field>

          <Field label='জাতীয়তা' optional>
            <Select placeholder='নির্বাচন করুন...' options={['বাংলাদেশি', 'অন্যান্য']} value={nationality} onChange={setNationality} />
          </Field>
          <Field label='রেফারেন্স নাম' optional>
            <input className={inputClass} placeholder='রেফারেন্স নাম লিখুন' />
          </Field>

          <div className='sm:col-span-2'>
            <label className={labelClass}>ঠিকানা (বাংলায়)</label>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <input className={inputClass} placeholder='গ্রাম/মহল্লা' />
              <input className={inputClass} placeholder='থানা/উপজেলা' />
            </div>
          </div>

          <Field label='ছবি'>
            <button
              type='button'
              onClick={() => setShowPhotoModal(true)}
              className='flex w-full items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2 text-left text-sm text-gray-500 transition hover:border-gray-300'
            >
              <span className='rounded-md bg-gray-100 px-3 py-1 text-gray-700'>Choose File</span>
              <span className='truncate'>{photoFile ? photoFile.name : 'No file chosen'}</span>
            </button>
            <p className='mt-1.5 text-xs text-gray-400'>SVG, PNG, JPG, অথবা GIF (সর্বোচ্চ 400x400px)</p>
          </Field>

          <Field label='বিবরণ' optional>
            <textarea className={`${inputClass} h-[86px] resize-none`} placeholder='কিছু বিবরণ লিখুন' />
          </Field>
        </div>

        <div className='mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between'>
          <button type='button' className='rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50'>
            ফরমের পূর্বরূপ দেখুন
          </button>
          <button type='submit' className='rounded-lg bg-orange-500 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600'>
            সাবমিট করুন
          </button>
        </div>
      </form>

      {showPhotoModal && <PhotoPickerModal onClose={() => setShowPhotoModal(false)} onPick={file => setPhotoFile(file)} />}
    </div>
  )
}
