export const getEmbadedurl = (url: string) => {
  const newUrl = new URL(url)
  const id = newUrl.searchParams.get('v')
  return `https://www.youtube.com/embed/${id}`
}
