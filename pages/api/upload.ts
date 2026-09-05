import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }
  // In a real app you'd validate and persist data. For this scaffold we echo.
  const { rows } = req.body || {}
  if (!rows) return res.status(400).json({ message: 'No rows provided' })
  return res.status(200).json({ message: 'Received', count: Array.isArray(rows) ? rows.length : 0 })
}
