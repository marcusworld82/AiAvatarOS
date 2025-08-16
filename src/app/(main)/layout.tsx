'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
import dynamic from 'next/dynamic'
import { useSidebar } from '@/hooks/use-sidebar'

const DynamicSidebar = dynamic(() => import('@/components/layout/sidebar').then((mod) => ({ default: mod.Sidebar })), { ssr: false })
const DynamicTopBar = dynamic(() => import('@/components/layout/topbar').then((mod) => ({ default: mod.TopBar })), { ssr: false })

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [queryClient] = useState(() => new QueryClient())
  const { collapsed, toggle } = useSidebar()

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white dark:bg-[#0B0B0B] text-[#111111] dark:text-[#F5F5F5] transition-colors duration-220">
        <div className="flex">
          <DynamicSidebar collapsed={collapsed} onToggle={toggle} />
          
          <div className="flex-1 flex flex-col min-h-screen">
            <DynamicTopBar />
            
            <main className="flex-1 px-6 py-4">
              <div className="max-w-[1440px] mx-auto">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </QueryClientProvider>
  )
}