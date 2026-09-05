import { useEffect, useMemo, useState } from 'react'
import Papa from 'papaparse'
import dynamic from 'next/dynamic'
import Link from 'next/link'

const VegaLite = dynamic(() => import('react-vega').then(mod => mod.VegaLite), { ssr: false })

type Row = { [k: string]: string }

export default function Dashboard() {
  const [rows, setRows] = useState<Row[]>([])
  useEffect(() => {
    fetch('/sample-data.csv')
      .then(r => r.text())
      .then(t => {
        const parsed = Papa.parse<Row>(t, { header: true, dynamicTyping: true })
        setRows(parsed.data.filter(r => Object.keys(r).length > 0))
      })
  }, [])

  const timeSeriesSpec = useMemo(() => ({
    data: { name: 'table' },
    mark: 'line',
    encoding: {
      x: { field: 'date', type: 'temporal', title: 'Date' },
      y: { field: 'value', type: 'quantitative', title: 'Value' }
    }
  }), [])

  const breakdownSpec = useMemo(() => ({
    data: { name: 'table' },
    mark: 'bar',
    encoding: {
      x: { field: 'category', type: 'ordinal', title: 'Category' },
      y: { aggregate: 'sum', field: 'value', type: 'quantitative', title: 'Total Value' }
    }
  }), [])

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Example Dashboard</h2>
        <div className="flex gap-3">
          <Link href="/"><a className="text-sm text-indigo-600">Home</a></Link>
          <Link href="/upload"><a className="text-sm text-indigo-600">Upload CSV</a></Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="mb-2 font-medium">Time Series</h3>
          {rows.length > 0 ? (
            <VegaLite spec={timeSeriesSpec} data={{ table: rows.map(r => ({ date: r.date, value: Number(r.value) })) }} />
          ) : (
            <p className="text-sm text-gray-500">No data loaded. Upload CSV or use the sample CSV.</p>
          )}
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h3 className="mb-2 font-medium">Category Breakdown</h3>
          {rows.length > 0 ? (
            <VegaLite spec={breakdownSpec} data={{ table: rows.map(r => ({ category: r.category, value: Number(r.value) })) }} />
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
