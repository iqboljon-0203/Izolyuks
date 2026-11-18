'use client'

import type { ReactNode } from 'react'
import { prefillOrder } from './Calculator'

export default function PrefillButton({ product, message, className, children }: { product?: string; message?: string; className?: string; children: ReactNode }) {
  return (
    <button type="button" className={className} onClick={() => prefillOrder({ product, message })}>
      {children}
    </button>
  )
}
