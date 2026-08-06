// src/app/draft/page.tsx
'use client'
import React, { useEffect, useState } from 'react'
import { getSocket } from '@/lib/socket'
import DraftBoard from '@/components/DraftBoard'
import SearchModal from '@/components/SearchModal'

export default function DraftPage() {
  const [socketReady, setSocketReady] = useState(false)
  useEffect(() => {
    const s = getSocket()
    if (s) setSocketReady(true)
  }, [])

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Draft</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <DraftBoard />
        </div>
        <div>
          <div className="mb-4">Live players & picks</div>
          <button className="btn">Open Search</button>
        </div>
      </div>
      <SearchModal />
    </main>
  )
}
