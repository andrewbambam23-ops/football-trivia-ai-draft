// src/components/DraftBoard.tsx
'use client'
import React from 'react'
import PlayerCard from './PlayerCard'

export default function DraftBoard(){
  const slots = new Array(8).fill(null).map((_,i)=>({id:i, position: ['QB','RB','RB','WR','WR','WR','TE','DEF'][i]}))
  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="font-semibold mb-3">Your Roster</h3>
      <div className="grid grid-cols-4 gap-4">
        {slots.map(s => (
          <div key={s.id} className="border rounded p-3 h-32 flex flex-col justify-between">
            <div className="text-sm text-slate-600">{s.position}</div>
            <div className="text-xs text-slate-400">Slot {s.id+1}</div>
            <PlayerCard />
          </div>
        ))}
      </div>
    </div>
  )
}
