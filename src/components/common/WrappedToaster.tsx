'use client'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const WrappedToaster = () => {
  return (
    <Toaster
      toastOptions={{
        position: 'top-center',
        duration: 4000,
      }}
    />
  )
}

export default WrappedToaster
