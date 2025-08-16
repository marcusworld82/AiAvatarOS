'use client'

'use client'

import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'

interface InsightChartProps {
  metric: string
  timeseries: Array<{ date: string; value: number }>
}

export function InsightChart({ metric, timeseries }: InsightChartProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">{metric}</h3>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.24 }}
        className="h-64"
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timeseries}>
            <XAxis 
              dataKey="date" 
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              fontSize={11}
              tickLine={false}
              axisLine={false}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#111111" 
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </Card>
  )
}