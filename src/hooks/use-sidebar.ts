'use client'

import { useState, useEffect } from 'react'

export function useSidebar() {
  const [collapsed, setCollapsed] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('sidebar-collapsed')
    if (stored) {
      setCollapsed(JSON.parse(stored))
    }
  }, [])

  const toggle = () => {
    const newState = !collapsed
    setCollapsed(newState)
    localStorage.setItem('sidebar-collapsed', JSON.stringify(newState))
  }

  return { collapsed, toggle }
}