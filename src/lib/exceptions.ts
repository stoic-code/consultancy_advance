export const throwExceptions = async (res: Response) => {
  let errorMessage
  const { message } = await res.json()

  if (typeof message === 'object') {
    errorMessage = message[0]
  } else {
    errorMessage = message
  }

  switch (res.status) {
    case 400:
      throw new Error(
        errorMessage ||
          'The server cannot process the request due to a client error.',
      )
    case 401:
      throw new Error(errorMessage || 'Unauthorized: Please log in again.')
    case 403:
      throw new Error(
        errorMessage || "You don't have permission to access this resource.",
      )
    case 404:
      throw new Error(errorMessage || 'The requested resource was not found.')
    case 405:
      throw new Error(
        errorMessage ||
          'The method specified in the request is not allowed for the resource.',
      )
    case 408:
      throw new Error(
        errorMessage || 'The server timed out waiting for the request.',
      )
    case 500:
      throw new Error(errorMessage || 'Something went wrong on the server.')
    case 502:
      throw new Error(
        errorMessage ||
          'The server received an invalid response from an upstream server.',
      )
    case 503:
      throw new Error(
        errorMessage ||
          'The server is currently unable to handle the request due to temporary overload or maintenance of the server.',
      )
    case 504:
      throw new Error(
        errorMessage ||
          'The server did not receive a timely response from the upstream server.',
      )
    default:
      if (res.status >= 400 && res.status < 500) {
        throw new Error('An error occurred on the client side.')
      } else if (res.status >= 500 && res.status < 600) {
        throw new Error('An error occurred on the server side.')
      } else {
        throw new Error('An unexpected error occurred.')
      }
  }
}
