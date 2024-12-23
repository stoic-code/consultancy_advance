export type User = {
  name: string
  email: string
  phone: string
  role: string
  onboard: number
}
export type TAuthContext = {
  user?: User
  token?: string
  refreshToken?: string
  login: ({
    user,
    accessToken,
    refreshToken,
  }: {
    user: User
    accessToken: string
    refreshToken: string
  }) => void
  logout: () => void
}
