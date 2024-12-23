import { NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'
import { formDataToArray } from '@/lib/form'

type TUploaded = {
  name: string
  size: string
  url: string
  type: string
}

export const POST = async (req: NextRequest) => {
  const formData = await req.formData()
  const formDataArr = formDataToArray(formData)

  // Array to store promises for each file upload
  const uploadPromises: Promise<TUploaded>[] = []

  formDataArr.forEach((file: File) => {
    const id = nanoid()
    const url = `${process.env.CLOUDFLARE_URL}/students/${id}`

    // Create a promise for each file upload
    const uploadPromise = new Promise<TUploaded>(async (resolve, reject) => {
      try {
        // Upload the file
        await fetch(url, {
          body: file,
          method: 'PUT',
          headers: { 'X-Custom-Auth-Key': process.env.AUTH_KEY_SECRET },
        })

        // Resolve with uploaded file details
        resolve({
          name: file.name,
          size: file.size.toString(),
          url: url, // Adjust URL if needed
          type: file.type,
        })
      } catch (err) {
        // Reject the promise if there's an error
        reject(err)
      }
    })

    // Add the promise to the array
    uploadPromises.push(uploadPromise)
  })

  try {
    // Wait for all promises to resolve
    const uploadedFiles = await Promise.all(uploadPromises)

    // Set the response with uploaded files
    return NextResponse.json(uploadedFiles)
  } catch (err) {
    return NextResponse.json(
      {
        message:
          "Couldn't upload the file. Please reach out to the concerned party.",
      },
      { status: 500 },
    )
  }
}
