import { Dispatch, FC, SetStateAction, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  instutionsMenu,
  loginTypes,
  partnersMenu,
  registerTypes,
  studentsMenu,
} from '@/data/nav'
import { Button } from '../ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { getRouteBasedOnRole } from '@/helpers/role.helper'
import { P } from '../typography'

type TMobileNavMenu = {
  state: boolean
  setState: Dispatch<SetStateAction<boolean>>
}

type TMobileLink = {
  state: boolean
  setState: Dispatch<SetStateAction<boolean>>
  href: string
  children: React.ReactNode
}

const MobileLink = ({ state, setState, href, children }: TMobileLink) => {
  const pathname = usePathname()
  return (
    <Link
      className={cn('link relative', href === pathname ? 'active' : '')}
      onClick={() => {
        setState(!state)
      }}
      href={href}
    >
      {children}
    </Link>
  )
}

const MobileNavigation: FC<TMobileNavMenu> = ({ state, setState }) => {
  const pathname = usePathname()
  const { logout, user, token } = useAuth()

  const route = getRouteBasedOnRole(user?.role)

  const [registerDialogOpen, setRegisterDialogOpen] = useState(false)
  const [loginDialogOpen, setLoginDialogOpen] = useState(false)

  return (
    <AnimatePresence>
      {state && (
        <motion.nav
          transition={{ duration: 0.5 }}
          initial={{ x: 500 }}
          animate={{ x: 0 }}
          exit={{ x: 500 }}
          className="custom-scrollbar fixed top-16 z-[10] flex h-[100svh] w-screen flex-col items-center gap-8 overflow-y-auto bg-white px-4 pb-5 pt-20 xl:hidden"
        >
          {/* menus.map((m, idx) => (
            <MobileLink key={idx} setState={setState} state={state} href={m.to}>
              {m.title}
            </MobileLink>
          )) */}
          <div className="grid w-full grid-cols-2 justify-around gap-y-8">
            <div className="space-y-8">
              <div className="flex flex-col space-y-2">
                <MobileLink setState={setState} state={state} href="/">
                  Home
                </MobileLink>

                <MobileLink setState={setState} state={state} href="/blogs">
                  Blogs
                </MobileLink>
                <MobileLink setState={setState} state={state} href="/careers">
                  Career
                </MobileLink>
              </div>
              <div className="flex flex-col space-y-2">
                <h4 className="font-semibold text-muted-foreground">
                  For Students
                </h4>
                {studentsMenu.map((m, idx) => (
                  <MobileLink
                    state={state}
                    setState={setState}
                    key={idx}
                    href={m.to}
                  >
                    {m.title}
                  </MobileLink>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="flex flex-col gap-2">
                <h4 className="font-semibold text-muted-foreground">
                  For Partners
                </h4>
                <div className="flex flex-col gap-2">
                  {partnersMenu.map((m, idx) => (
                    <MobileLink
                      state={state}
                      setState={setState}
                      key={idx}
                      href={m.to}
                    >
                      {m.title}
                    </MobileLink>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h4></h4>
                <h4 className="font-semibold text-muted-foreground">
                  For Institutions
                </h4>
                <div className="flex flex-col gap-2">
                  {instutionsMenu.map((m, idx) => (
                    <MobileLink
                      state={state}
                      setState={setState}
                      key={idx}
                      href={m.to}
                    >
                      {m.title}
                    </MobileLink>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="hidden gap-4">
            <Button
              size="lg"
              variant="outline"
              className="border-primary hover:bg-primary/10"
            >
              Register
            </Button>
            <Button size="lg" onClick={() => setState(false)}>
              Login
            </Button>
          </div>

          <div className="flex gap-2 pr-3">
            {token ? (
              <>
                <Button asChild className="">
                  <Link href={`${route}/dashboard`}>Dashboard</Link>
                </Button>
                <Button
                  onClick={logout}
                  variant="outline"
                  className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                >
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Dialog
                  open={registerDialogOpen}
                  onOpenChange={setRegisterDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button
                      className="flex items-center justify-center border-primary hover:bg-primary hover:text-primary-foreground xl:px-6 xl:py-4 xl:text-base"
                      variant="outline"
                    >
                      Register
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:w-fit">
                    <div className="flex items-center justify-center gap-4 py-8">
                      {registerTypes.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="h-30 w-30 flex flex-col items-center justify-center gap-2 rounded-xl border p-2 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50 md:h-40 md:w-40"
                          onClick={() => {
                            setRegisterDialogOpen(false)
                            setState(false)
                          }}
                        >
                          {item.icon}
                          <P className="text-sm font-medium text-muted-foreground md:text-lg">
                            {item.title}
                          </P>
                        </Link>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>

                <Dialog
                  open={loginDialogOpen}
                  onOpenChange={setLoginDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button className="items-center justify-center lg:flex xl:px-6 xl:py-4 xl:text-base">
                      Login
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:w-fit">
                    <div className="grid grid-cols-2 gap-4 p-4 sm:gap-8">
                      {loginTypes.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl border p-2 transition-all duration-300 hover:border-blue-300 hover:bg-blue-50"
                          onClick={() => {
                            setLoginDialogOpen(false)
                            setState(false)
                          }}
                        >
                          {item.icon}
                          <P className="text-sm font-medium text-muted-foreground md:text-lg">
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
        </motion.nav>
      )}
    </AnimatePresence>
  )
}

export default MobileNavigation
