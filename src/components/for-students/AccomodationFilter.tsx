'use client'
import { Banknote, Home, MapPin, Search } from 'lucide-react'
import { PROVINCES, PROPERTY_TYPE } from '@/constants/accomodation'
import { Input } from '../ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Button } from '../ui/button'
import { removeEmptyStrings } from '@/lib/object'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'

const AccomodationFilter = () => {
  const router = useRouter()
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const [showClear, setShowClear] = useState(false)

  searchParams.toString().length < 1

  useEffect(() => {
    if (searchParams.toString().length < 1) {
      setShowClear(false)
    } else {
      setShowClear(true)
    }
  }, [searchParams])

  const onSubmit = (data: any) => {
    const newSearchParams = new URLSearchParams(
      removeEmptyStrings(data),
    ).toString()
    router.push(`${pathName}?${newSearchParams}`, { scroll: false })
  }

  const { handleSubmit, watch, register, reset } = useForm({
    defaultValues: {
      searchString: searchParams.get('searchString') || '',
      state: searchParams.get('state') || '',
      type: searchParams.get('type') || '',
      minCost: searchParams.get('minCost') || '',
      maxCost: searchParams.get('maxCost') || '',
    },
  })

  const handleClear = () => {
    router.push(pathName, { scroll: false })
    reset()
  }

  // AUTOMATICALLY PUSH WHEN PROVNCE CHANGES
  useEffect(() => {
    if (watch('state') === '') return

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('state', watch('state'))
    router.push(`${pathName}?${newSearchParams.toString()}`, { scroll: false })
  }, [watch('state')])

  // AUTOMATICALLY PUSH WHEN PROPERTY TYPE CHANGES
  useEffect(() => {
    if (watch('type') === '') return

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('type', watch('type'))
    router.push(`${pathName}?${newSearchParams.toString()}`, { scroll: false })
  }, [watch('type')])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto flex w-fit flex-wrap gap-2 rounded-full px-4 pt-5"
    >
      <div className="flex w-fit items-center gap-2 rounded-full border bg-white px-2 shadow-lg">
        <input
          {...register('searchString')}
          placeholder="search..."
          className="text-md h-10 rounded-full px-2 text-sm font-medium outline-none"
        />
        <Search size={20} className="text-muted-foreground" />
      </div>

      <div className="flex items-center rounded-full border bg-white px-4 shadow-lg">
        <MapPin size={20} className="inline" />
        <select
          {...register('state')}
          className="h-10 rounded-full px-2 text-sm font-medium outline-none"
        >
          <option value="" disabled>
            Choose Province
          </option>
          {PROVINCES.map((p, idx) => (
            <option key={idx} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center rounded-full border bg-white px-4 shadow-lg">
        <Home size={20} className="inline" />
        <select
          className="h-10 rounded-full px-2 text-sm outline-none"
          {...register('type')}
        >
          <option value="" disabled>
            Property Type
          </option>
          {PROPERTY_TYPE.map((p, idx) => (
            <option value={p} key={idx}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="flex w-[95%] items-center justify-between gap-2 rounded-full border bg-white px-4 shadow-lg md:w-[25%]">
        <div className="">
          <Banknote size={20} className="inline" />
        </div>
        <div className="flex items-center">
          <span className="text-sm font-bold text-muted-foreground">Min</span>
          <Input
            {...register('minCost')}
            type="number"
            className="border-none px-1"
            placeholder="Price"
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-muted-foreground">Max</span>
          <Input
            {...register('maxCost')}
            type="number"
            className="border-none px-1"
            placeholder="Price"
          />
        </div>
      </div>
      <Button
        variant="outline"
        className="h-10 rounded-full border-primary text-primary shadow-xl hover:bg-primary/10 hover:text-primary"
      >
        Apply
      </Button>
      {showClear && (
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-full border-destructive text-destructive shadow-xl hover:bg-destructive/10 hover:text-destructive"
          onClick={handleClear}
        >
          Clear
        </Button>
      )}
    </form>
  )
}

export default AccomodationFilter
