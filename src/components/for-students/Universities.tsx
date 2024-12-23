'use client'
import Link from 'next/link'
import { FadeIn, FadeInStagger } from '../Fade'
import { H2, H3 } from '../typography'
import { universitiesSlugs } from '@/data/universities'
import { useGetInstutions } from '@/hooks/query/instution.query'

export const Universities = () => {
  const { data, isLoading } = useGetInstutions()
  console.log(data)

  return (
    <div
      id="for-students-university"
      className="bg-[#F2F2F2] py-20 2xl:container"
    >
      <FadeIn>
        <H2 className="py-10 text-center">
          Our <span className="text-red-400">Korean</span>{' '}
          <span className="text-green-500">University</span> tie-ups
        </H2>
      </FadeIn>
      <div
        style={{
          background:
            'url(/for-students/universities/divider.svg) no-repeat center',
        }}
      >
        <FadeIn className="grid place-items-center gap-y-10 bg-[#F2F2F2] sm:grid-cols-2 md:bg-transparent">
          {data?.map((uni: any, idx: number) =>
            idx < 4 ? (
              <>
                <div className="p-4" key={idx}>
                  <Link
                    href={`/university/${uni?._id}`}
                    className=" cursor-pointer"
                  >
                    <img
                      src={uni?.profile_image?.secure_url}
                      alt={uni?.alt}
                      height={350}
                      width={350}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <></>
            ),
          )}
        </FadeIn>
      </div>
    </div>
  )
}
