import { NextRequest, NextResponse } from 'next/server'
import { encrypt, getSession } from './helpers/auth.helper'

const privateRoutes = ['/admin', '/instutions', '/agent', '/students']

function isMatchingPath(req: NextRequest): boolean {
  const pathName = req.nextUrl.pathname
  for (const route of privateRoutes) {
    if (pathName.startsWith(route)) return true
  }
  return false
}

type TUSer = {
  name: string
  email: string
  phone: string
  role: string
  onboard: number
}

// ;/^\/students\/.*$/.test(req.nextUrl.pathname)

function checkRole(req: NextRequest, user: TUSer) {
  if (
    user.role === 'STUDENT' &&
    /^\/students\/.*$/.test(req.nextUrl.pathname)
  ) {
    return NextResponse.next()
  } else if (
    user.role === 'ADMIN' &&
    /^\/admin\/.*$/.test(req.nextUrl.pathname)
  ) {
    return NextResponse.next()
  } else if (
    user.role === 'AGENT' &&
    /^\/agent\/.*$/.test(req.nextUrl.pathname)
  ) {
    return NextResponse.next()
  } else {
    return NextResponse.redirect(req.nextUrl.origin)
  }
}

const handleUnauthorized = (req: NextRequest) => {
  const res = NextResponse.redirect(req.nextUrl.origin)
  res.cookies.delete('session')
  return res
}

export async function middleware(req: NextRequest) {
  const pathName = req.nextUrl.pathname
  const encryptedSession = req.cookies.get('session')?.value

  if (/\.(png|svg|jpg|webp|mp3|geojson)$/.test(pathName)) return

  // if (isMatchingPath(req)) {
  //   const session = getSession(encryptedSession!)

  //   // if (!encryptedSession) {
  //   //   return handleUnauthorized(req)
  //   // }

  //   try {
  //     // Validate token
  //     const res = await fetch(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/refreshtoken`,
  //       {
  //         method: 'POST',
  //         body: JSON.stringify({
  //           refreshToken: session.refreshToken,
  //           role: session.user.role,
  //         }),
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     )

  //     if (!res.ok) return handleUnauthorized(req)
  //     const { refreshToken, user, accessToken } = await res.json()

  //     if (user) {
  //       return checkRole(req, user)
  //     }

  //     const response = NextResponse.next()
  //     const { encrypted, expires } = encrypt({
  //       refreshToken,
  //       user,
  //       token: accessToken,
  //     })
  //     response.headers.set('search-params', req.nextUrl.searchParams.toString())
  //     response.cookies.set('session', encrypted, { expires })
  //     return response
  //   } catch (err) {
  //     return handleUnauthorized(req)
  //   }
  // }

  const response = NextResponse.next()
  response.headers.set('search-params', req.nextUrl.searchParams.toString())
  return response
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
}
//  checkisAdmin(req, user)
