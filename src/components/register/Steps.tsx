import { Check } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const Steps = () => {
  const searchParams = useSearchParams()
  const stepNo = searchParams.get('step')
  const isStep1 = stepNo === '1'
  const isStep2 = stepNo === '2'
  const isStep3 = stepNo === '3'
  const isStep4 = stepNo === '4'

  return (
    <div className="mx-auto flex max-w-xl items-center justify-between">
      <div className="relative">
        <div
          className={`grid aspect-square h-8 w-8 place-content-center   rounded-full border-2 border-primary bg-primary  font-bold text-white`}
        >
          {stepNo! > '1' ? (
            <Check size={20} className="  font-bold text-white" />
          ) : (
            1
          )}
        </div>
      </div>

      <div
        className={`transition-width h-1 w-full flex-1 bg-muted duration-200 ease-linear  `}
      >
        <div
          className={` ${stepNo! > '1' ? 'w-full' : 'w-0'} transition-width  h-1 bg-primary duration-200 ease-linear `}
        ></div>
      </div>

      <div className="relative">
        <div
          className={`grid  ${stepNo! > '2' && 'border-primary bg-primary'}  ${isStep2 && 'border-primary bg-primary text-white'} aspect-square  w-8  place-items-center rounded-full border-2 border-muted-foreground font-bold text-muted-foreground  `}
        >
          {stepNo! > '2' ? (
            <Check size={20} className="  font-bold text-white" />
          ) : (
            2
          )}
        </div>
      </div>
      <div
        className={`transition-width h-1 w-full flex-1 bg-muted duration-200 ease-linear  `}
      >
        <div
          className={` ${stepNo! > '2' ? 'w-full' : 'w-0'} transition-width  h-1 bg-primary duration-200 ease-linear `}
        ></div>
      </div>

      <div className="relative">
        <div
          className={`grid  ${stepNo! > '3' && 'border-primary bg-primary'}  ${isStep3 && 'border-primary bg-primary text-white'} aspect-square  w-8  place-items-center rounded-full border-2 border-muted-foreground font-bold text-muted-foreground  `}
        >
          {stepNo! > '3' ? (
            <Check size={20} className="  font-bold text-white" />
          ) : (
            3
          )}
        </div>
      </div>
      <div
        className={`transition-width h-1 w-full flex-1 bg-muted duration-200 ease-linear  `}
      >
        <div
          className={` ${stepNo! > '3' ? 'w-full' : 'w-0'} transition-width  h-1 bg-primary duration-200 ease-linear `}
        ></div>
      </div>

      <div className="relative">
        <div
          className={`grid  ${stepNo! > '4' && 'border-primary bg-primary'}  ${isStep4 && 'border-primary bg-primary text-white'} aspect-square  w-8  place-items-center rounded-full border-2 border-muted-foreground font-bold text-muted-foreground  `}
        >
          {stepNo! > '4' ? (
            <Check size={20} className="  font-bold text-white" />
          ) : (
            4
          )}
        </div>
      </div>
    </div>
  )
}

export default Steps
