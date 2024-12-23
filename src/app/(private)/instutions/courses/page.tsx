import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { data } from '@/__mockdata__/application'

const page = () => {
  return (
    <div>
      <div className="px-2">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SN</TableHead>
              <TableHead>University Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Counseler</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                  {d.university}
                </TableCell>
                <TableCell className="max-w-[150px] overflow-hidden overflow-ellipsis text-nowrap">
                  {d.program}
                </TableCell>
                <TableCell>{d.status}</TableCell>
                <TableCell>{d.counselor}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default page
