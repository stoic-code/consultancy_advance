'use client'
import { TopBar } from '@/components/dashboard/TobBar'
import { usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

export default function layout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const isPostPage = pathname == '/admin/blogs/new'
  const isEditPage = pathname.includes('/admin/blogs/edit/')

  return (
    <div>
      <TopBar
        title={
          isPostPage
            ? 'Post a Blog'
            : isEditPage
              ? 'Edit your Blog'
              : 'All Blogs'
        }
      />

      {children}
    </div>
  )
}
