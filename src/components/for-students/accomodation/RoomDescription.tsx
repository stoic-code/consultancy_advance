'use client'

import { H3, H4 } from '@/components/typography'
import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {
  BedDouble,
  Cctv,
  DollarSign,
  DoorOpen,
  MapPin,
  Microwave,
} from 'lucide-react'

export default function RoomDescription() {
  const [showMore, setShowMore] = useState(false)

  return (
    <div className="  w-full ">
      <section className="  flex flex-col gap-4 ">
        {/* ROOM LOCATION */}
        <div className=" flex flex-col  gap-2 ">
          <H3 className="tracking-wide">Delany Aveneue, Burwood</H3>
          <div className="  flex items-center  gap-2 text-muted-foreground">
            <MapPin size={20} />
            <p className=" text-start ">
              Delany Ave Burwood VIC 3125 Australia
            </p>
          </div>
        </div>
        {/* ROOM PRICES */}
        <div className=" flex flex-col gap-4">
          <H4 className=" flex items-center gap-1">
            <DollarSign /> 422/ <span className=" text-base">week </span>
          </H4>
          <Button className=" w-fit " variant="default">
            Book Now
          </Button>
        </div>
        {/* ROOM DESCRIPTION */}
        <div className="rounded-xl bg-slate-100 p-4 text-left">
          <H4 className="mb-2">Property Detail</H4>
          <p
            className={`   ${showMore ? 'line-clamp-none' : 'line-clamp-3'} max-w-2xl text-start  text-sm text-muted-foreground `}
          >
            This is a high-quality student accommodation that is situated in the
            Burwood locality. It’s just 11-minutes’ walk from Deakin University.
            Tram number 75 is just 2-minutes’ away from the property. This tram
            connects the property to other universities and the CBD, making it
            convenient for new students to find their way around the city. The
            property is very well-connected via public transport. There are
            numerous bus stops and a nearby tram stop that connects to the city
            center. If you’re a foodie and looking for new places to try out
            then you’re in luck as there are lots of options nearby both new and
            familiar for you to satisfy your taste buds. You have the option of
            choosing a basic room and a studio. Each of the rooms come with
            comfortable beds with integrated storage and a dedicated study space
            as well. The rooms are clean but it’s up to the resident to keep it
            clean. You don’t have to worry about making new friends as the
            property comes with its own communal lounge area where you can
            socialize and make new friends. It’s also a good place to hang out
            other than your rooms. Security shouldn’t be a worry as the property
            has secure door entry and 24x7 security. There is also car parking
            available for rent for those who are bringing to bring their cars
            with them.
          </p>
          <div className=" mx-auto">
            <p
              className=" mt-2 flex max-w-32  cursor-pointer items-center gap-x-1 text-sm  font-semibold"
              onClick={() => setShowMore(!showMore)}
            >
              Show {showMore ? 'Less' : 'More'}{' '}
            </p>
          </div>
        </div>
        {/* AMENITIES ICONS */}
        <div className="   rounded-xl ">
          <div className="  flex flex-wrap gap-4">
            <span className=" flex items-center gap-2 rounded-full border-2 p-2 px-4">
              <BedDouble size={16} /> Furnished
            </span>
            <span className=" flex items-center gap-2 rounded-full border-2 p-2 px-4">
              <DoorOpen size={16} /> Security
            </span>
            <span className=" flex items-center gap-2 rounded-full border-2 p-2 px-4">
              <Microwave size={16} /> Microwave
            </span>
            <span className=" flex items-center gap-2 rounded-full border-2 p-2 px-4">
              <Cctv size={16} /> CCTV
            </span>
          </div>
        </div>
      </section>
    </div>
  )
}
