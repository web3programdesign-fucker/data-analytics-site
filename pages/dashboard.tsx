import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
import Link from 'next/link'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line, Bar } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
)

type Row = { [k: string]: any }

export default function Dashboard() {
  const [rows, setRows] = useState<Row[]>([])
  useEffect(() => {
    fetch('/sample-data.csv')
      .then(r => r.text())
      .then(t => {
        const parsed = Papa.parse<Row>(t, { header: true, dynamicTyping: true })
        setRows(parsed.data.filter((r: any) => Object.keys(r).length > 0))
      })
  }, [])

  const labels = useMemo(() => rows.map(r => r.date), [rows])
  const values = useMemo(() => rows.map(r => Number(r.value)), [rows])
  const categories = useMemo(() => {
    const map: Record<string, number> = {}
    for (const r of rows) {
      const c = String(r.category ?? 'Unknown')
      map[c] = (map[c] || 0) + Number(r.value || 0)
    }
    return Object.keys(map).map(k => ({ category: k, value: map[k] }))
  }, [rows])

  const lineData = {
    labels,
    datasets: [
      {
        label: 'Value',
        data: values,
        borderColor: 'rgb(37, 99, 235)',
        backgroundColor: 'rgba(37, 99, 235, 0.5)'
      }
    ]
  }

  const barData = {
    labels: categories.map(c => c.category),
    datasets: [
      {
        label: 'Total Value',
        data: categories.map(c => c.value),
        backgroundColor: ['#60A5FA', '#34D399', '#FBBF24', '#F87171']
      }
    ]
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Example Dashboard (Chart.js)</h2>
        <div className="flex gap-3">
          <Link href="/"><a className="text-sm text-indigo-600">Home</a></Link>
          <Link href="/upload"><a className="text-sm text-indigo-600">Upload CSV</a></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="mb-2 font-medium">Time Series</h3>
          {rows.length > 0 ? (
            <Line data={lineData} />
          ) : (
            <p className="text-sm text-gray-500">No data loaded. Upload CSV or use the sample CSV.</p>
          )}
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="mb-2 font-medium">Category Breakdown</h3>
          {rows.length > 0 ? (
            <Bar data={barData} />
          ) : (
            <p className="text-sm text-gray-500">No data loaded.</p>
          )}
        </div>
      </div>

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h4 className="font-medium mb-2">Raw data (first 10 rows)</h4>
        <pre className="text-xs overflow-auto p-2 bg-slate-50 rounded">{JSON.stringify(rows.slice(0,10), null, 2)}</pre>
      </div>
    </div>
  )
}
