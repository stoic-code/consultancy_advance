import Link from 'next/link'
import {
  Check,
  CircleEllipsis,
  Clock,
  Eye,
  Files,
  Trash,
  X,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import StudentBadge from '@/components/StudentBadge'
import { useChangeStudentStatus } from '@/hooks/mutations/admin/students.mutation'
import { useAuth } from '@/providers/AuthProvider'
import toast from 'react-hot-toast'

const StudentTable = ({ data }: { data: any }) => {
  const { token } = useAuth()
  const { mutateAsync } = useChangeStudentStatus(token!)

  const handleChangeStatus = (id: string, status: string) => {
    const promise = mutateAsync({ id, status })
    toast.promise(promise, {
      loading: 'Please wait ...',
      success: 'Status changed successfully !!',
      error: (err) => err.message || 'Something went wrong!!',
    })
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">SN</TableHead>
          <TableHead className="">Students Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((d: any, idx: number) => (
          <TableRow key={idx}>
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell className="text-nowrap capitalize">
              {d.first_name} {d.last_name}
            </TableCell>
            <TableCell>{d.email}</TableCell>
            <TableCell>{d.phone.split(',').join('-')}</TableCell>
            <TableCell>
              <StudentBadge status={d.process_status} />
            </TableCell>
            <TableCell>
              <div className="flex justify-end gap-2 text-gray-600">
                <Link
                  href={`/admin/students/${d._id}`}
                  className="rounded-md border p-2 hover:bg-blue-500/10"
                >
                  <Eye size={16} />
                </Link>
                <Link
                  href={`/admin/students/${d._id}/files`}
                  className="rounded-md border p-2 hover:bg-primary/10"
                >
                  <Files size={16} />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="rounded-md border p-2 outline-none hover:bg-primary/10">
                      <CircleEllipsis size={16} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      onClick={() => handleChangeStatus(d._id, 'APPROVED')}
                      className="gap-2"
                    >
                      <Check className="text-green-600" size={16} /> Success
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleChangeStatus(d._id, 'FAILED')}
                      className="gap-2"
                    >
                      <X className="text-red-600" size={16} /> Failed
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleChangeStatus(d._id, 'PENDING')}
                      className="gap-2"
                    >
                      <Clock className="text-yellow-500" size={16} /> Pending
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default StudentTable
