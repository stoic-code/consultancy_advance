'use client'
import { TopBar } from '@/components/dashboard/TobBar'
import { H5, P } from '@/components/typography'
import {
  BookmarkCheck,
  ClipboardCheck,
  ClipboardList,
  TrendingUp,
} from 'lucide-react'
import React from 'react'
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const statistics = [
  {
    title: 'Active Listings',
    total: '25,000',
    growthRate: '2.5',
    icon: <ClipboardList />,
    iconBg: 'bg-[#fd9076]',

    background: 'bg-[#fdf2dc]',
  },
  {
    title: 'Booked Consultations',
    total: '66,000',
    growthRate: '4.5',
    icon: <BookmarkCheck />,
    iconBg: 'bg-[#47d960]',

    background: 'bg-[#dafae6]',
  },
  {
    title: 'Closed Deals',
    total: '70,000',
    growthRate: '6.5',
    icon: <ClipboardCheck />,
    iconBg: 'bg-[#bc7ffd]',
    background: 'bg-[#f3e7fe]',
  },
]

const data = [
  {
    name: 'Jan',
    clients: 2322,
    profits: 2322,
  },
  {
    name: 'Feb',
    clients: 634,
    profits: 789,
  },
  {
    name: 'Mar',
    clients: 1500,
    profits: 1856,
  },
  {
    name: 'Apr',
    clients: 1500,
    profits: 2846,
  },
  {
    name: 'May',
    clients: 985,
    profits: 1568,
  },
  {
    name: 'Jun',
    clients: 1000,
    profits: 3325,
  },
  {
    name: 'Jul',
    clients: 200,
    profits: 2900,
  },
]

const page = () => {
  return (
    <div>
      <TopBar title="Agent Dashboard (상담원 대시보드)" />

      {/* <H5>Analytics</H5> */}
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
                  <span className=" flex items-center gap-2 rounded-md bg-white p-1">
                    <TrendingUp size={16} />
                    <p className=" text-xs font-semibold text-muted-foreground">
                      {stat.growthRate}%
                    </p>
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

      {/* CHARTS */}

      <section className=" mx-8 mt-8 flex flex-col justify-between gap-8 md:flex-row">
        <div className=" h-[50vh] w-full rounded-lg border-2 p-4 md:w-[50%] ">
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
              <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
              <YAxis axisLine={false} />
              <XAxis axisLine={false} dataKey={'name'} />
              <Tooltip />
              <Legend />
              <Area
                stackId="1"
                type="monotone"
                stroke="#47d960"
                fill="#dafae6"
                dataKey="clients"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className=" h-[50vh] w-full rounded-lg border-2 p-4 md:w-[50%] ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
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
              <CartesianGrid stroke="#f5f5f5" strokeDasharray={'5 5'} />
              <YAxis axisLine={false} />
              <XAxis axisLine={false} dataKey={'name'} />
              <Tooltip />

              <Legend />
              <Bar
                stackId="1"
                type="monotone"
                fill="#4a45e2"
                dataKey="profits"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  )
}

export default page
