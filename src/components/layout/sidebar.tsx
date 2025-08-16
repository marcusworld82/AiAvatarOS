'use client'

'use client'

import { motion } from 'framer-motion'
import { usePathname, useRouter } from 'next/navigation'
import { 
  LayoutDashboard, 
  Palette, 
  Calendar, 
  Send, 
  MessageSquare, 
  BarChart3, 
  FlaskConical, 
  Library, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { id: 'studio', label: 'Studio', icon: Palette, href: '/studio' },
  { id: 'calendar', label: 'Calendar', icon: Calendar, href: '/calendar' },
  { id: 'publish', label: 'Publish', icon: Send, href: '/publish' },
  { id: 'inbox', label: 'Inbox', icon: MessageSquare, href: '/inbox' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { id: 'content-lab', label: 'Content Lab', icon: FlaskConical, href: '/content-lab' },
  { id: 'library', label: 'Library', icon: Library, href: '/library' },
  { id: 'avatars', label: 'Avatars', icon: Users, href: '/avatars' },
  { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <motion.div
      animate={{ width: collapsed ? 84 : 272 }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white dark:bg-[#111111] border-r border-[#E5E7EB] dark:border-[#1F2937] flex flex-col h-full"
    >
      {/* Logo area */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-[#E5E7EB] dark:border-[#1F2937]">
        <motion.div
          animate={{ opacity: collapsed ? 0 : 1 }}
          transition={{ duration: 0.22 }}
          className="flex items-center space-x-3"
        >
          <div className="w-8 h-8 bg-[#111111] dark:bg-[#F5F5F5] rounded-lg flex items-center justify-center">
            <span className="text-white dark:text-[#111111] font-bold text-sm">AI</span>
          </div>
          {!collapsed && <span className="text-lg font-bold">Avatar OS</span>}
        </motion.div>
        
        <button
          onClick={onToggle}
          className="w-6 h-6 flex items-center justify-center text-[#6B7280] hover:text-[#111111] dark:hover:text-[#F5F5F5] transition-colors duration-120"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6">
        <ul className="space-y-2 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            
            return (
              <li key={item.id}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => router.push(item.href)}
                  className={cn(
                    "w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-140",
                    isActive 
                      ? 'bg-[#111111] text-white dark:bg-[#F5F5F5] dark:text-[#111111]' 
                      : 'text-[#6B7280] hover:bg-[#F9FAFB] dark:hover:bg-[#1F2937] hover:text-[#111111] dark:hover:text-[#F5F5F5]'
                  )}
                >
                  <Icon size={20} />
                  <motion.span
                    animate={{ opacity: collapsed ? 0 : 1 }}
                    transition={{ duration: 0.22 }}
                    className="font-medium text-sm"
                  >
                    {item.label}
                  </motion.span>
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>
    </motion.div>
  )
}