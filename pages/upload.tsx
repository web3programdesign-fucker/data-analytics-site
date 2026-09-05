import { useState } from 'react'
import Papa from 'papaparse'

export default function UploadPage() {
  const [preview, setPreview] = useState<any[]>([])
  const [message, setMessage] = useState<string | null>(null)

  const handleFile = (file: File | null) => {
    if (!file) return
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setPreview(results.data as any[])
        setMessage('Parsed locally. You can send to server endpoint if desired.')
      }
    })
  }

  const sendToApi = async () => {
    if (preview.length === 0) return
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rows: preview })
    })
    const data = await res.json()
    setMessage(data.message || 'Uploaded')
  }

  return (
    <div className="p-8">
      <h2 className="text-xl font-semibold mb-4">CSV Upload</h2>
      <div className="bg-white p-4 rounded shadow">
        <input type="file" accept=".csv" onChange={e => handleFile(e.target.files?.[0] ?? null)} />
        <div className="mt-4">
          <button onClick={sendToApi} className="px-3 py-2 bg-indigo-600 text-white rounded">Send to API</button>
        </div>
        {message && <p className="mt-3 text-sm text-green-700">{message}</p>}
      </div>

      <div className="mt-6">
        <h3 className="font-medium mb-2">Preview</h3>
        <div className="overflow-auto bg-white rounded shadow p-4">
          <pre className="text-xs">{JSON.stringify(preview.slice(0, 20), null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
