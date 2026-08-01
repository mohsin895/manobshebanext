'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''
const IMAGE_BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

const inputClass =
  'w-full h-10 rounded-[8px] border border-[#E2E2E2] bg-white px-3 py-2 font-bn text-[16px] font-normal leading-[24px] tracking-[0] text-[#282929] placeholder:font-bn placeholder:font-normal placeholder:text-[16px] placeholder:leading-[24px] placeholder:tracking-[0] placeholder:text-[#BBBCC5] outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100'
const labelClass = 'mb-1.5 block font-bn text-[16px] font-normal leading-[24px] tracking-[0] text-[#282929]'

type ClassOption = { id: number; name: string }
type Option = { id: number; name: string }

// Reads the `token` cookie set at login (matches middleware.ts's request.cookies.get('token'))
function getAuthToken(): string | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]*)/)
  return match ? decodeURIComponent(match[1]) : null
}

function authHeaders(): HeadersInit {
  const token = getAuthToken()
  return token ? { Authorization: `Bearer ${token}` } : {}
}

function filterEnglishText(value: string): string {
  return value.replace(/[^a-zA-Z\s.'-]/g, '')
}

// Bengali fields: keep only Bangla script characters, spaces, and common
// name punctuation. Everything else (including Latin glyphs) is stripped.
function filterBengaliText(value: string): string {
  return value.replace(/[^\u0980-\u09FF\s.'-]/g, '')
}

// Mobile number: digits and a leading + only.
function filterMobileNumber(value: string): string {
  return value.replace(/[^\d+]/g, '')
}
// Picks the first defined value among a list of possible keys — used because
// we don't know for certain which key name the /user/student/info endpoint
// uses for a given field (e.g. `village_mahalla` vs `village`).
function pick(obj: any, keys: string[]): string {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj?.[key] !== null) return String(obj[key])
  }
  return ''
}

// Builds a single-item Option[] from a nested object like `district: {id, district_name, ...}`
// so a Select can show the correct label immediately, before its full list has loaded.
function seedOption(obj: any, nameKeys: string[]): Option[] {
  if (!obj || obj.id == null) return []
  const name = nameKeys.map(key => obj[key]).find(v => v !== undefined && v !== null) ?? String(obj.id)
  return [{ id: obj.id, name }]
}

// Normalizes the differently-shaped list responses from /division, /district,
// /upazila and /zone into a common { id, name } shape for the Select component.
function normalizeOptions(rawList: any[], nameKeys: string[]): Option[] {
  return rawList.map((item: any) => {
    const name = nameKeys.map(key => item[key]).find(v => v !== undefined && v !== null) ?? String(item.id)
    return { id: item.id, name }
  })
}

// Merges a freshly-fetched option list with whatever is already in state
// (e.g. a seeded label from the hydrated student record) so a selected id
// never disappears just because the fresh list happens not to contain it
// (pagination, filtering, timing, etc.). Fresh entries win on id collision.
function mergeOptions(prev: Option[], fresh: Option[]): Option[] {
  const freshIds = new Set(fresh.map(o => String(o.id)))
  const missingFromFresh = prev.filter(o => !freshIds.has(String(o.id)))
  return [...missingFromFresh, ...fresh]
}

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

function Select({
  placeholder,
  options,
  value,
  onChange,
  disabled = false,
}: {
  placeholder: string
  options: { value: string; label: string }[]
  value: string
  onChange: (v: string) => void
  disabled?: boolean
}) {
  return (
    <div className='relative'>
      <select className={`${inputClass} appearance-none pr-9 disabled:cursor-not-allowed disabled:opacity-60`} value={value} onChange={e => onChange(e.target.value)} disabled={disabled}>
        <option value='' disabled>
          {placeholder}
        </option>
        {options.map(o => (
          <option key={o.value} value={o.value}>
            {o.label}
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
          <img src={`${IMAGE_BASE_URL}profile.webp?w=300&h=300&fit=crop&crop=faces`} alt='নমুনা প্রোফাইল ছবি' className='h-full w-full object-cover' />
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

const genderOptions = [
  { value: 'ছেলে', label: 'ছেলে' },
  { value: 'মেয়ে', label: 'মেয়ে' },
  { value: 'অন্যান্য', label: 'অন্যান্য' },
]

const bloodGroupOptions = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(v => ({ value: v, label: v }))

const religionOptions = [
  { value: 'ইসলাম', label: 'ইসলাম' },
  { value: 'হিন্দু', label: 'হিন্দু' },
  { value: 'বৌদ্ধ', label: 'বৌদ্ধ' },
  { value: 'খ্রিস্টান', label: 'খ্রিস্টান' },
  { value: 'অন্যান্য', label: 'অন্যান্য' },
]

// Used only if /student/class fails to load or returns nothing.
const FALLBACK_CLASS_OPTIONS: ClassOption[] = []

type SubmitState = 'idle' | 'submitting' | 'success' | 'error'

export default function StudentInfoFormEdit({ schoolId = 1 }: { schoolId?: number }) {
  const params = useParams()
  const studentId = Array.isArray(params?.id) ? params.id[0] : (params?.id as string | undefined)
  const router = useRouter()
  const [showPhotoModal, setShowPhotoModal] = useState(false)
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null)
  const [existingPhotoUrl, setExistingPhotoUrl] = useState<string | null>(null)

  // Text fields
  const [nameBn, setNameBn] = useState('')
  const [nameEn, setNameEn] = useState('')
  const [fatherNameBn, setFatherNameBn] = useState('')
  const [motherNameBn, setMotherNameBn] = useState('')
  const [fatherNameEn, setFatherNameEn] = useState('')
  const [motherNameEn, setMotherNameEn] = useState('')
  const [birthCertificateNo, setBirthCertificateNo] = useState('')
  const [mobileNo, setMobileNo] = useState('')
  const [villageMahalla, setVillageMahalla] = useState('')
  const [postOffice, setPostOffice] = useState('')

  // Select fields
  const [gender, setGender] = useState('')
  const [bloodGroup, setBloodGroup] = useState('')
  const [religion, setReligion] = useState('')
  const [classId, setClassId] = useState('')

  // Class-specific group/division (e.g. Science/Commerce/Arts), only shown
  // when the selected class actually has any.
  const [classDivisionId, setClassDivisionId] = useState('')
  const [classDivisionOptions, setClassDivisionOptions] = useState<Option[]>([])
  const [classDivisionsLoading, setClassDivisionsLoading] = useState(false)
  const [classDivisionsError, setClassDivisionsError] = useState('')

  // Division / District / Upazila / Zone (cascading selects)
  const [divisionId, setDivisionId] = useState('')
  const [districtId, setDistrictId] = useState('')
  const [upazilaId, setUpazilaId] = useState('')
  const [zoneId, setZoneId] = useState('')

  const [divisionOptions, setDivisionOptions] = useState<Option[]>([])
  const [districtOptions, setDistrictOptions] = useState<Option[]>([])
  const [upazilaOptions, setUpazilaOptions] = useState<Option[]>([])
  const [zoneOptions, setZoneOptions] = useState<Option[]>([])

  const [divisionsLoading, setDivisionsLoading] = useState(true)
  const [districtsLoading, setDistrictsLoading] = useState(false)
  const [upazilasLoading, setUpazilasLoading] = useState(false)
  const [zonesLoading, setZonesLoading] = useState(false)

  const [divisionsError, setDivisionsError] = useState('')
  const [districtsError, setDistrictsError] = useState('')
  const [upazilasError, setUpazilasError] = useState('')
  const [zonesError, setZonesError] = useState('')

  // Counts how many of the four cascading effects (class→class-division,
  // division→district, district→upazila, upazila→zone) should skip their
  // normal "reset children" behavior because we just set the relevant ids
  // directly from a loaded student record. Each effect decrements it once
  // when it fires, regardless of order, so it always nets out to zero after
  // hydration.
  const hydratingRef = useRef(0)

  // Class list (fetched from API)
  const [classOptions, setClassOptions] = useState<ClassOption[]>([])
  const [classesLoading, setClassesLoading] = useState(true)
  const [classesError, setClassesError] = useState('')

  // Existing student data (fetched from API)
  const [studentLoading, setStudentLoading] = useState(true)
  const [studentError, setStudentError] = useState('')

  // Submission state
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadClasses() {
      setClassesLoading(true)
      setClassesError('')
      try {
        const res = await fetch(`${API_BASE_URL}/student/class`, {
          headers: {
            Accept: 'application/json',
            ...authHeaders(),
          },
        })

        if (res.status === 401) {
          throw new Error('unauthenticated')
        }
        if (!res.ok) throw new Error('Failed to load classes')

        const json = await res.json()

        // Response::successResponse($msg, $dataInfo) wraps the list under `data`.
        const rawList = Array.isArray(json) ? json : (json.data ?? [])

        const list: ClassOption[] = rawList.map((item: any) => ({
          id: item.id,
          name: item.name ?? item.title ?? String(item.id),
        }))

        if (!cancelled) {
          setClassOptions(prev => {
            // Merge so a class id seeded from the student record (in case
            // the class list doesn't happen to include it) is preserved.
            const freshIds = new Set(list.map(c => String(c.id)))
            const missing = prev.filter(c => !freshIds.has(String(c.id)))
            return [...missing, ...list]
          })
          if (list.length === 0) setClassesError('কোনো শ্রেণি পাওয়া যায়নি')
        }
      } catch (err) {
        if (!cancelled) {
          setClassOptions(prev => (prev.length > 0 ? prev : FALLBACK_CLASS_OPTIONS))
          setClassesError(err instanceof Error && err.message === 'unauthenticated' ? 'আপনার সেশনের মেয়াদ শেষ হয়ে গেছে, অনুগ্রহ করে আবার লগইন করুন' : 'শ্রেণির তালিকা লোড করা যায়নি')
        }
      } finally {
        if (!cancelled) setClassesLoading(false)
      }
    }

    loadClasses()
    return () => {
      cancelled = true
    }
  }, [])

  // Load class-specific divisions/groups whenever class changes. Merges with
  // any already-hydrated seed instead of overwriting it.
  useEffect(() => {
    if (hydratingRef.current > 0) {
      hydratingRef.current -= 1
    } else {
      setClassDivisionId('')
      setClassDivisionOptions([])
    }
    setClassDivisionsError('')

    if (!classId) return

    let cancelled = false

    async function loadClassDivisions() {
      setClassDivisionsLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/student/division/${classId}`, {
          headers: { Accept: 'application/json', ...authHeaders() },
        })
        if (!res.ok) throw new Error('Failed to load class divisions')
        const json = await res.json()
        const rawList = Array.isArray(json) ? json : (json.data ?? [])
        const list = normalizeOptions(rawList, ['name'])
        if (!cancelled) setClassDivisionOptions(prev => mergeOptions(prev, list))
      } catch {
        if (!cancelled) setClassDivisionsError('বিভাগের তালিকা লোড করা যায়নি')
      } finally {
        if (!cancelled) setClassDivisionsLoading(false)
      }
    }

    loadClassDivisions()
    return () => {
      cancelled = true
    }
  }, [classId])

  // Load divisions once on mount. Merges with any already-hydrated seed
  // instead of overwriting it, so the selected division's label survives
  // even if the fetched list happens not to contain it.
  useEffect(() => {
    let cancelled = false

    async function loadDivisions() {
      setDivisionsLoading(true)
      setDivisionsError('')
      try {
        const res = await fetch(`${API_BASE_URL}/division`, {
          headers: { Accept: 'application/json', ...authHeaders() },
        })
        if (!res.ok) throw new Error('Failed to load divisions')
        const json = await res.json()
        const rawList = Array.isArray(json) ? json : (json.data ?? [])
        const list = normalizeOptions(rawList, ['name'])
        if (!cancelled) {
          setDivisionOptions(prev => mergeOptions(prev, list))
          if (list.length === 0) setDivisionsError('কোনো বিভাগ পাওয়া যায়নি')
        }
      } catch {
        if (!cancelled) setDivisionsError('বিভাগের তালিকা লোড করা যায়নি')
      } finally {
        if (!cancelled) setDivisionsLoading(false)
      }
    }

    loadDivisions()
    return () => {
      cancelled = true
    }
  }, [])

  // Load districts whenever division changes.
  useEffect(() => {
    if (hydratingRef.current > 0) {
      hydratingRef.current -= 1
    } else {
      setDistrictId('')
      setUpazilaId('')
      setZoneId('')
      setDistrictOptions([])
      setUpazilaOptions([])
      setZoneOptions([])
    }
    setDistrictsError('')
    setUpazilasError('')
    setZonesError('')

    if (!divisionId) return

    let cancelled = false

    async function loadDistricts() {
      setDistrictsLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/district?division_id=${divisionId}`, {
          headers: { Accept: 'application/json', ...authHeaders() },
        })
        if (!res.ok) throw new Error('Failed to load districts')
        const json = await res.json()
        const rawList = Array.isArray(json) ? json : (json.data ?? [])
        const list = normalizeOptions(rawList, ['district_name', 'name'])
        if (!cancelled) {
          setDistrictOptions(prev => mergeOptions(prev, list))
          if (list.length === 0) setDistrictsError('কোনো জেলা পাওয়া যায়নি')
        }
      } catch {
        if (!cancelled) setDistrictsError('জেলার তালিকা লোড করা যায়নি')
      } finally {
        if (!cancelled) setDistrictsLoading(false)
      }
    }

    loadDistricts()
    return () => {
      cancelled = true
    }
  }, [divisionId])

  // Load upazilas whenever district changes.
  useEffect(() => {
    if (hydratingRef.current > 0) {
      hydratingRef.current -= 1
    } else {
      setUpazilaId('')
      setZoneId('')
      setUpazilaOptions([])
      setZoneOptions([])
    }
    setUpazilasError('')
    setZonesError('')

    if (!districtId) return

    let cancelled = false

    async function loadUpazilas() {
      setUpazilasLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/upazila?district_id=${districtId}`, {
          headers: { Accept: 'application/json', ...authHeaders() },
        })
        if (!res.ok) throw new Error('Failed to load upazilas')
        const json = await res.json()
        const rawList = Array.isArray(json) ? json : (json.data ?? [])
        const list = normalizeOptions(rawList, ['name', 'name'])
        if (!cancelled) {
          setUpazilaOptions(prev => mergeOptions(prev, list))
          if (list.length === 0) setUpazilasError('কোনো উপজেলা পাওয়া যায়নি')
        }
      } catch {
        if (!cancelled) setUpazilasError('উপজেলার তালিকা লোড করা যায়নি')
      } finally {
        if (!cancelled) setUpazilasLoading(false)
      }
    }

    loadUpazilas()
    return () => {
      cancelled = true
    }
  }, [districtId])

  // Load zones whenever upazila changes.
  useEffect(() => {
    if (hydratingRef.current > 0) {
      hydratingRef.current -= 1
    } else {
      setZoneId('')
      setZoneOptions([])
    }
    setZonesError('')

    if (!upazilaId) return

    let cancelled = false

    async function loadZones() {
      setZonesLoading(true)
      try {
        const res = await fetch(`${API_BASE_URL}/zone?upazila_id=${upazilaId}`, {
          headers: { Accept: 'application/json', ...authHeaders() },
        })
        if (!res.ok) throw new Error('Failed to load zones')
        const json = await res.json()
        const rawList = Array.isArray(json) ? json : (json.data ?? [])
        const list = normalizeOptions(rawList, ['name'])
        if (!cancelled) {
          setZoneOptions(prev => mergeOptions(prev, list))
          if (list.length === 0) setZonesError('কোনো জোন পাওয়া যায়নি')
        }
      } catch {
        if (!cancelled) setZonesError('জোনের তালিকা লোড করা যায়নি')
      } finally {
        if (!cancelled) setZonesLoading(false)
      }
    }

    loadZones()
    return () => {
      cancelled = true
    }
  }, [upazilaId])

  // Fetch the existing student record for this id and pre-fill the form.
  useEffect(() => {
    let cancelled = false

    async function loadStudent() {
      if (!studentId) {
        setStudentLoading(false)
        setStudentError('শিক্ষার্থীর আইডি পাওয়া যায়নি')
        return
      }

      setStudentLoading(true)
      setStudentError('')

      try {
        const res = await fetch(`${API_BASE_URL}/user/student/info/${studentId}`, {
          headers: {
            Accept: 'application/json',
            ...authHeaders(),
          },
        })

        if (res.status === 401) {
          throw new Error('unauthenticated')
        }
        if (!res.ok) throw new Error('Failed to load student')

        const json = await res.json()
        // Response::successResponse($msg, $dataInfo) wraps the record under `data`.
        const data = Array.isArray(json?.data) ? json.data[0] : (json.data ?? json)

        if (cancelled || !data) return

        setNameBn(pick(data, ['name_bn']))
        setNameEn(pick(data, ['name_en']))
        setFatherNameBn(pick(data, ['father_name_bn']))
        setMotherNameBn(pick(data, ['mother_name_bn']))
        setFatherNameEn(pick(data, ['father_name_en']))
        setMotherNameEn(pick(data, ['mother_name_en']))
        setBirthCertificateNo(pick(data, ['birth_certificate_no']))
        setMobileNo(pick(data, ['mobile_no']))
        setVillageMahalla(pick(data, ['village_mahalla']))
        setPostOffice(pick(data, ['post_office']))
        setGender(pick(data, ['gender']))
        setBloodGroup(pick(data, ['blood_group']))
        setReligion(pick(data, ['religion']))

        if (data.photo) {
          setExistingPhotoUrl(data.photo.startsWith('http') ? data.photo : `${IMAGE_BASE_URL}${data.photo}`)
        }

        // Seed each dropdown with the name that came back embedded on the
        // student record, so the correct label shows immediately instead of
        // a blank field while /district, /upazila, /zone are still loading.
        // Later list-fetch effects merge into these instead of overwriting.
        setDivisionOptions(prev => mergeOptions(prev, seedOption(data.division, ['name'])))
        setDistrictOptions(prev => mergeOptions(prev, seedOption(data.district, ['name', 'name'])))
        setUpazilaOptions(prev => mergeOptions(prev, seedOption(data.upazila, ['name', 'name'])))
        setZoneOptions(prev => mergeOptions(prev, seedOption(data.zone, ['name'])))

        // Also seed the class label in case /student/class doesn't include it.
        if (data.student_class_id != null) {
          setClassOptions(prev =>
            prev.some(o => String(o.id) === String(data.student_class_id)) ? prev : [...prev, { id: data.student_class_id, name: pick(data, ['class_name']) || String(data.student_class_id) }]
          )
        }

        // Tell the cascading effects above to skip their usual
        // "clear children" behavior for this one hydration pass.
        hydratingRef.current = 4

        setClassId(pick(data, ['student_class_id', 'class_id']))
        setClassDivisionId(pick(data, ['student_division_id', 'class_division_id']))
        setDivisionId(pick(data, ['division_id']))
        setDistrictId(pick(data, ['district_id']))
        setUpazilaId(pick(data, ['upazila_id', 'upazila_id']))
        setZoneId(pick(data, ['zone_id']))
      } catch (err) {
        if (!cancelled) {
          setStudentError(err instanceof Error && err.message === 'unauthenticated' ? 'আপনার সেশনের মেয়াদ শেষ হয়ে গেছে, অনুগ্রহ করে আবার লগইন করুন' : 'শিক্ষার্থীর তথ্য লোড করা যায়নি')
        }
      } finally {
        if (!cancelled) setStudentLoading(false)
      }
    }

    loadStudent()
    return () => {
      cancelled = true
    }
  }, [studentId])

  const handlePhotoPick = (file: File) => {
    setPhotoFile(file)
    setPhotoPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')

    if (!studentId) {
      setSubmitState('error')
      setErrorMessage('শিক্ষার্থীর আইডি পাওয়া যায়নি')
      return
    }

    if (!classId) {
      setErrorMessage('অনুগ্রহ করে শ্রেণি নির্বাচন করুন')
      return
    }

    const token = getAuthToken()
    if (!token) {
      setSubmitState('error')
      setErrorMessage('আপনি লগইন করেননি। অনুগ্রহ করে প্রথমে লগইন করুন।')
      return
    }

    setSubmitState('submitting')

    try {
      const formData = new FormData()
      formData.append('school_id', String(schoolId))
      formData.append('student_class_id', classId)
      formData.append('name_bn', nameBn)
      formData.append('name_en', nameEn)
      formData.append('father_name_bn', fatherNameBn)
      formData.append('mother_name_bn', motherNameBn)
      formData.append('father_name_en', fatherNameEn)
      formData.append('mother_name_en', motherNameEn)
      if (gender) formData.append('gender', gender)
      if (bloodGroup) formData.append('blood_group', bloodGroup)
      if (birthCertificateNo) formData.append('birth_certificate_no', birthCertificateNo)
      if (religion) formData.append('religion', religion)
      if (mobileNo) formData.append('mobile_no', mobileNo)
      if (villageMahalla) formData.append('village_mahalla', villageMahalla)
      if (postOffice) formData.append('post_office', postOffice)
      if (classDivisionId) formData.append('student_division_id', classDivisionId)
      if (divisionId) formData.append('division_id', divisionId)
      if (districtId) formData.append('district_id', districtId)
      if (upazilaId) formData.append('upazila_id', upazilaId)
      if (zoneId) formData.append('zone_id', zoneId)
      // Only send a new photo if the user picked one — otherwise the
      // existing photo on the server is left untouched.
      if (photoFile) formData.append('photo', photoFile)

      const res = await fetch(`${API_BASE_URL}/user/student/update/${studentId}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
          // NOTE: do NOT set Content-Type manually here — the browser
          // needs to set it (with the correct multipart boundary) itself
          // when the body is a FormData instance.
        },
        body: formData,
      })

      if (res.status === 401) {
        throw new Error('আপনার সেশনের মেয়াদ শেষ হয়ে গেছে, অনুগ্রহ করে আবার লগইন করুন')
      }

      const json = await res.json()

      if (!res.ok || json.status === false || json.success === false) {
        throw new Error(json.message || 'আপডেট করা সম্ভব হয়নি')
      }

      setSubmitState('success')
      router.push('/auth/student/list')
    } catch (err) {
      setSubmitState('error')
      setErrorMessage(err instanceof Error ? err.message : 'কিছু একটা সমস্যা হয়েছে')
    }
  }

  if (studentLoading) {
    return (
      <div className='flex w-full items-center justify-center bg-gray-50 px-4 py-20'>
        <span className='text-sm text-gray-400'>লোড হচ্ছে...</span>
      </div>
    )
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
          শিক্ষার্থীর তথ্য সম্পাদনা করুন
        </h1>

        {studentError && <div className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>{studentError}</div>}
        {submitState === 'success' && <div className='rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700'>শিক্ষার্থীর তথ্য সফলভাবে হালনাগাদ হয়েছে।</div>}
        {submitState === 'error' && errorMessage && <div className='rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700'>{errorMessage}</div>}

        <div className='grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2'>
          <Field label='পরীক্ষার্থীর নাম (ইংরেজিতে)'>
            <input className={inputClass} placeholder='পরীক্ষার্থীর নাম লিখুন' value={nameEn} onChange={e => setNameEn(filterEnglishText(e.target.value))} required />
          </Field>

          <Field label='পিতার নাম (ইংরেজিতে)'>
            <input className={inputClass} placeholder='পিতার নাম লিখুন' value={fatherNameEn} onChange={e => setFatherNameEn(filterEnglishText(e.target.value))} required />
          </Field>
          <Field label='মাতার নাম (ইংরেজিতে)'>
            <input className={inputClass} placeholder='মাতার নাম লিখুন' value={motherNameEn} onChange={e => setMotherNameEn(filterEnglishText(e.target.value))} required />
          </Field>

          <Field label='মোবাইল নং (ইংরেজিতে)'>
            <input className={inputClass} placeholder='মোবাইল নম্বর লিখুন' value={mobileNo} onChange={e => setMobileNo(filterMobileNumber(e.target.value))} inputMode='numeric' />
          </Field>
          <Field label='জন্ম সনদ নং'>
            <input className={inputClass} placeholder='পরীক্ষার্থীর জন্ম সনদ নম্বর লিখুন' value={birthCertificateNo} onChange={e => setBirthCertificateNo(e.target.value)} />
          </Field>

          <Field label='পরীক্ষার্থীর নাম (বাংলায়)'>
            <input className={inputClass} placeholder='পরীক্ষার্থীর নাম লিখুন' value={nameBn} onChange={e => setNameBn(filterBengaliText(e.target.value))} required />
          </Field>

          <Field label='পিতার নাম (বাংলায়)'>
            <input className={inputClass} placeholder='পিতার নাম লিখুন' value={fatherNameBn} onChange={e => setFatherNameBn(filterBengaliText(e.target.value))} required />
          </Field>
          <Field label='মাতার নাম (বাংলায়)'>
            <input className={inputClass} placeholder='মাতার নাম লিখুন' value={motherNameBn} onChange={e => setMotherNameBn(filterBengaliText(e.target.value))} required />
          </Field>

          <Field label='লিঙ্গ'>
            <Select placeholder='নির্বাচন করুন...' options={genderOptions} value={gender} onChange={setGender} />
          </Field>
          <Field label='রক্তের গ্রুপ'>
            <Select placeholder='নির্বাচন করুন...' options={bloodGroupOptions} value={bloodGroup} onChange={setBloodGroup} />
          </Field>

          <Field label='ধর্ম'>
            <Select placeholder='নির্বাচন করুন...' options={religionOptions} value={religion} onChange={setReligion} />
          </Field>

          <Field label='শ্রেণি'>
            <Select
              placeholder={classesLoading ? 'লোড হচ্ছে...' : 'নির্বাচন করুন...'}
              options={classOptions.map(c => ({ value: String(c.id), label: c.name }))}
              value={classId}
              onChange={setClassId}
              disabled={classesLoading}
            />
            {classesError && <p className='mt-1.5 text-xs text-red-500'>{classesError}</p>}
          </Field>

          {classDivisionOptions.length > 0 && (
            <Field label='শাখা'>
              <Select
                placeholder={classDivisionsLoading ? 'লোড হচ্ছে...' : 'নির্বাচন করুন...'}
                options={classDivisionOptions.map(o => ({ value: String(o.id), label: o.name }))}
                value={classDivisionId}
                onChange={setClassDivisionId}
                disabled={classDivisionsLoading}
              />
              {classDivisionsError && <p className='mt-1.5 text-xs text-red-500'>{classDivisionsError}</p>}
            </Field>
          )}

          <div className='sm:col-span-2'>
            <label className={labelClass}>ঠিকানা (বাংলায়)</label>
            <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
              <input className={inputClass} placeholder='গ্রাম/মহল্লা' value={villageMahalla} onChange={e => setVillageMahalla(filterBengaliText(e.target.value))} />
              <input className={inputClass} placeholder='ডাকঘর' value={postOffice} onChange={e => setPostOffice(filterBengaliText(e.target.value))} />

              <div>
                <Select
                  placeholder={divisionsLoading ? 'লোড হচ্ছে...' : 'বিভাগ নির্বাচন করুন...'}
                  options={divisionOptions.map(o => ({ value: String(o.id), label: o.name }))}
                  value={divisionId}
                  onChange={setDivisionId}
                  disabled={divisionsLoading}
                />
                {divisionsError && <p className='mt-1.5 text-xs text-red-500'>{divisionsError}</p>}
              </div>

              <div>
                <Select
                  placeholder={districtsLoading ? 'লোড হচ্ছে...' : 'জেলা নির্বাচন করুন...'}
                  options={districtOptions.map(o => ({ value: String(o.id), label: o.name }))}
                  value={districtId}
                  onChange={setDistrictId}
                  disabled={!divisionId || districtsLoading}
                />
                {districtsError && <p className='mt-1.5 text-xs text-red-500'>{districtsError}</p>}
              </div>

              <div>
                <Select
                  placeholder={upazilasLoading ? 'লোড হচ্ছে...' : 'উপজেলা নির্বাচন করুন...'}
                  options={upazilaOptions.map(o => ({ value: String(o.id), label: o.name }))}
                  value={upazilaId}
                  onChange={setUpazilaId}
                  disabled={!districtId || upazilasLoading}
                />
                {upazilasError && <p className='mt-1.5 text-xs text-red-500'>{upazilasError}</p>}
              </div>

              <div>
                <Select
                  placeholder={zonesLoading ? 'লোড হচ্ছে...' : 'জোন নির্বাচন করুন...'}
                  options={zoneOptions.map(o => ({ value: String(o.id), label: o.name }))}
                  value={zoneId}
                  onChange={setZoneId}
                  disabled={!upazilaId || zonesLoading}
                />
                {zonesError && <p className='mt-1.5 text-xs text-red-500'>{zonesError}</p>}
              </div>
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

          <Field label='ছবি প্রিভিউ দেখুন' optional>
            <div className='flex h-[136px] w-full items-center rounded-lg border border-white px-3 py-2'>
              {photoPreviewUrl || existingPhotoUrl ? (
                <img src={photoPreviewUrl ?? existingPhotoUrl ?? ''} alt='ছবি প্রিভিউ' className='h-28 w-28 rounded-lg object-cover' />
              ) : (
                <div className='flex h-full w-full items-center justify-center rounded-lg border border-dashed border-gray-300'>
                  <span className='text-sm text-gray-400'>কোনো ছবি নির্বাচিত হয়নি</span>
                </div>
              )}
            </div>
          </Field>
        </div>

        <div className='mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between'>
          <button type='button' className='rounded-lg border border-gray-300 px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50'>
            ফরমের পূর্বরূপ দেখুন
          </button>
          <button
            type='submit'
            disabled={submitState === 'submitting'}
            className='rounded-lg bg-orange-500 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60'
          >
            {submitState === 'submitting' ? 'হালনাগাদ হচ্ছে...' : 'আপডেট করুন'}
          </button>
        </div>
      </form>

      {showPhotoModal && <PhotoPickerModal onClose={() => setShowPhotoModal(false)} onPick={handlePhotoPick} />}
    </div>
  )
}
