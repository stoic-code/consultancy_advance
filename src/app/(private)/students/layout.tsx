import { ReactNode } from 'react'
// import { cookies } from 'next/headers'
// import { getSession } from '@/helpers/auth.helper'
// import { redirect } from 'next/navigation'

const layout = ({ children }: { children: ReactNode }) => {
  // const cookieJar = cookies()
  // const encryptedSession = cookieJar.get('session')?.value
  // const { user } = getSession(encryptedSession!)

  // if (!user.onboard || user.onboard < 1) {
  //   return redirect('/onboard')
  // } else {
  //   return <>{children}</>
  // }
  return <>{children}</>
}

export default layout
