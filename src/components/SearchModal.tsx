// src/components/SearchModal.tsx
'use client'
import React, { useState } from 'react'

export default function SearchModal() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [candidates, setCandidates] = useState<any[]>([])

  async function search() {
    const res = await fetch('/api/draft/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, category_tokens: { raw: query, tokens: [query] }, evaluation_scope: 'Full Career' })
    })
    const data = await res.json()
    setCandidates(data.candidates || [])
  }

  return (
    <div>
      <button onClick={() => setOpen(true)} className="px-3 py-2 bg-blue-600 text-white rounded">Open Search</button>
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-start justify-center p-6">
          <div className="bg-white rounded p-6 w-full max-w-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold">Player Search</h2>
              <button onClick={() => setOpen(false)} className="text-sm">Close</button>
            </div>
            <div className="mt-4">
              <input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full p-2 border rounded" placeholder="Type player or filter..." />
              <div className="mt-2 flex space-x-2">
                <button onClick={search} className="px-3 py-2 bg-slate-700 text-white rounded">Search</button>
                <button onClick={() => { setQuery(''); setCandidates([]) }} className="px-3 py-2 border rounded">Clear</button>
              </div>
            </div>
            <div className="mt-4 max-h-64 overflow-auto">
              {candidates.length === 0 && <div className="text-slate-500">No results</div>}
              {candidates.map((c:any) => (
                <div key={c.id} className="p-2 border-b flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-slate-600">{c.primary_position} • { (c.teams||[]).slice(0,2).join(', ') }</div>
                  </div>
                  <div>
                    <button className="px-3 py-1 bg-green-600 text-white rounded">Pick</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
