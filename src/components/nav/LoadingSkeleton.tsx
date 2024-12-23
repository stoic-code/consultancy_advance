import React from 'react'
import { Skeleton } from '../ui/skeleton'

export default function LoadingSkeleton() {
  return (
    <div className=" flex h-20 items-center justify-between  px-2 md:px-8">
      <div className="flex h-full items-center  gap-2 ">
        <Skeleton className=" h-12 w-12 rounded-full  md:h-14 md:w-14" />
        <div className="  items-left my-auto flex flex-col justify-center  gap-2 ">
          <Skeleton className=" h-5 w-36 md:w-48 " />
          <Skeleton className=" h-3 w-40 md:w-52" />
        </div>
      </div>
      <div className=" hidden lg:block">
        <ul className=" flex gap-8">
          <li>
            <Skeleton className=" h-4 w-20" />
          </li>
          <li>
            <Skeleton className=" h-4 w-20" />
          </li>
          <li>
            <Skeleton className=" h-4 w-20" />
          </li>
          <li>
            <Skeleton className=" h-4 w-20" />
          </li>
          <li>
            <Skeleton className=" h-4 w-20" />
          </li>
          <li>
            <Skeleton className=" h-4 w-20" />
          </li>
          <li>
            <Skeleton className=" h-4 w-20" />
          </li>
        </ul>
      </div>
      <div className=" hidden gap-2 lg:flex ">
        <Skeleton className=" h-9 w-28" />
        <Skeleton className=" h-9 w-20" />
      </div>
      <div className=" lg:hidden  ">
        <Skeleton className=" h-9 w-10" />
      </div>
    </div>
  )
}
