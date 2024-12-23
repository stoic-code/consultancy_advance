'use client'
import Link from 'next/link'
import { Metadata, ResolvingMetadata } from 'next'
import './blog.css'
import SingleBlog from '@/components/blogs/SingleBlog'
import { data } from '@/__mockdata__/blog'
import { notFound, useParams } from 'next/navigation'
import { useGetBlogs, useGetSingleBlog } from '@/hooks/query/admin/blogs.query'
import { Loader } from 'lucide-react'
import PageLoadingUI from '@/components/common/loading'

// export async function generateMetadata() {
//   await connectDB()
//   const blog = await BlogPost.findById(params.id)
//
//   return {
//     title: blog.title,
//     description: blog.desc,
//     keywords: blog.keywords,
//     openGraph: {
//       images: [blog.image, 'https://metalogic.com.np/metalogo.png'],
//     },
//   }
// }

const page = () => {
  const { id } = useParams()
  //single blog fetch
  const { data: singleBlog } = useGetSingleBlog(id)
  //all blogs fetch for recommendation
  const { data: Allblogs } = useGetBlogs()

  return singleBlog ? (
    <div className="px-4 py-20 lg:mx-auto lg:max-w-4xl">
      <h1 className="text-center text-5xl font-bold capitalize text-blue-950">
        {singleBlog.title}
      </h1>
      <div className="flex flex-col items-center justify-center pt-10">
        <div className="text-ui-500 py-8">
          {/* 
          <img
            src="/metalogo.png"
            alt="user dp"
            height={100}
            width={100}
            className="mx-2 inline-block h-8 w-8"
          /> */}
          <span>By: </span>
          <span className="text-ui-600 font-semibold">
            {singleBlog.author}
          </span>{' '}
          <span>Updated on: 4th July 2023</span>
        </div>
      </div>

      <div className="blog text-ui-600 flex flex-col gap-8">
        <img src={singleBlog.image.secure_url} className="rounded-xl" />
        <div
          className="editor space-y-8 text-justify"
          dangerouslySetInnerHTML={{ __html: singleBlog.content }}
        ></div>
      </div>

      <div className="flex flex-wrap justify-between gap-6 py-12">
        <div className="flex gap-4">
          {singleBlog.tags.map((c: string) => (
            <Link
              href={`/blogs?tag=${c}`}
              className="bg-primary-400 rounded-3xl border px-4 py-1"
            >
              {c}
            </Link>
          ))}
        </div>

        {/* 
        <ShareButton
          title={blog.title}
          url={`https://metalogic.com.np/blogs/${blog.id}`}
        />
         */}
      </div>

      <div className="mb-16">
        <h5 className="py-8 pl-4 text-2xl font-bold">Latest articles</h5>
        <div className="grid gap-x-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
          {Allblogs &&
            Allblogs.map((b: any, idx: number) =>
              idx <= 2 ? <SingleBlog key={idx} blog={b} /> : null,
            )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <PageLoadingUI />
    </div>
  )
}

export default page
