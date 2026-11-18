'use client'

import Image from 'next/image'
import { useState } from 'react'

/** Main product image with clickable thumbnails (when the product has extra photos). */
export default function ProductGallery({ images, alt, badge }: { images: string[]; alt: string; badge?: string }) {
  const [i, setI] = useState(0)
  const list = images.filter(Boolean)
  return (
    <div className="pd-gal rv">
      <div className="pd-img">
        {badge && <span className="badge">{badge}</span>}
        <Image key={list[i]} src={list[i]} alt={alt} fill priority sizes="(max-width: 1020px) 100vw, 620px" />
      </div>
      {list.length > 1 && (
        <div className="pd-thumbs" role="tablist" aria-label={alt}>
          {list.map((src, j) => (
            <button key={src + j} type="button" role="tab" aria-selected={j === i} className={j === i ? 'on' : ''} onClick={() => setI(j)}>
              <Image src={src} alt="" width={120} height={90} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
