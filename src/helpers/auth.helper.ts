import { User } from '@/types/auth.types'
import { AES, enc } from 'crypto-js'
import Cookies from 'js-cookie'
const ENCRYPTION_KEY = process.env.NEXT_PUBLIC_ENCRYPTION_KEY

export const getSession = (encryptedSession: string) => {
  try {
    if (!encryptedSession) return

    const session = AES.decrypt(encryptedSession!, ENCRYPTION_KEY).toString(
      enc.Utf8,
    )

    return JSON.parse(session)
  } catch (err) {
    // console.log('ERROR GETTING SESSION', err)
    return
  }
}

// FOR SERVER SIDE (MIDDLEWARE)
export const encrypt = ({
  user,
  token,
  refreshToken,
}: {
  user: User
  token: string
  refreshToken: string
}) => {
  const encrypted = AES.encrypt(
    JSON.stringify(
      {
        user,
        token,
        refreshToken,
      } || {},
    ),
    ENCRYPTION_KEY,
  ).toString()

  const expires = new Date(new Date().getTime() + 30 * 60 * 1000)

  return { expires, encrypted }
}

export const setSession = ({
  user,
  token,
  refreshToken,
}: {
  user: User
  token: string
  refreshToken: string
}) => {
  try {
    const encrypted = AES.encrypt(
      JSON.stringify(
        {
          user,
          token,
          refreshToken,
        } || {},
      ),
      ENCRYPTION_KEY,
    ).toString()

    const expires = new Date(new Date().getTime() + 30 * 60 * 1000)

    Cookies.set('session', encrypted, { expires })
  } catch (err) {
    // console.log('ERROR SETTING SESSION', err)
  }
}
