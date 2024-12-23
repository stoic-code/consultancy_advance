import { AlertDialogHeader } from '@/components/ui/alert-dialog'
import {
  AlertDialogDescription,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { cn } from '@/lib/utils'
import React from 'react'

const ModalHeader = ({ step }: { step: string | null }) => {
  const isStep1 = step === '1'
  const isStep2 = step === '2'
  const isStep3 = step === '3'
  const isStep4 = step === '4'
  const isStep5 = step === '5'

  return (
    <AlertDialogHeader>
      <AlertDialogTitle>Let's complete your profile.</AlertDialogTitle>
      <AlertDialogDescription>
        {isStep1
          ? 'Change your password'
          : isStep2
            ? 'Fill out your basic details'
            : isStep3
              ? 'Enter your test results'
              : isStep4
                ? `Add your Education.`
                : 'hello'}
      </AlertDialogDescription>
      <div className="rounded-full bg-secondary">
        <div
          className={cn(
            'h-2 w-[3%] rounded-full bg-primary transition-all duration-200',
            isStep1
              ? 'w-1/5'
              : isStep2
                ? 'w-2/5'
                : isStep3
                  ? 'w-3/5'
                  : isStep4
                    ? 'w-4/5'
                    : isStep5
                      ? 'w-full'
                      : '0',
          )}
        ></div>
      </div>
      <span className="text-sm font-semibold text-muted-foreground">
        Step {step}/5
      </span>
    </AlertDialogHeader>
  )
}

export default ModalHeader
