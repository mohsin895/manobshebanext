type AdmissionNoticeProps = {
  admittedCount: string
  totalSeats: string
  seatsRemaining: string
  isFull?: boolean
}

// Converts English digits (0-9) to Bengali numerals (০-৯) for display.
const toBengaliDigits = (value: string) => {
  const bnDigits = '০১২৩৪৫৬৭৮৯'
  return value.replace(/[0-9]/g, d => bnDigits[Number(d)])
}

export function AdmissionNotice({ admittedCount, totalSeats, seatsRemaining, isFull = false }: AdmissionNoticeProps) {
  const admittedBn = toBengaliDigits(admittedCount)
  const totalBn = toBengaliDigits(totalSeats)
  const remainingBn = toBengaliDigits(seatsRemaining)

  return (
    <div
      className={`
        flex h-[72px] w-full items-center rounded-[8px] border-l-[8px] p-[12px]
        ${isFull ? 'border-l-[#28A745] bg-[#EAF7EE]' : 'border-l-[#FFA071] bg-[#FFF4ED]'}
      `}
    >
      <p
        className={`
          font-bn
          text-[16px]
          font-normal
          leading-[24px]
          tracking-[0]
          md:text-[20px]
          md:font-medium
          md:leading-[48px]
          ${isFull ? 'text-[#1E7B34]' : 'text-[#282929]'}
        `}
      >
        {admittedBn}/{totalBn}
        {isFull ? ' জন আবেদন সম্পন্ন করেছেন। আসন পূর্ণ হয়েছে।' : ` জন আবেদন সম্পন্ন করেছেন। এখনও ${remainingBn} টি সিট বাকি আছে।`}
      </p>
    </div>
  )
}
