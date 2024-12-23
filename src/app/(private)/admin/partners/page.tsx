'use client'

import React from 'react'

import {
  BriefcaseBusiness,
  Calendar,
  Eye,
  Globe2Icon,
  MapPin,
  MapPinned,
  Phone,
} from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TopBar } from '@/components/dashboard/TobBar'

import { useGetPartners } from '@/hooks/query/admin/partners.query'
import { useAuth } from '@/providers/AuthProvider'
import PageLoadingUI from '@/components/common/loading'
import { H5 } from '@/components/typography'
import { formatDate } from '@/lib/date'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

const page = () => {
  const { token } = useAuth()
  const { data: AllPartners, isLoading } = useGetPartners(token!)

  if (isLoading) return <PageLoadingUI />
  return (
    <div>
      <TopBar title="Partners" />

      <div className="px-2">
        <Table>
          <TableHeader className=" bg-gray-100">
            <TableRow>
              <TableHead className="w-[50px]">SN</TableHead>
              <TableHead className="">Organization Name</TableHead>
              <TableHead>Business Type</TableHead>
              <TableHead className="">Address</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {AllPartners.map((d: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className=" overflow-hidden overflow-ellipsis text-nowrap">
                  {d.org_name}
                </TableCell>
                <TableCell>{d.business_type}</TableCell>
                <TableCell>{d.address}</TableCell>
                <TableCell>{d.country}</TableCell>
                <TableCell>{d.org_phone}</TableCell>

                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <button className="rounded-md border p-2 hover:bg-blue-500/10">
                          <Eye size={16} />
                        </button>
                      </DialogTrigger>
                      <DialogContent className=" max-h-[90vh] overflow-auto">
                        <div className=" space-y-4">
                          <DialogHeader>
                            <DialogTitle className=" text-xl">
                              {d.org_name}
                            </DialogTitle>
                            <DialogDescription className=" flex items-center gap-1">
                              {' '}
                              <MapPin
                                size={16}
                                className=" text-muted-foreground"
                              />{' '}
                              {d.address}
                            </DialogDescription>
                          </DialogHeader>

                          {/* Icons & details */}
                          <div className=" flex flex-wrap gap-2">
                            <span className=" flex w-fit items-center gap-2 rounded-lg bg-purple-100 px-2 text-purple-800">
                              <BriefcaseBusiness
                                size={16}
                                className=" text-purple-800"
                              />{' '}
                              {d.business_type}
                            </span>
                            <span className=" flex w-fit items-center gap-2 rounded-lg bg-green-100 px-2 text-green-800">
                              <Globe2Icon
                                size={16}
                                className=" text-green-800"
                              />{' '}
                              {d.country}
                            </span>
                            <span className=" flex w-fit items-center gap-2 rounded-lg bg-fuchsia-100 px-2 text-fuchsia-800">
                              <Phone size={16} className=" text-fuchsia-800" />{' '}
                              {d.org_phone}
                            </span>
                            {d.postal_code && (
                              <span className=" flex w-fit items-center gap-2 rounded-lg bg-teal-100 px-2 text-teal-800">
                                <MapPinned
                                  size={16}
                                  className=" text-teal-800"
                                />{' '}
                                {d.postal_code}
                              </span>
                            )}
                            <span className=" flex w-fit items-center gap-2 rounded-lg bg-red-100 px-2 text-red-800">
                              <Calendar size={16} className=" text-red-800" />{' '}
                              {formatDate(d.estd)}
                            </span>
                            {/* <span className=" flex w-fit items-center gap-2 rounded-lg bg-yellow-100 px-2 text-yellow-800">
                              <Cog size={16} className=" text-yellow-800" />{' '}
                              {d.services.join(',')}
                            </span> */}
                          </div>
                          <div>
                            <p className=" text-base font-medium">
                              Services Offered
                            </p>
                            <ul className=" list-disc space-y-1 px-4  text-xs">
                              {d.services.map((service: any, idx: number) => (
                                <li key={idx}>{service}</li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <H5>Contact Person</H5>

                            <div>
                              <table>
                                <thead>
                                  <tr>
                                    <th></th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody className=" gap-x-4 p-4 text-sm ">
                                  <tr>
                                    <td className=" pr-4">Phone</td>
                                    <td>{d.user_phone}</td>
                                  </tr>
                                  <tr>
                                    <td className=" pr-4"> Email</td>
                                    <td>{d.user_email}</td>
                                  </tr>
                                  {d.user_facebook && (
                                    <tr>
                                      <td className=" pr-4">Facebook</td>
                                      <td>{d.user_facebook}</td>
                                    </tr>
                                  )}
                                  {d.user_linkedin && (
                                    <tr>
                                      <td className=" pr-4">LinkedIn</td>
                                      <td>{d.user_linkedin}</td>
                                    </tr>
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default page

//__v: 0
// ​​
// _id: "66497fa00cd65414e15ab1c4"
// ​​
// address: "Hetauda-19, Makwanpur"
// ​​
// business_type: "Private Limited"
// ​​
// country: "Nepal"
// ​​
// estd: "2024-05-07T00:00:00.000Z"
// ​​
// org_name: "Consult Advance Education"
// ​​
// org_phone: "9864175818"
// ​​
// postal_code: "44100"
// ​​
// references: Array []
// ​​
// services: Array [ "Course Selection" ]
// ​​
// town: "Hetauda"
// ​​
// user_email: "rozanpoudel@gmail.com"
// ​​
// user_facebook: ""
// ​​
// user_linkedin: ""
// ​​
// user_name: "Roshan Paudel"
// ​​
// user_phone: "234567890"
