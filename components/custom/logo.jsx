import React from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/components/lib/utils'

const Logo = ({className}) => {
  return (
    <div className={cn("flex w-24 h-16 -space-x-8", className)}>
        <Avatar className="z-10 size-16">
            <AvatarImage src="/MBM.svg" alt="MBM" />
            <AvatarFallback>MBM</AvatarFallback>
        </Avatar>
        <Avatar className="z-0 size-16">
            <AvatarImage src="/apk.svg" alt="Ment Hub" />
            <AvatarFallback>MH</AvatarFallback>
        </Avatar>
    </div>
  )
}

export default Logo