'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import HamMenu from './HamMenu'
import MobileNavigation from './MobileNavigation'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { ChevronDown } from 'lucide-react'
import { P } from '../typography'
import {
  partnersMenu,
  registerTypes,
  studentsMenu,
  menus,
  loginTypes,
} from '@/data/nav'
import { useAuth } from '@/providers/AuthProvider'
import { getRouteBasedOnRole } from '@/helpers/role.helper'

const Navigation = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const { logout, user, token } = useAuth()

  const route = getRouteBasedOnRole(user?.role)

  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  return (
    <>
      <MobileNavigation state={open} setState={setOpen} />
      <nav className="sticky top-0 z-20 flex h-20 w-full items-center justify-between border-b bg-white xl:px-8">
        <Link href="/" className="flex items-center">
          <img
            height={100}
            width={100}
            className="w-16"
            src="/logo.svg"
            alt=""
          />
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold tracking-wide">
              Consult Advance
            </h1>
            <h2 className="text-sm font-medium">
              Educational Consultancy Pvt. Ltd.
            </h2>
          </div>
        </Link>
        <ul className="hidden text-sm font-medium lg:flex lg:gap-4 xl:gap-6  xl:text-base">
          {menus.map((m, i) =>
            m.to.startsWith('/for-students') ? (
              <DropdownMenu key={i}>
                <DropdownMenuTrigger
                  className={cn(
                    'link relative flex items-center gap-1 outline-none',
                    pathname.startsWith(m.to) ? 'active' : '',
                  )}
                >
                  For Students <ChevronDown className="" size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {studentsMenu.map((m, idx) => (
                    <DropdownMenuItem key={idx} className="text-md" asChild>
                      <Link href={m.to}>{m.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : m.to.startsWith('/for-partners') ? (
              <DropdownMenu key={i}>
                <DropdownMenuTrigger
                  className={cn(
                    'link relative flex items-center gap-1 outline-none',
                    pathname.startsWith(m.to) ? 'active' : '',
                  )}
                >
                  For Partners <ChevronDown size={20} />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {partnersMenu.map((m) => (
                    <DropdownMenuItem key={m.id} className="text-md" asChild>
                      <Link href={m.to}>{m.title}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <li key={i}>
                <Link
                  className={cn(
                    'link relative',
                    pathname === m.to ? 'active' : '',
                  )}
                  href={m.to}
                >
                  {m.title}
                </Link>
              </li>
            ),
          )}
        </ul>
        <div className="flex gap-2 pr-3">
          <HamMenu open={open} setOpen={setOpen} className="lg:hidden" />
          {token ? (
            <>
              <Button asChild className="hidden lg:block">
                <Link
                  href={` ${user?.role === 'STUDENT' ? `${route}/profile` : `${route}/dashboard`} `}
                >
                  Dashboard
                </Link>
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden border-destructive text-destructive hover:bg-destructive hover:text-white lg:block"
                  >
                    Log Out
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to log out?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You will be logged out of your account.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={logout}
                      className="border border-destructive bg-white text-destructive shadow-none hover:bg-destructive hover:text-white"
                    >
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
              <Dialog
                open={registerDialogOpen}
                onOpenChange={setRegisterDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    className="hidden items-center justify-center border-primary hover:bg-primary hover:text-primary-foreground lg:flex xl:px-6 xl:py-4 xl:text-base"
                    variant="outline"
                  >
                    Register
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-fit">
                  <div className="grid grid-cols-2 gap-8 p-4">
                    {registerTypes.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-2 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                        onClick={() => setRegisterDialogOpen(false)}
                      >
                        {item.icon}
                        <P className="font-medium text-muted-foreground">
                          {item.title}
                        </P>
                      </Link>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>

              <Dialog open={loginDialogOpen} onOpenChange={setLoginDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="hidden items-center justify-center lg:flex xl:px-6 xl:py-4 xl:text-base">
                    Login
                  </Button>
                </DialogTrigger>
                <DialogContent className="w-fit">
                  <div className="grid grid-cols-2 gap-8 p-4">
                    {loginTypes.map((item, idx) => (
                      <Link
                        key={idx}
                        href={item.href}
                        className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-2 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                        onClick={() => setLoginDialogOpen(false)}
                      >
                        {item.icon}
                        <P className="font-medium text-muted-foreground">
                          {item.title}
                        </P>
                      </Link>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </>
          )}
        </div>
      </nav>
    </>
  )
}

export default Navigation
