'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Bell, Loader2 } from 'lucide-react'

import { CardContent, CardHeader } from '@/components/ui/card'
import SingleNotification from './SingleNotification'
import { useGetAllAdminNotifications } from '@/hooks/query/admin/notification.query'
import { useAuth } from '@/providers/AuthProvider'
import { cn } from '@/lib/utils'
import { useMarkAllNotificationRead } from '@/hooks/mutations/admin/notification.mutation'

const Notifications = () => {
  const { token, user } = useAuth()
  const { data, isLoading } = useGetAllAdminNotifications(token!)
  const { mutateAsync } = useMarkAllNotificationRead(token!)

  const newNotification = data?.filter((d: any) => !d.read).length

  const handleNotificatioRead = () => {
    try {
      mutateAsync()
    } catch (err) {}
  }

  if (user?.role !== 'ADMIN') return null

  return (
    <Popover>
      <PopoverTrigger>
        <div
          className={cn(
            'relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gray-200',
          )}
        >
          {!!newNotification && (
            <span className="absolute right-[-5px] top-0 flex items-center justify-center rounded-full bg-blue-600 px-1 text-xs text-white">
              {newNotification}
            </span>
          )}
          <Bell />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0 sm:w-[350px]">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="animate-spin text-muted-foreground" />
          </div>
        ) : data && data.length > 0 ? (
          <div className=" rounded-md">
            <CardHeader className="bg-secondary py-2">
              <div className="flex justify-between">
                <h1 className="font-semibold">Notifications</h1>
                <button
                  onClick={handleNotificatioRead}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Mark all read
                </button>
              </div>
            </CardHeader>
            <CardContent className="h-[350px] overflow-auto p-0">
              {data.map((d: any, idx: number) => (
                <SingleNotification key={idx} d={d} token={token!} />
              ))}
            </CardContent>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-center text-muted-foreground">
            You haven't received any <br /> notifications.
          </div>
        )}
      </PopoverContent>
    </Popover>
  )
}

export default Notifications
