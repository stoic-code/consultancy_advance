import { H2, P } from '@/components/typography'
import { Button } from '@/components/ui/button'
import {
  ArrowUpRightFromSquare,
  GraduationCap,
  HandCoins,
  MapPin,
  University,
} from 'lucide-react'
import React from 'react'

const university = {
  about:
    'Kangwon National University (KNU), established in 1947, evolved into a comprehensive university in 1978 and is a prominent institution in Gangwon-do. It focuses on nurturing global talents and contributing to national and regional advancement. Embracing a blend of traditional values and future-oriented strategies, KNU emphasizes collaboration with the local community and industries to maximize mutual benefits. Through its Open Campus Plan, KNU has enhanced its reputation as a prestigious university with world-class education, research, and industry-academia cooperation. The university also welcomes foreign students, offering high-quality education, diverse majors, ample dormitory space, and a convenient location near Seoul. KNU pledges to support foreign students in achieving their dreams.',
  details: [
    {
      title: 'Location',
      icon: <MapPin size={20} />,
      value: 'Chuncheon, South Korea',
    },

    {
      title: 'Students',
      icon: <GraduationCap size={20} />,
      value: '38,264',
    },

    {
      title: 'Avg Tuition Fees',
      icon: <HandCoins size={20} />,
      value: '2.383 million KRW',
    },

    {
      title: 'Established',
      icon: <University size={20} />,
      value: 'June 14, 1947',
    },
  ],
}

const page = ({ params }: { params: { id: string } }) => {
  const { id } = params
  return (
    <div>
      <div
        style={{
          background:
            'url(https://lh3.googleusercontent.com/p/AF1QipOfJPryyZ_XKYDm_iUKqkrUzLkWCIRz4733jqZG=s1360-w1360-h1020) center/cover',
        }}
        className="relative h-[20vh] sm:h-[30vh]  md:h-[50vh]"
      ></div>

      <div className="relative space-y-4 px-4 pt-12 2xl:container lg:px-20">
        <img
          className="absolute -top-32 left-4 z-10 aspect-square w-40 border bg-white p-4 shadow-xl md:left-20"
          src="/for-students/universities/knu.svg"
          alt=""
        />
        <H2 className="flex items-end gap-2">About University</H2>
        <P>{university.about} </P>
      </div>

      <div className="mx-auto grid max-w-4xl gap-4 px-4  py-10 sm:grid-cols-2 md:grid-cols-3 md:px-0 lg:grid-cols-4">
        {university.details.map((d, idx) => (
          <div key={idx} className="rounded-xl border p-4">
            <div className="flex gap-2 font-semibold">
              {d.icon}
              {d.title}
            </div>
            <p className="text-muted-foreground">{d.value}</p>
          </div>
        ))}
      </div>

      <div className="my-10 flex flex-wrap items-center justify-center gap-4">
        <Button
          className="flex gap-2 border-primary text-lg hover:bg-primary hover:text-white"
          size="lg"
        >
          <GraduationCap size={20} />
          Offered Courses
        </Button>
        <Button
          className="flex gap-2 border-primary text-lg hover:bg-primary hover:text-white"
          size="lg"
          variant="outline"
        >
          <ArrowUpRightFromSquare size={20} /> See More
        </Button>
      </div>
    </div>
  )
}

export default page
