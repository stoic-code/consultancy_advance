'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Search } from 'lucide-react'

import SingleBlog from '@/components/blogs/SingleBlog'
import { tags } from '@/constants/blogs'
import { cn } from '@/lib/utils'
import { useGetBlogs } from '@/hooks/query/admin/blogs.query'
import Image from 'next/image'
import { H4 } from '../typography'

const AllBlogs = () => {
  const [tag, setTag] = useState('')
  const [query, setQuery] = useState('')
  const { data: Allblogs } = useGetBlogs()
  const [filterBlogs, setFilterBlogs] = useState([])

  // Function to filter blogs based on the selected tag
  const filteredBlogs =
    Allblogs &&
    Allblogs.filter(
      (blog: any) =>
        (tag === '' || blog.tags.includes(tag)) &&
        (query === '' ||
          blog.title.toLowerCase().includes(query.toLowerCase())),
    )

  return (
    <section className="pt-10">
      <div className="bg-secondary text-foreground">
        <div className="bg-center bg-no-repeat py-10 2xl:container">
          <div className="mx-1 flex flex-col gap-8 rounded-xl text-center 2xl:container sm:mx-8 md:mx-auto md:w-[80%]">
            <h3 className="font-semibold uppercase ">Our Blogs</h3>

            <p className="text-3xl font-bold capitalize md:text-4xl xl:text-5xl">
              all blog post
            </p>

            <p className="text-md px-8">
              Here, creativity is unlimited, and innovation is highly valued.
              Whether you're an expert in your field, an eager learner, or an
              aspiring entrepreneur, this is the hub where ideas thrive,
              insights are exchanged, and knowledge turns into action.
            </p>
          </div>
        </div>
      </div>

      <div className="2xl:container 2xl:mx-auto">
        <div className="item-center border-ui-300 ring-ui-400 mx-auto my-10 flex w-[50%] gap-4 rounded-xl border bg-white px-4 focus-within:ring focus-within:ring-offset-1">
          <Search className="self-center" size={24} strokeWidth={2} />
          <input
            className="my-1 w-full text-xl outline-none md:text-2xl"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {tags.map((t, idx: number) => (
            <Button
              variant="outline"
              className={cn(
                'rounded-full hover:bg-primary/20',
                tag === t.value
                  ? 'bg-primary text-white hover:bg-primary hover:text-white'
                  : '',
              )}
              key={idx}
              size="sm"
              onClick={() => setTag(t.value)}
            >
              {t.key}
            </Button>
          ))}
        </div>

        <div className="mx-auto w-[80%] py-10">
          {filteredBlogs ? (
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {filteredBlogs.map((b: any, idx: number) => (
                <SingleBlog
                  key={idx}
                  blog={{
                    id: b._id,
                    title: b.title,
                    image: b.image,
                    author: b.author,
                    createdAt: b.createdAt,
                  }}
                />
              ))}
            </div>
          ) : null}
          {filteredBlogs && filteredBlogs?.length === 0 && (
            <div className="  grid place-items-center ">
              <Image
                src={'/blogs/notFound.png'}
                height={400}
                width={400}
                className=" mb-4 w-40"
                alt="not found"
              />
              <H4>No blogs found</H4>
              <p className=" text-center text-sm">
                We couldn't find what you searched for.
                <br />
                Try searching again
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default AllBlogs
