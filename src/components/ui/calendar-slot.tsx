interface CalendarSlotProps {
  time: string
  channel: string
  status: 'draft' | 'approved' | 'scheduled' | 'posted'
  assetRef: string
}

export function CalendarSlot({ time, channel, status, assetRef }: CalendarSlotProps) {
  const getStatusStyle = () => {
    switch (status) {
      case 'draft':
        return 'bg-[#F3F4F6] text-[#6B7280] dark:bg-[#1F2937] dark:text-[#9CA3AF]'
      case 'approved':
        return 'bg-[#DCFCE7] text-[#16A34A] dark:bg-[#0B1F0F] dark:text-[#22C55E]'
      case 'scheduled':
        return 'bg-[#FEF3C7] text-[#EAB308] dark:bg-[#1F1F0B] dark:text-[#F59E0B]'
      case 'posted':
        return 'bg-[#DBEAFE] text-[#3B82F6] dark:bg-[#0B1426] dark:text-[#60A5FA]'
    }
  }

  const getChannelColor = () => {
    switch (channel.toLowerCase()) {
      case 'instagram':
        return 'bg-gradient-to-r from-purple-500 to-pink-500'
      case 'twitter':
        return 'bg-blue-500'
      case 'linkedin':
        return 'bg-blue-700'
      case 'tiktok':
        return 'bg-black dark:bg-white'
      default:
        return 'bg-[#6B7280]'
    }
  }

  return (
    <div className="flex items-center space-x-3 p-3 hover:bg-[#F9FAFB] dark:hover:bg-[#0B0B0B] rounded-lg transition-colors duration-120">
      <div className="text-[13px] text-[#6B7280] font-medium min-w-[60px]">{time}</div>
      
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getChannelColor()}`}></div>
        <span className="text-[13px] font-medium">{channel}</span>
      </div>
      
      <div className={`px-2 py-1 rounded-md text-[11px] font-medium uppercase tracking-wide ${getStatusStyle()}`}>
        {status}
      </div>
      
      <div className="flex-1 text-[13px] text-[#6B7280] truncate">{assetRef}</div>
    </div>
  )
}