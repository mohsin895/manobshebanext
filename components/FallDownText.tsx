'use client'

import { useEffect, useRef, useState, ElementType } from 'react'

interface FallDownTextProps {
  text: string
  className?: string
  as?: ElementType
  delayPerChar?: number
  triggerOnView?: boolean
}

function splitGraphemes(text: string): string[] {
  if (typeof Intl !== 'undefined' && (Intl as any).Segmenter) {
    const segmenter = new (Intl as any).Segmenter('bn', { granularity: 'grapheme' })
    return Array.from(segmenter.segment(text), (s: any) => s.segment)
  }
  return Array.from(text)
}

export function FallDownText({ text, className = '', as: Tag = 'p', delayPerChar = 25, triggerOnView = true }: FallDownTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [animate, setAnimate] = useState(!triggerOnView)

  useEffect(() => {
    if (!triggerOnView || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [triggerOnView])

  const words = text.split(' ')
  let globalIndex = 0

  return (
    <Tag ref={ref} className={className}>
      {words.map((word, wIdx) => {
        const graphemes = splitGraphemes(word)
        const wordSpans = graphemes.map(ch => {
          const i = globalIndex++
          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: animate ? 1 : 0,
                transform: animate ? 'translateY(0)' : 'translateY(-30px)',
                transition: animate ? `opacity 0.3s ease ${i * delayPerChar}ms, transform 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * delayPerChar}ms` : 'none',
              }}
            >
              {ch}
            </span>
          )
        })

        if (wIdx < words.length - 1) globalIndex++

        return (
          <span key={wIdx} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {wordSpans}
            {wIdx < words.length - 1 ? '\u00A0' : ''}
          </span>
        )
      })}
    </Tag>
  )
}
