'use client'
import AddButton from '@/components/common/AddButton'
import PageLoadingUI from '@/components/common/loading'
import { TopBar } from '@/components/dashboard/TobBar'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeleteProperty } from '@/hooks/mutations/agents.mutation'
import { useGetListings } from '@/hooks/query/agent/agent.query'
import { useAuth } from '@/providers/AuthProvider'
import { CircleDot, Eye, Plus, Trash } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function page() {
  const { token } = useAuth()
  const { data, isLoading, error } = useGetListings(token!)
  const { mutateAsync } = useDeleteProperty(token!)

  if (isLoading) return <PageLoadingUI />

  const handleDelete = (id: string) => {
    const promise = mutateAsync(id)
    toast.promise(promise, {
      loading: 'Deleting property...',
      success: 'Deleted property successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
  }

  return (
    <div>
      <TopBar title="My Listings (내 목록)" />

      <div className="p-3">
        <AddButton title="Property (속성 추가)" link="/agent/listings/new" />

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">SN</TableHead>
              <TableHead className="">Name (이름)</TableHead>
              <TableHead>Location (위치)</TableHead>
              <TableHead>Room Type (객실 유형)</TableHead>
              <TableHead>Availability (유효성)</TableHead>
              <TableHead>Price (가격)</TableHead>
              <TableHead className="text-right">Action (행동)</TableHead>
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
                      href={`/agent/listings/${d._id.toString()}`}
                      className="rounded-md border p-2 hover:bg-blue-500/10"
                    >
                      <Eye size={16} />
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="rounded-md border p-2 hover:bg-red-500/10">
                          <Trash size={16} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your document and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleDelete(d._id)}
                            className="border border-destructive bg-white text-destructive shadow-none hover:bg-destructive hover:text-white"
                          >
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
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
