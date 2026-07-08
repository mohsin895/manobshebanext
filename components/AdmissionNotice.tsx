type AdmissionNoticeProps = {
  admittedCount: string
  totalSeats: string
  seatsRemaining: string
}

export function AdmissionNotice({ admittedCount, totalSeats, seatsRemaining }: AdmissionNoticeProps) {
  return (
    <div className='flex items-center gap-2 rounded-[12px] border border-[#EEF0F4] bg-white px-4 py-3'>
      <span className='h-2 w-2 shrink-0 rounded-full bg-[#22C55E]' />
      <p className='font-bn text-[13px] leading-5 text-[#374151]'>
        <span className='font-semibold text-[#1C1D4A]'>
          {admittedCount}/{totalSeats}
        </span>{' '}
        জন আবেদন সম্পন্ন করেছেন। এখনও {seatsRemaining} টি সিট বাকি আছে।
      </p>
    </div>
  )
}
