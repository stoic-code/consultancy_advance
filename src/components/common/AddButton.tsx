import { Plus } from 'lucide-react'
import Link from 'next/link'

type TProps = {
  title: string
  link: string
}

export default function AddButton({ title, link }: TProps) {
  return (
    <Link
      className=" mb-2 flex w-fit items-center gap-1 text-nowrap  rounded-full border-2 border-primary  px-4  py-2  text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
      href={link}
    >
      <Plus size={16} /> Add {title}
    </Link>
  )
}
