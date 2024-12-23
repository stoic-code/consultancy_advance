'use client'
import React from 'react'
import Image from 'next/image'

const UserCard = () => {
  return (
    <div className="mx-auto  my-6 max-w-3xl rounded-lg border border-border px-2 py-2 shadow-sm">
      <div className="bg-bg flex w-full items-center gap-6 p-4">
        <div className="hidden w-40 place-content-center md:block">
          <div className="overflow-hidden rounded-full">
            <Image
              className="aspect-square rounded-full"
              src="/avatar.png"
              alt={`profile picture`}
              width={96}
              height={96}
            />
          </div>
        </div>
        <div>
          <p className="mb-1 font-medium md:text-lg">
            Your profile is 80% complete, let&rsquo;s boost it to 100%
          </p>
          <p className="text-content-lighter">
            Add key details like work experience, and education to stand out.{' '}
          </p>
        </div>
      </div>
      {/* 
      <div className="h-3 w-full rounded-full border">
        <div className="h-full w-[80%] rounded-full bg-primary/30"></div>
      </div> */}
    </div>
  )
}
export default UserCard
