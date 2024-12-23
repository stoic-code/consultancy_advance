export function removeEmptyStrings(
  obj: Record<string, any>,
): Record<string, any> {
  for (let key in obj) {
    if (obj[key] === '' || !obj[key]) {
      delete obj[key]
    } else if (Array.isArray(obj[key])) {
      obj[key] = obj[key].filter((item: any) => item !== '')
    } else if (typeof obj[key] === 'object' && obj[key] !== null) {
      removeEmptyStrings(obj[key])
    }
  }
  return obj
}
