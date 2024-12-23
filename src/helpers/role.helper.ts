export const getRouteBasedOnRole = (role?: string) => {
  const isAdmin = role === 'ADMIN'
  const isStudent = role === 'STUDENT'
  const isInstution = role === 'INSTITUTE'
  const isAgent = role === 'AGENT'

  const route = isAdmin
    ? '/admin'
    : isStudent
      ? '/students'
      : isAgent
        ? '/agent'
        : isInstution
          ? '/instutions'
          : ''

  return route
}
