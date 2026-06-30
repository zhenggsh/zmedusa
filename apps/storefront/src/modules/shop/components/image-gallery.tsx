"use client"

import { useState } from "react"
import Image from "next/image"
import { HttpTypes } from "@medusajs/types"

interface ImageGalleryProps {
  images: HttpTypes.StoreProductImage[]
  productTitle: string
}

export function ImageGallery({ images, productTitle }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const imageList = images?.length ? images : [{ url: "/images/placeholder.svg" } as HttpTypes.StoreProductImage]
  const selectedImage = imageList[selectedIndex]

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square rounded-shop-card overflow-hidden bg-shop-bg-secondary border border-shop-border relative">
        <Image
          src={selectedImage?.url ?? "/images/placeholder.svg"}
          alt={productTitle}
          fill
          sizes="(max-width: 768px) 100vw, 60vw"
          className="object-cover"
          priority
        />
      </div>
      {imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageList.map((img, idx) => (
            <button
              key={img.id ?? idx}
              onClick={() => setSelectedIndex(idx)}
              className={`flex-shrink-0 w-16 h-16 rounded border overflow-hidden transition-colors relative ${
                idx === selectedIndex
                  ? "border-shop-gold"
                  : "border-shop-border hover:border-shop-gold/50"
              }`}
            >
              <Image
                src={img.url}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
