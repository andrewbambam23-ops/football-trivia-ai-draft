/** Simple landing page */
import Link from 'next/link'

export default function Page() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="max-w-2xl p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-bold">Football Trivia & AI Draft</h1>
        <p className="mt-4 text-slate-600">Scaffolded app with OpenAI + Postgres + Redis. Branch: feature/initial-scaffold</p>
        <div className="mt-6 space-x-4">
          <Link href="/api/draft/search"><a className="text-blue-600">Draft Search API (POST)</a></Link>
        </div>
      </div>
    </main>
  )
}
