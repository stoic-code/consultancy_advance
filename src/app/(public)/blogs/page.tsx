'use client'
import Image from 'next/image'
import AllBlogs from '@/components/blogs/AllBlogs'
import Hero from '@/components/blogs/Hero'
import { useGetBlogs } from '@/hooks/query/admin/blogs.query'
import PageLoadingUI from '@/components/common/loading'

const page = () => {
  const { data: Allblogs, isLoading } = useGetBlogs()

  if (isLoading || !Allblogs) return <PageLoadingUI />

  const latestBlog = Allblogs[0]

  if (Allblogs.length !== 0) {
    return (
      <div>
        <Hero
          blog={{
            title: latestBlog.title,
            desc: latestBlog.content,
            image: latestBlog.image?.secure_url,
            id: latestBlog._id,
          }}
        />
        {/*
      <Main />
      <Explore /> */}
        <AllBlogs />
      </div>
    )
  } else {
    return (
      <div className="grid min-h-screen place-items-center pb-10">
        <div className="space-y-5">
          <Image
            src={'/vacancy/novacancy.png'}
            height={200}
            width={200}
            alt="vacancy not found"
            className=" mx-auto h-40 w-40"
          />
          <p className=" text-wrap text-center text-muted-foreground">
            No blogs available at the moment. <br /> Please check back later.
          </p>
        </div>
      </div>
    )
  }
}

export default page
