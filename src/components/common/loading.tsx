import { Loader2 } from 'lucide-react'
import React from 'react'

const PageLoadingUI = () => {
  return (
    <div className="grid h-screen place-items-center">
      <Loader2 className="animate-spin text-muted-foreground" />
    </div>
  )
}

export default PageLoadingUI
