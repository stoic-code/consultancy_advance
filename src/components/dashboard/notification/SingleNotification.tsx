import React from 'react'
import { Bell } from 'lucide-react'
import Link from 'next/link'
import { useMarkNotificationRead } from '@/hooks/mutations/admin/notification.mutation'
import moment from 'moment'

const SingleNotification = ({ token, d }: { token: string; d: any }) => {
  const { mutateAsync } = useMarkNotificationRead(d._id, token)

  return (
    <Link
      href={d.link}
      className={`  flex items-center justify-between gap-2 ${
        !d.read ? 'bg-primary/20' : null
      } border-b border-t px-4 py-1`}
      onClick={() => mutateAsync()}
    >
      <div className="flex flex-1 items-center">
        <div className="w-14">
          <button className="flex items-center justify-center rounded-full bg-secondary p-2">
            <Bell size={20} />
          </button>
        </div>
        <div className="w-[80%]">
          <h5 className={`${!d.read ? 'font-semibold' : null}`}>{d.title}</h5>
          <p className="line-clamp-1 overflow-hidden text-sm capitalize text-gray-600 text-muted-foreground">
            {d.description}
          </p>
          <span className="text-xs text-gray-500">
            {moment(d.createdAt).fromNow()}
          </span>
        </div>
      </div>
    </Link>
  )
}

export default SingleNotification
