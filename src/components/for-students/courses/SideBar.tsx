import { CardTitle } from '@/components/ui/card'
import { P } from '@/components/typography'
import { SquareArrowOutUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useGetInstutions } from '@/hooks/query/instution.query'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export default function Sidebar() {
  const { data, isLoading } = useGetInstutions()
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const uni = searchParams.get('university')
  const router = useRouter()

  const handleUniClick = (id: string) => {
    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('university', id)
    router.push(`${pathName}?${newSearchParams.toString()}`, { scroll: false })
  }

  useEffect(() => {
    if (data?.length > 0 && !uni) {
      handleUniClick(data[0]._id)
    }
  }, [data])

  if (isLoading) return <></>

  return (
    <>
      <section
        className={`grid grid-flow-col gap-4 overflow-auto pb-10 pr-0 md:sticky  md:top-20 md:w-auto md:pr-4 lg:grid-flow-row`}
      >
        {data.map((d: any, idx: number) => (
          <div
            key={idx}
            onClick={() => handleUniClick(d._id)}
            className={`w-full min-w-[200px] cursor-pointer`}
          >
            <div
              className={cn(
                'h-full w-full rounded-2xl border p-4 hover:bg-blue-50/50 lg:w-[350px]',
                uni == d._id && 'border border-primary bg-blue-50',
              )}
            >
              <div className="grid grid-cols-4 items-center gap-2 ">
                <div className="col-span-4 flex h-10  w-10 items-center  rounded-full  border p-1    md:col-span-1 md:h-14 md:w-14">
                  <img
                    src={
                      d.profile_image
                        ? d.profile_image.secure_url
                        : '/for-students/universities/knu.svg'
                    }
                    height={50}
                    width={50}
                    alt="uni"
                    className="h-full w-full rounded-full object-contain"
                  />
                </div>
                <div className="col-span-4  inline-block w-full self-center   md:col-span-3  ">
                  <P className="text-left text-lg font-semibold ">
                    {d.institute_name}
                  </P>
                </div>
              </div>

              <div className="hidden md:block">
                <CardTitle className=" my-2  text-sm font-medium">
                  {d.course_name}
                </CardTitle>
                <div className="flex items-center gap-1">
                  <p className=" text-xs">{d.email}</p>
                  <span className="  font-thin text-foreground ">|</span>
                  <p className=" text-xs">{d.phone}</p>
                </div>
              </div>
              {d.website && (
                <div>
                  <P className="w-fit border-b border-transparent p-0 pt-3 text-sm font-medium text-primary hover:border-primary">
                    <a
                      target="_blank"
                      className="flex items-center gap-2"
                      href={d.website}
                    >
                      Visit Website <SquareArrowOutUpRight size={14} />{' '}
                    </a>
                  </P>
                </div>
              )}
            </div>
          </div>
        ))}
      </section>
    </>
  )
}
