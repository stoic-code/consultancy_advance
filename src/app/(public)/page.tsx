import React from 'react'

import { Hero, Section2 } from '@/components/home'
import { H2, P } from '@/components/typography'
import FeaturedUni from '@/components/FeaturedUni'
import BenifitsTab from '@/components/BenifitsTab'

const page = () => {
  return (
    <div>
      {/*
      <svg>
        <path fill="#FF0066" d="" transform="translate(100 100)">
          <animate
            attributeName="d"
            values={`
                    M56.7,-50.6C67.4,-46,65.8,-23,64,-1.7C62.3,19.5,60.4,39,49.7,48.1C39,57.1,19.5,55.7,-0.2,56C-20,56.2,-39.9,58,-53.6,49C-67.2,39.9,-74.5,20,-72.7,1.8C-70.8,-16.3,-59.8,-32.6,-46.2,-37.2C-32.6,-41.9,-16.3,-34.9,3.4,-38.2C23,-41.6,46,-55.3,56.7,-50.6Z;
                    M61.2,-41.8C65.9,-27.3,46.9,-5.6,32.7,12.3C18.6,30.2,9.3,44.4,-9.3,49.8C-28,55.2,-55.9,51.8,-67.7,35.2C-79.5,18.7,-75.2,-11.1,-61.2,-31C-47.2,-51,-23.6,-61.1,2.3,-62.4C28.3,-63.8,56.6,-56.4,61.2,-41.8Z;
                    M56.7,-50.6C67.4,-46,65.8,-23,64,-1.7C62.3,19.5,60.4,39,49.7,48.1C39,57.1,19.5,55.7,-0.2,56C-20,56.2,-39.9,58,-53.6,49C-67.2,39.9,-74.5,20,-72.7,1.8C-70.8,-16.3,-59.8,-32.6,-46.2,-37.2C-32.6,-41.9,-16.3,-34.9,3.4,-38.2C23,-41.6,46,-55.3,56.7,-50.6Z
                `}
            dur="10s"
            repeatCount="indefinite"
            keyTimes="0; 0.5; 1"
            keySplines="0.25 0.1 0.25 1; 0.25 0.1 0.25 1"
            calcMode="spline"
          />
        </path>
      </svg> */}
      <Hero />
      <Section2 />
      <div className="container pt-20 text-center">
        <P className="font-semibold text-red-500">Featured</P>
        <H2>
          Our Featured <br /> Universities
        </H2>

        {/* ANOTHER METHOD */}
        <FeaturedUni />

        {/* BENIFITS SECTION */}
        <BenifitsTab />
      </div>
    </div>
  )
}

export default page
