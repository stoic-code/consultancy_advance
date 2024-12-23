import React from 'react'
import { MobileSideNav } from './sidenav/mobile'
import dynamic from 'next/dynamic'
import { Skeleton } from '../ui/skeleton'

const UserPill = dynamic(() => import('./UserPill'), {
  ssr: false,
  loading: () => <Skeleton className="h-[44px] w-52 rounded-full"></Skeleton>,
})

const Notifications = dynamic(() => import('./notification'), {
  ssr: false,
})

export const TopBar = ({ title }: { title: string }) => {
  return (
    <div className="flex items-center justify-between px-2 py-4 print:hidden">
      <MobileSideNav />
      <h1 className="hidden text-xl font-bold sm:block lg:text-2xl">{title}</h1>
      <div className="flex flex-1 justify-end gap-4">
        <Notifications />
        <UserPill />
      </div>
    </div>
  )
}
