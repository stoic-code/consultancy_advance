import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { MenuIcon } from 'lucide-react'
import SideNavContent from './content'

export const MobileSideNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="inline px-2 lg:hidden">
          <MenuIcon size={30} strokeWidth={2} />
        </button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="flex h-full w-[300px] flex-col overflow-auto"
      >
        <SideNavContent />
      </SheetContent>
    </Sheet>
  )
}
