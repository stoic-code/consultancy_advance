import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import React from 'react'

const BackBtn = () => {
  const router = useRouter()
  return (
    <Button type="button" onClick={() => router.back()} variant="secondary">
      Back
    </Button>
  )
}

export default BackBtn
