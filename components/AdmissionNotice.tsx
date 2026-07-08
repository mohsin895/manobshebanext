type AdmissionNoticeProps = {
  admittedCount: string
  totalSeats: string
  seatsRemaining: string
}

export function AdmissionNotice({ admittedCount, totalSeats, seatsRemaining }: AdmissionNoticeProps) {
  return (
    <div
      className='
    flex
    h-[72px]
    w-full
    items-center

    rounded-[8px]
    border-l-[8px]
    border-l-[#FFA071]
    bg-[#FFF4ED]
    p-[12px]
  '
    >
      <p
        className='
    font-bn
    text-[16px]
    font-normal
    leading-[24px]
    tracking-[0]
    text-[#282929]
    md:text-[20px]
    md:font-medium
    md:leading-[48px]
  '
      >
        {admittedCount}/{totalSeats}
        জন আবেদন সম্পন্ন করেছেন। এখনও {seatsRemaining} টি সিট বাকি আছে।
      </p>
    </div>
  )
}
