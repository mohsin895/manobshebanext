// app/.../profile/page.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

interface SchoolProfile {
  id: number
  name: string
  enname: string
  headname: string
  postcode: string
  mobile: string
  assName: string
  assPhone: string
  email: string
  slug: string
  logo: string
  address: string | null
  division_id: string
  district_id: string
  upazila_id: string
  zone_id: string
  status: string
}

type FieldGroup = {
  title: string
  note?: string
  fields: { key: keyof SchoolProfile; label: string; type?: 'text' | 'textarea' | 'email' | 'tel' }[]
}

const FIELD_GROUPS: FieldGroup[] = [
  {
    title: 'Institution',
    note: 'Bangla name appears on official documents and certificates.',
    fields: [
      { key: 'name', label: 'School Name (Bangla)' },
      { key: 'enname', label: 'School Name (English)' },
    ],
  },
  {
    title: 'Leadership',
    fields: [
      { key: 'headname', label: 'Head Teacher' },
      { key: 'assName', label: 'Assistant Teacher' },
      { key: 'assPhone', label: 'Assistant Phone', type: 'tel' },
    ],
  },
  {
    title: 'Contact',
    fields: [
      { key: 'mobile', label: 'Mobile Number', type: 'tel' },
      { key: 'email', label: 'Email', type: 'email' },
      { key: 'postcode', label: 'Postcode' },
    ],
  },
]

export default function ProfilePage() {
  const [profile, setProfile] = useState<SchoolProfile | null>(null)
  const [form, setForm] = useState<Partial<SchoolProfile>>({})
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [successMsg, setSuccessMsg] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const getToken = () => (typeof window !== 'undefined' ? localStorage.getItem('token') : null)

  const fetchProfile = async () => {
    setLoading(true)
    setError(null)
    try {
      const token = getToken()
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/user`, {
        headers: {
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
      })

      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)

      const json = await res.json()
      setProfile(json)
      setForm(json)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not load the profile')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  useEffect(() => {
    if (!logoFile) return
    const url = URL.createObjectURL(logoFile)
    setLogoPreview(url)
    return () => URL.revokeObjectURL(url)
  }, [logoFile])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleLogoPick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('The seal image must be a photo or graphic file (PNG, JPG).')
      return
    }
    if (file.size > 2 * 1024 * 1024) {
      setError('Keep the logo under 2MB.')
      return
    }
    setError(null)
    setLogoFile(file)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)
    setSuccessMsg(null)

    try {
      const token = getToken()

      // multipart/form-data so the logo file can travel with the rest of the fields
      const body = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined) body.append(key, String(value))
      })
      if (logoFile) body.append('logo', logoFile)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/update/profile`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body,
      })

      if (!res.ok) throw new Error(`Update failed with status ${res.status}`)

      const json = await res.json()
      const updated = json.user ?? json
      setProfile(updated)
      setForm(updated)
      setLogoFile(null)
      setSuccessMsg('Profile updated.')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not update the profile')
    } finally {
      setSaving(false)
    }
  }

  return (
    <main className=' w-full bg-gray-50  px-[18px] pt-[76px] pb-10  md:px-[60px] md:pt-[50px] '>
      <Navbar />

      <div
        className='
    mx-auto
    w-full
    max-w-3xl

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
        style={{ fontFamily: 'font-poppins, "font-poppins", sans-serif' }}
      >
        {loading && <p className='text-sm text-[#6B6B63]'>Loading the school profile…</p>}

        {error && <div className='mb-6 border border-[#B8121A]/30 bg-[#B8121A]/5 px-4 py-3 text-sm text-[#B8121A]'>{error}</div>}

        {successMsg && <div className='mb-6 border border-[#0B3D2E]/25 bg-[#0B3D2E]/5 px-4 py-3 text-sm text-[#0B3D2E]'>{successMsg}</div>}

        {!loading && profile && (
          <>
            {/* Header: institutional seal + identity */}
            <header className='mb-10 flex flex-col items-center gap-5 border-b border-[#0B3D2E]/15 pb-10 text-center'>
              <button type='button' onClick={() => fileInputRef.current?.click()} className='group relative h-28 w-28 shrink-0 rounded-full outline-none' aria-label='Replace school seal'>
                <span className='absolute inset-0 rounded-full border-2 border-[#0B3D2E]/70' />
                <span className='absolute inset-[6px] rounded-full border border-[#0B3D2E]/25' />
                <div className='absolute inset-[6px] overflow-hidden rounded-full bg-[#F4F2ED]'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logoPreview || `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${profile.logo}`}
                    alt={`${profile.enname} seal`}
                    className='h-full w-full object-cover transition group-hover:opacity-40'
                  />
                </div>
                <span className='absolute inset-0 flex items-center justify-center rounded-full bg-black/0 text-[11px] font-medium tracking-wide text-white opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100'>
                  Replace seal
                </span>
              </button>
              <input ref={fileInputRef} type='file' accept='image/*' onChange={handleLogoPick} className='hidden' />
              {logoFile && <p className='text-xs text-[#0B3D2E]'>New seal selected — save the form to apply it.</p>}

              <div>
                <h1 className='text-3xl leading-tight text-[#1A1A1A]' style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}>
                  {profile.name}
                </h1>
                <p className='mt-1 text-sm tracking-wide text-[#6B6B63]'>{profile.enname}</p>
              </div>
            </header>

            <form onSubmit={handleSubmit} className='space-y-12'>
              {FIELD_GROUPS.map(group => (
                <section key={group.title}>
                  <div className='mb-5 flex items-baseline justify-between border-b border-[#0B3D2E]/10 pb-2'>
                    <h2 className='text-lg text-[#0B3D2E]' style={{ fontFamily: 'Fraunces, serif', fontWeight: 600 }}>
                      {group.title}
                    </h2>
                    {group.note && <span className='text-xs text-[#6B6B63]'>{group.note}</span>}
                  </div>

                  <div className='grid grid-cols-1 gap-5 sm:grid-cols-2'>
                    {group.fields.map(({ key, label, type = 'text' }) => (
                      <div key={key} className={type === 'textarea' ? 'sm:col-span-2 flex flex-col gap-1.5' : 'flex flex-col gap-1.5'}>
                        <label htmlFor={key} className='text-xs font-medium uppercase tracking-wide text-[#6B6B63]'>
                          {label}
                        </label>
                        {type === 'textarea' ? (
                          <textarea
                            id={key}
                            name={key}
                            value={(form[key] as string) ?? ''}
                            onChange={handleChange}
                            rows={3}
                            className='border border-[#0B3D2E]/20 bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none transition focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E]'
                          />
                        ) : (
                          <input
                            id={key}
                            name={key}
                            type={type}
                            value={(form[key] as string) ?? ''}
                            onChange={handleChange}
                            className='border border-[#0B3D2E]/20 bg-white px-3 py-2 text-sm text-[#1A1A1A] outline-none transition focus:border-[#0B3D2E] focus:ring-1 focus:ring-[#0B3D2E]'
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <div className='flex items-center justify-between border-t border-[#2B2D7E]/15 pt-6'>
                <span className='text-xs text-[#6B6B63]'></span>
                <button type='submit' disabled={saving} className='bg-[#2B2D7E] px-7 py-2.5 text-sm font-medium tracking-wide text-white transition hover:bg-[#0B3D2E]/90 disabled:opacity-50'>
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>

      <Footer />
    </main>
  )
}
