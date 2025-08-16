'use client'

'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  ChevronDown, 
  Plus, 
  Image, 
  Video, 
  Calendar, 
  MessageSquare,
  Moon,
  Sun
} from 'lucide-react'

export function TopBar() {
  const [showQuickActions, setShowQuickActions] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  const quickActions = [
    { label: 'New Idea', icon: Plus },
    { label: 'Render Image', icon: Image },
    { label: 'Render Video', icon: Video },
    { label: 'Schedule Post', icon: Calendar },
    { label: 'Open Inbox', icon: MessageSquare },
  ]

  return (
    <div className="h-16 bg-white dark:bg-[#111111] border-b border-[#E5E7EB] dark:border-[#1F2937] flex items-center justify-between px-6">
      {/* Left section */}
      <div className="flex items-center space-x-4">
        {/* Org switcher */}
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#F9FAFB] dark:bg-[#1F2937] rounded-lg">
          <div className="w-6 h-6 bg-[#111111] dark:bg-[#F5F5F5] rounded-md"></div>
          <span className="text-sm font-medium">Acme Corp</span>
          <ChevronDown size={14} className="text-[#6B7280]" />
        </div>

        {/* Avatar switcher */}
        <div className="flex items-center space-x-2 px-3 py-1.5 bg-[#F9FAFB] dark:bg-[#1F2937] rounded-lg">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
          <span className="text-sm font-medium">Maya AI</span>
          <ChevronDown size={14} className="text-[#6B7280]" />
        </div>
      </div>

      {/* Center section */}
      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search everything..."
            className="w-full pl-10 pr-4 py-2 bg-[#F9FAFB] dark:bg-[#1F2937] border border-[#E5E7EB] dark:border-[#374151] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#111111] dark:focus:ring-[#F5F5F5] focus:ring-offset-2"
          />
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center space-x-4">
        {/* Quick actions */}
        <div className="relative">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowQuickActions(!showQuickActions)}
            className="flex items-center space-x-2 px-4 py-2 bg-[#111111] dark:bg-[#F5F5F5] text-white dark:text-[#111111] rounded-lg font-medium text-sm hover:shadow-md transition-all duration-140"
          >
            <Plus size={18} />
            <span>Quick Actions</span>
          </motion.button>

          <AnimatePresence>
            {showQuickActions && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.22 }}
                className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-[#111111] border border-[#E5E7EB] dark:border-[#1F2937] rounded-lg shadow-lg z-50"
              >
                {quickActions.map((action) => {
                  const Icon = action.icon
                  return (
                    <button
                      key={action.label}
                      className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937] transition-colors duration-120 first:rounded-t-lg last:rounded-b-lg"
                    >
                      <Icon size={18} className="text-[#6B7280]" />
                      <span className="text-sm font-medium">{action.label}</span>
                    </button>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-10 h-10 flex items-center justify-center text-[#6B7280] hover:text-[#111111] dark:hover:text-[#F5F5F5] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937] rounded-lg transition-all duration-120"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-teal-600 rounded-full"></div>
      </div>
    </div>
  )
}