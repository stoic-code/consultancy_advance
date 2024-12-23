'use client'
import React from 'react'

import { Eye, Plus } from 'lucide-react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Link from 'next/link'

import { useGetAgents } from '@/hooks/query/admin/agents.query'
import { useAuth } from '@/providers/AuthProvider'
import PageLoadingUI from '@/components/common/loading'
import AddButton from '@/components/common/AddButton'

const page = () => {
  const { token } = useAuth()
  const { isLoading, data } = useGetAgents(token!)

  if (isLoading) return <PageLoadingUI />

  return (
    <div className="px-2">
      {/* All the components that are on top out of document flow */}

      <AddButton title="Agent" link="/admin/agents/new" />

      <div className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SN</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>No of Properties</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap capitalize">
                  {d.name}
                </TableCell>
                <TableCell>{d.email}</TableCell>
                <TableCell>{d.phone}</TableCell>
                <TableCell>{d.properties.length}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Link
                      className="rounded-md border p-2 hover:bg-primary/10"
                      href={`/admin/agents/${d._id}`}
                    >
                      <Eye size={16} />
                    </Link>
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
