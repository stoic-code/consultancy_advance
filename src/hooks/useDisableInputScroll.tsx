'use client'
import { useEffect } from 'react'

export const useDisableNumberInputScroll = () => {
  return useEffect(() => {
    const handleWheel = (e: Event) => {
      e.preventDefault()
    }
    const numberInputs = document.querySelectorAll('input[type="number"]')

    numberInputs.forEach((input) => {
      input.addEventListener('focus', handleWheel, { passive: false })
    })

    return () => {
      numberInputs.forEach((input) => {
        input.removeEventListener('focus', handleWheel)
      })
    }
  }, [])
}
