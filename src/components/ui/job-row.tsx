'use client'

import { motion } from 'framer-motion'
import { RefreshCw, CheckCircle, AlertCircle, Clock } from 'lucide-react'

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

interface JobRowProps {
  provider: string
  model: string
  kind: string
  status: 'running' | 'completed' | 'failed'
  cost: number
  retry?: () => void
}

export function JobRow({ provider, model, kind, status, cost, retry }: JobRowProps) {
  const getStatusIcon = () => {
    switch (status) {
      case 'running':
        return <RefreshCw size={16} className="text-[#EAB308] animate-spin" />
      case 'completed':
        return <CheckCircle size={16} className="text-[#16A34A]" />
      case 'failed':
        return <AlertCircle size={16} className="text-[#DC2626]" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case 'running':
        return 'text-[#EAB308] bg-[#FEF3C7] dark:bg-[#1F1F0B]'
      case 'completed':
        return 'text-[#16A34A] bg-[#DCFCE7] dark:bg-[#0B1F0F]'
      case 'failed':
        return 'text-[#DC2626] bg-[#FEE2E2] dark:bg-[#1F0B0B]'
    }
  }

  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className="flex items-center justify-between p-4 bg-[#F9FAFB] dark:bg-[#0B0B0B] rounded-lg border border-[#E5E7EB] dark:border-[#1F2937] hover:shadow-sm transition-all duration-140"
    >
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`px-2 py-1 rounded-md text-[11px] font-medium uppercase tracking-wide ${getStatusColor()}`}>
            {status}
          </span>
        </div>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-[15px] font-medium">{kind}</span>
            <span className="text-[13px] text-[#6B7280]">•</span>
            <span className="text-[13px] text-[#6B7280]">{provider} {model}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="text-right">
          <div className="text-[15px] font-medium">{formatCurrency(cost)}</div>
        </div>
        
        {status === 'failed' && retry && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={retry}
            className="w-8 h-8 flex items-center justify-center text-[#6B7280] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-white dark:hover:bg-[#1F2937] rounded-lg transition-all duration-120"
          >
            <RefreshCw size={16} />
          </motion.button>
        )}
      </div>
    </motion.div>
  )
}