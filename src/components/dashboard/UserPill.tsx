'use client'
import { useAuth } from '@/providers/AuthProvider'
import React from 'react'

const UserPill = () => {
  const { user } = useAuth()
  return (
    <div className="flex w-fit items-center gap-2 rounded-full bg-muted p-3 py-1">
      <img
        className="h-[35px] w-[35px] rounded-full border border-primary object-cover object-center"
        src={'/avatar.png'}
        alt=""
        height={35}
        width={35}
      />
      <div>
        <p className="text-sm font-semibold">{user?.name}</p>
        <p className="text-xs text-muted-foreground">{user?.email}</p>
      </div>
    </div>
  )
}

export default UserPill
