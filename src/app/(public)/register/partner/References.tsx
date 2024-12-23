'use client'
import { Trash2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AddReferencesModal } from './AddReferences'
import BackBtn from '@/components/dashboard/onboarding/BackBtn'
import { H3 } from '@/components/typography'
import { useLocalStorage } from '@uidotdev/usehooks'
import toast from 'react-hot-toast'
import { useRegPartnerMutation } from '@/hooks/mutations/partners.mutation'
import { Button } from '@/components/ui/button'

const Label = ({ children }: any) => (
  <span className="font-semibold">{children}</span>
)

// MAIN COMPONENT
const References = () => {
  const router = useRouter()
  const [partner, setPartner] = useLocalStorage<any>('partner')

  if (!partner) {
    router.push('/register/partner?step=1')
    return null
  }

  const { mutateAsync, isPending } = useRegPartnerMutation()

  const onSubmit = () => {
    const promise = mutateAsync(partner).then(() => setPartner({}))
    toast.promise(promise, {
      loading: 'Please wait submitting...',
      success: 'Partner request sent successfully !!',
      error: (err) => err.message || 'Something went wrong !!',
    })
    router.push('/')
  }

  const handleDelete = (idx: number) => {
    const updatedReferences = [partner.references]
    updatedReferences.splice(idx, 1)
    setPartner({ ...partner, references: updatedReferences })
  }

  const addReference = (data: any) => {
    if (partner.references) {
      setPartner({ ...partner, references: [...partner.references, data] })
    } else {
      setPartner({ ...partner, references: [data] })
    }
  }

  return (
    <div className="mx-auto h-full w-[80%] space-y-3 pb-12 pt-5">
      <H3>References</H3>
      {partner.references?.length !== 0 ? (
        <div className="flex h-full w-full items-center justify-center">
          <div className="mx-auto my-20 flex w-full items-center justify-center gap-2 rounded-xl border p-10 text-muted-foreground">
            Add References <AddReferencesModal func={addReference} />
          </div>
        </div>
      ) : (
        <div className="space-y-3 py-10">
          {partner.references?.map((d: any, idx: number) => (
            <div key={idx} className="relative rounded-xl border bg-muted p-2">
              <button
                onClick={() => handleDelete(idx)}
                className="absolute right-2 top-2 text-red-500"
              >
                <Trash2 size={20} />
              </button>

              <h4 className="pb-4 font-semibold">Reference {idx + 1}</h4>
              <div className="relative grid grid-cols-2 justify-center gap-4 gap-y-4 p-2">
                <div>
                  <Label>Institute</Label> : {d.institute}
                </div>
                <div>
                  <Label>Key Person</Label> : {d.person}
                </div>
                <div>
                  <Label>Designation</Label> : {d.designation}
                </div>
                <div>
                  <Label>Phone</Label> : {d.phone}
                </div>
                <div>
                  <Label>Email</Label> : {d.email}
                </div>
                <div>
                  <Label>Country</Label> : {d.country}
                </div>
              </div>
            </div>
          ))}

          <div className="flex items-center gap-2 py-4">
            Add More <AddReferencesModal func={addReference} />
          </div>
        </div>
      )}

      <div className="flex justify-end gap-2">
        <BackBtn />
        <Button onClick={onSubmit} disabled={isPending}>
          {partner.references?.length !== 0 ? 'Skip' : 'Next'}
        </Button>
      </div>
    </div>
  )
}

export default References
