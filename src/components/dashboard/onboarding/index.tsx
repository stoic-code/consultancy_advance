'use client'

import { AlertDialog, AlertDialogContent } from '@/components/ui/alert-dialog'
import ModalHeader from './ModalHeader'

import { useRouter, useSearchParams } from 'next/navigation'
import { BasicDetails } from './BasicDetails'
import { ChangePassword } from './ChangePassword'
import { TestResults } from './TestsResults'
import { Education } from './Education'
import { WorkExperience } from './WorkExperience'

const OnboardingModal = () => {
  const searchParams = useSearchParams()
  const onboardingModal = searchParams.get('onboarding')
  const step = searchParams.get('step')

  const isOpen = onboardingModal === 'open'

  const isStep1 = step === '1'
  const isStep2 = step === '2'
  const isStep3 = step === '3'
  const isStep4 = step === '4'
  const isStep5 = step === '5'

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="max-w-md">
        <ModalHeader step={step} />

        <div className="max-h-[45vh] overflow-auto">
          {isStep1 ? (
            <ChangePassword />
          ) : isStep2 ? (
            <BasicDetails />
          ) : isStep3 ? (
            <TestResults />
          ) : isStep4 ? (
            <Education />
          ) : isStep5 ? (
            <WorkExperience />
          ) : (
            ''
          )}
        </div>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default OnboardingModal
