interface FormDataObject {
  [key: string]: string | File
}

export function formDataToObject(formData: FormData): FormDataObject {
  const object: FormDataObject = {}
  formData.forEach((value: string | File, key: string) => {
    object[key] = value
  })
  return object
}

export function formDataToArray(formData: FormData) {
  const fileArray: File[] = []
  formData.forEach((value, key) => {
    if (value instanceof File) {
      fileArray.push(value)
    }
  })
  return fileArray
}
