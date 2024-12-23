import { throwExceptions } from './exceptions'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL

type TRequest = {
  endpoint: string
  token?: string
  payload?: any
}

// GET
export const getRequest = async ({ endpoint, token }: TRequest) => {
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    headers: { Authorization: `bearer ${token}` },
  })
  if (!res.ok) return throwExceptions(res)
  const data = await res.json()
  return data
}

// POST
export const postRequest = async ({ endpoint, token, payload }: TRequest) => {
  const isFormData = payload instanceof FormData

  const headers: { [key: string]: string } = {
    Authorization: `Bearer ${token}`,
  }

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: 'POST',
    body: isFormData ? payload : JSON.stringify(payload),
    headers,
  })

  if (!res.ok) {
    return throwExceptions(res)
  }

  try {
    const text = await res.text()
    return text ? JSON.parse(text) : {} // Return an empty object if response is empty
  } catch (err) {
    console.log(err)
    return
  }
}

// PATCH
export const patchRequest = async ({ endpoint, token, payload }: TRequest) => {
  const isFormData = payload instanceof FormData

  const headers: { [key: string]: string } = {
    Authorization: `Bearer ${token}`,
  }

  if (!isFormData) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: 'PATCH',
    body: isFormData ? payload : JSON.stringify(payload),
    headers,
  })

  if (!res.ok) return throwExceptions(res)

  try {
    const text = await res.text()
    return text ? JSON.parse(text) : {} // Return an empty object if response is empty
  } catch (err) {
    console.log(err)
    return
  }
}

// DELETE
export const deleteRequest = async ({ token, endpoint }: TRequest) => {
  const res = await fetch(`${BACKEND_URL}${endpoint}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `bearer ${token}`,
    },
  })
  if (!res.ok) return throwExceptions(res)
  return
}
