import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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

import { data } from '@/__mockdata__/application'
import { ArrowUpRightFromSquare, Trash } from 'lucide-react'

const page = () => {
  return <></>
  /*   return (
    <div>
      <div className="px-2">
        <Table className="">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">SN</TableHead>
              <TableHead>University Name</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Counseler</TableHead>
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
                <TableCell className="flex justify-end gap-4">
                  <button title="see details">
                    <ArrowUpRightFromSquare
                      size={20}
                      className="text-blue-600"
                    />
                  </button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button title="unsave this course">
                        <Trash
                          size={20}
                          className="text-destructive transition-all duration-200 hover:fill-destructive"
                        />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="border border-destructive bg-white text-destructive shadow-none hover:bg-destructive hover:text-white">
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ) */
}

export default page
