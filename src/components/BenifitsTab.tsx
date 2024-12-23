'use client'
import Image from 'next/image'
import { H3 } from './typography'
import { useState } from 'react'
import { cn } from '@/lib/utils'

const benifits = {
  students: [
    'Personalized Study Abroad Counseling',
    'Career-Oriented Counseling',
    'Interactive Sessions with University Delegates',
    'Access to Futuristic Courses and Careers',
    'Application Support',
  ],
  partners: [
    'A Wealth of Options',
    'Trusted and Transparent Payments',
    'Immediate Assistance',
    'Customized Solutions',
    'Application Support',
  ],
  instution: [
    'Increase Student Diversity',
    'Receive Quality Applicants',
    'Approved Recruiter Network',
    'Document Verification',
    'Promotional Channels',
  ],
}

const tabs = [
  { title: 'For Students', tab: 'student' },
  { title: 'For Partner', tab: 'partner' },
  { title: 'For Institutions', tab: 'institute' },
]

const BenifitsTab = () => {
  const [tab, setTab] = useState('student')

  const isStudentTab = tab === 'student'
  const isPartnerTab = tab === 'partner'
  const isInstutionTab = tab === 'institute'
  const currentBenifits = isStudentTab
    ? benifits.students
    : isPartnerTab
      ? benifits.partners
      : benifits.instution

  return (
    <div
      className={cn(
        'mt-20 min-h-[50vh] pb-14 text-left md:pb-40',
        isStudentTab
          ? 'bg-primary/10'
          : isPartnerTab
            ? 'bg-pink-300/20'
            : 'bg-yellow-300/20',
      )}
    >
      <div className=" grid 2xl:container md:grid-cols-2">
        <div className="space-y-8 px-8 pb-20 pt-10">
          <ul className="flex justify-between font-medium md:justify-start md:gap-8">
            {tabs.map((d, idx) => (
              <li
                key={idx}
                className={cn(
                  'cursor-pointer border-b-2 border-transparent px-2 transition-colors',
                  d.tab === tab ? 'border-primary' : '',
                )}
                onClick={() => {
                  if (tab !== d.tab) {
                    setTab(d.tab)
                  }
                }}
              >
                {d.title}
              </li>
            ))}
          </ul>
          <H3 className="py-4">
            {isStudentTab
              ? 'Unlock Your Potential: Tailored Consultancy for Your Future!'
              : isPartnerTab
                ? 'Fuel Your Success: Partner with Global Paths Today.'
                : 'Attract 1000+ Students Monthly: Expand Your Reach with Global Paths!'}{' '}
          </H3>{' '}
          <ul className="space-y-5">
            {currentBenifits.map((d, idx) => (
              <li className="flex gap-2" key={idx}>
                <img src="/star.svg" alt="" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-center pb-10 md:pb-0">
          <img
            className="w-[250px] md:w-[400px]"
            alt="benifits"
            width={500}
            height={500}
            src={
              isStudentTab
                ? '/benifit-student.webp'
                : isPartnerTab
                  ? '/benifit-partner.webp'
                  : '/benifit-instution.webp'
            }
          />
        </div>
      </div>
    </div>
  )
}

export default BenifitsTab
