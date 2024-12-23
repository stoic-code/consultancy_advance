'use client'
import { TopBar } from '@/components/dashboard/TobBar'
import { H5, P } from '@/components/typography'
import React from 'react'
import {
  AreaChart,
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts'
import {
  GraduationCap,
  Handshake,
  School,
  TrendingUp,
  UsersRound,
} from 'lucide-react'

const statistics = [
  {
    title: 'Students',
    total: '25,000',
    growthRate: '2.5',
    icon: <GraduationCap />,
    iconBg: 'bg-[#fd9076]',

    background: 'bg-[#fdf2dc]',
  },
  {
    title: 'Agents',
    total: '50,000',
    growthRate: '8.5',
    icon: <UsersRound />,
    iconBg: 'bg-[#f96b89]',

    background: 'bg-[#ffe2e6]',
  },
  {
    title: 'Institutions',
    total: '66,000',
    growthRate: '4.5',
    icon: <School />,
    iconBg: 'bg-[#47d960]',

    background: 'bg-[#dafae6]',
  },
  {
    title: 'Partners',
    total: '70,000',
    growthRate: '6.5',
    icon: <Handshake />,
    iconBg: 'bg-[#bc7ffd]',
    background: 'bg-[#f3e7fe]',
  },
]

const data = [
  {
    name: 'Jan',
    student: 2322,
    agent: 2322,
  },
  {
    name: 'Feb',
    student: 634,
    agent: 789,
  },
  {
    name: 'Mar',
    student: 1500,
    agent: 1856,
  },
  {
    name: 'Apr',
    student: 1500,
    agent: 2846,
  },
  {
    name: 'May',
    student: 985,
    agent: 1568,
  },
  {
    name: 'Jun',
    student: 1000,
    agent: 3325,
  },
  {
    name: 'Jul',
    student: 200,
    agent: 2900,
  },
  {
    name: 'Aug',
    student: 1222,
    agent: 788,
  },
  {
    name: 'Oct',
    student: 5000,
    agent: 5000,
  },
  {
    name: 'Nov',
    student: 2000,
    agent: 1000,
  },
  {
    name: 'Dec',
    student: 3452,
    agent: 2000,
  },
]

const page = () => {
  return (
    <div>
      <TopBar title="Admin Dashboard" />

      {/* STATISTICS OF EACH OPTIONS */}
      <div>
        <div className=" mx-8 mt-4 flex  flex-wrap items-center  gap-8 ">
          {statistics.map((stat, idx) => {
            return (
              <div
                key={idx}
                className={`  flex w-[200px] flex-col gap-2 ${stat.background}  rounded-xl    p-4        `}
              >
                <span
                  className={` text-white ${stat.iconBg} w-fit rounded-md p-1`}
                >
                  {stat.icon}
                </span>
                <span className=" flex items-center gap-4">
                  <H5 className=" text-2xl">{stat.total}</H5>
                  <span className="flex items-center gap-2 rounded-md bg-white p-1 text-green-600">
                    <TrendingUp size={16} />
                    <p className=" text-xs font-semibold">{stat.growthRate}%</p>
                  </span>
                </span>
                <P className=" text-sm font-semibold tracking-wide text-muted-foreground ">
                  {stat.title}
                </P>
              </div>
            )
          })}
        </div>
      </div>

      {/* CHART */}
      <section className=" mx-8 mt-8 flex flex-col justify-between gap-8 md:flex-row">
        <div className="h-[50vh] w-full rounded-lg border-2 p-4 text-xs md:w-[50%] ">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid stroke="#e8e8e8" strokeDasharray={5} />
              <YAxis axisLine={false} />
              <XAxis axisLine={false} dataKey={'name'} />
              <Tooltip />
              <Area
                stackId="1"
                type="monotone"
                stroke="#d3eaf2"
                fill="#f3e7fe"
                dataKey="student"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className=" h-[50vh] w-full rounded-lg border-2 p-4 text-xs md:w-[50%] ">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <YAxis axisLine={false} />
              <XAxis axisLine={false} dataKey={'name'} />
              <Tooltip />
              <Area
                stackId="1"
                type="monotone"
                stroke="#d3eaf2"
                fill="#d3eaf2"
                dataKey="agent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

export default page
