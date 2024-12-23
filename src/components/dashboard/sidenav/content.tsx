'use client'
import React from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { usePathname, useRouter } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { LogOut } from 'lucide-react'

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

import { Button } from '@/components/ui/button'
import { adminMenus, instutionMenus, agentMenus, studentMenus } from './menus'
import { useAuth } from '@/providers/AuthProvider'

const SideNavContent = () => {
  const { logout } = useAuth()
  const router = useRouter()
  const pathName = usePathname()
  const isStudent = pathName.startsWith('/students')
  const isAgent = pathName.startsWith('/agent')
  const isInstution = pathName.startsWith('/instutions')
  const isAdmin = pathName.startsWith('/admin')

  const handleLogOut = () => {
    logout()
    router.push('/')
  }

  const menus = isStudent
    ? studentMenus
    : isAgent
      ? agentMenus
      : isInstution
        ? instutionMenus
        : isAdmin
          ? adminMenus
          : null

  return (
    <>
      <Link href="/" className="flex items-center gap-2">
        <img src="/logo.svg" alt="" height={40} width={40} />
        <span className="text-2xl font-bold">Consult</span>
        <Badge className="rounded-full border border-primary bg-transparent text-primary hover:bg-transparent hover:text-primary">
          {isStudent
            ? 'Students'
            : isAdmin
              ? 'admin'
              : isInstution
                ? 'Institution'
                : isAgent
                  ? 'Agent'
                  : ''}
        </Badge>
      </Link>

      <ul className="w-full space-y-5 pt-10">
        {menus?.map((m, idx) => (
          <li key={idx}>
            <Link
              href={m.to}
              className={cn(
                'flex items-center gap-2 rounded-md px-1 py-2 transition-all duration-200 hover:bg-accent-foreground/10',
                pathName.startsWith(m.to)
                  ? 'bg-primary/90 font-semibold text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                  : '',
              )}
            >
              {m.icon}
              {m.title}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex w-full flex-1 items-end">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              className="flex w-full gap-3 border border-destructive bg-transparent text-destructive hover:bg-destructive hover:text-white"
            >
              <LogOut className="inline" size={20} /> Log Out (로그 아웃)
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to log out? (정말로 로그아웃하시겠습니까?)
              </AlertDialogTitle>
              <AlertDialogDescription>
                You will be logged out of your account. (귀하의 계정에서
                로그아웃됩니다.)
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel (취소)</AlertDialogCancel>
              <AlertDialogAction
                onClick={handleLogOut}
                className="border border-destructive bg-white text-destructive shadow-none hover:bg-destructive hover:text-white"
              >
                Continue (계속하다)
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </>
  )
}

export default SideNavContent
