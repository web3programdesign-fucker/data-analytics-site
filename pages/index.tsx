import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full p-8 bg-white rounded shadow">
        <h1 className="text-2xl font-semibold mb-4">Data Analytics Starter</h1>
        <p className="mb-6">Next.js + TypeScript + Tailwind + Vega-Lite. Example CSV upload and dashboard.</p>
        <div className="flex gap-3">
          <Link href="/upload"><a className="px-4 py-2 bg-indigo-600 text-white rounded">Upload CSV</a></Link>
          <Link href="/dashboard"><a className="px-4 py-2 bg-slate-200 rounded">View Dashboard</a></Link>
          <a className="px-4 py-2 bg-gray-100 rounded" href="/sample-data.csv" download>Download sample CSV</a>
        </div>
      </div>
    </div>
  )
}
