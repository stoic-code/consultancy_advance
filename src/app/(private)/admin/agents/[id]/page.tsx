'use client'
import PageLoadingUI from '@/components/common/loading'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useGetAgentListings } from '@/hooks/query/admin/agents.query'
import { useAuth } from '@/providers/AuthProvider'
import { CircleDot, Eye, Plus, Trash } from 'lucide-react'
import Link from 'next/link'

export default function page({ params }: { params: { id: string } }) {
  const { token } = useAuth()
  const { data, isLoading } = useGetAgentListings(params.id, token!)

  if (isLoading) return <PageLoadingUI />

  return (
    <div>
      <Link
        href="/agent/listings/new"
        className="fixed bottom-4 right-4 rounded-full bg-primary p-3 text-white"
      >
        <Plus size={32} />
      </Link>

      <div className="p-3">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SN</TableHead>
              <TableHead className="">Name</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Room Type</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead>Price</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((d: any, idx: number) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">{idx + 1}</TableCell>
                <TableCell className="max-w-[200px] overflow-hidden overflow-ellipsis text-nowrap">
                  {d.title}
                </TableCell>
                <TableCell>{d.address}</TableCell>
                <TableCell>{d.type}</TableCell>
                <TableCell>
                  <Badge
                    className={`${d.available ? 'border-green-500 text-green-500 ' : 'border-red-500 text-red-500'} gap-x-1 rounded-full border  bg-transparent  hover:bg-transparent `}
                  >
                    <CircleDot size={12} />
                    {d.available ? 'Avaliable' : 'Not Available'}
                  </Badge>
                </TableCell>
                <TableCell>{d.cost}</TableCell>
                <TableCell>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/for-students/accomodations/${d._id.toString()}`}
                      className="rounded-md border p-2 hover:bg-blue-500/10"
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
