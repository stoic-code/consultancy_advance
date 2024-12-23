import Image from 'next/image'
import Link from 'next/link'
import { MoveRight } from 'lucide-react'

const Hero = ({ blog }: { blog: any }) => {
  return (
    <div className="grid px-2 py-20 2xl:container md:px-10 lg:mx-auto lg:grid-cols-2">
      <div className="flex h-full">
        <Image
          className="w-full rounded-xl object-cover"
          src={blog.image}
          alt="blog image"
          height={500}
          width={500}
          placeholder="blur"
          blurDataURL="/blur.avif"
        />
      </div>
      <div className="flex h-full py-4 md:px-8 lg:py-0">
        <div className="flex flex-col gap-4">
          <h5 className="text-secondary-300 text-xl font-semibold">
            Latest Blog
          </h5>
          <h2 className="text-3xl text-blue-950 md:text-6xl">{blog.title}</h2>
          <div className=" relative ">
            <p
              dangerouslySetInnerHTML={{ __html: blog.desc }}
              className="text-ui-500 mx-auto  max-h-32 overflow-hidden px-2 pb-8"
            ></p>
            <div className=" absolute inset-0 bg-gradient-to-b from-transparent to-white to-90%"></div>
          </div>

          <Link
            href={`/blogs/${blog.id} `}
            className="flex gap-2 py-4 text-blue-600"
          >
            Read More <MoveRight />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Hero
