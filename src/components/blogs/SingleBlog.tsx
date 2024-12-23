import React from 'react'
import Link from 'next/link'
import { Book, Calendar, Eye, PenLine, PenTool } from 'lucide-react'
import { dateFormatter } from '@/lib/date'

const SingleBlog = ({ blog }: { blog: any }) => {
  return (
    <Link href={`/blogs/${blog.id}`} className="">
      <div className=" group relative">
        <div
          className="img-hover  h-52 rounded-xl bg-cover bg-no-repeat transition-all  duration-500"
          style={{
            backgroundImage: `url(${blog.image.secure_url})`,
          }}
        ></div>
        <div className="absolute inset-0 rounded-xl  opacity-0 transition-all duration-500 ease-linear  group-hover:bg-opacity-50 group-hover:bg-gradient-to-t group-hover:from-primary/70 group-hover:to-transparent  group-hover:opacity-100"></div>
      </div>

      <div className="flex justify-between px-1 py-4">
        <span className="flex gap-1 text-xs">
          <Calendar size={16} /> {dateFormatter(blog.createdAt)}{' '}
        </span>

        <span className="flex gap-1 text-xs">
          <PenLine size={16} />
          {blog.author}
        </span>
      </div>
      <h5 className="line-clamp-2 px-1 font-semibold text-indigo-950">
        {blog.title}
      </h5>
    </Link>
  )
}

export default SingleBlog
