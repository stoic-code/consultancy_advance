import React from 'react'
import { motion } from 'framer-motion'
import { CircleCheckBig } from 'lucide-react'
import { cn } from '@/lib/utils'

const isEightCharacters = (str: string) => str?.length > 7
const hasCapitalLetter = (str: string) => /[A-Z]/.test(str)
const hasSpecialCharacter = (str: string) => /[!@#$%^&*(),.?":{}|<>]/.test(str)
const hasNumber = (str: string) => /[0-9]/.test(str)

const calculateStrength = (password: string) => {
  let strength = 0.1
  if (isEightCharacters(password)) strength += 1
  if (hasCapitalLetter(password)) strength += 1
  if (hasSpecialCharacter(password)) strength += 1
  if (hasNumber(password)) strength += 1
  return strength
}

const PasswordChecker = ({
  suggestion,
  password,
  className,
}: {
  suggestion: boolean
  password: string
  className?: string
}) => {
  const strength = calculateStrength(password)
  const strengthBarWidth = `${(strength / 4) * 100}%`

  if (suggestion) {
    return (
      <motion.div
        initial={{ scale: 0, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0, opacity: 0, y: 20 }}
        className={cn(
          'absolute bottom-16 w-full space-y-4 rounded-xl border bg-gray-50 px-2 py-4',
          className,
        )}
      >
        <div className="text-right text-sm text-muted-foreground">
          {strength === 4 ? 'Very Strong' : strength >= 3 ? 'Strong' : 'Weak'}
        </div>
        <div className="h-2 w-full rounded-full bg-gray-300">
          <div
            className={`h-full max-w-full rounded-full ${strength >= 3 ? 'bg-green-600' : strength === 2 ? 'bg-yellow-500' : 'bg-red-600'}`}
            style={{ width: strengthBarWidth }}
          ></div>
        </div>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li
            className={cn(
              'flex gap-2',
              isEightCharacters(password) ? 'line-through' : '',
            )}
          >
            <CircleCheckBig
              size={18}
              className={isEightCharacters(password) ? 'text-green-600' : ''}
              strokeWidth={isEightCharacters(password) ? 3 : 1}
            />{' '}
            Must have at least 8 characters.
          </li>

          <li
            className={cn(
              'flex gap-2',
              hasCapitalLetter(password) ? 'line-through' : '',
            )}
          >
            <CircleCheckBig
              strokeWidth={hasCapitalLetter(password) ? 3 : 1}
              size={18}
              className={hasCapitalLetter(password) ? 'text-green-600' : ''}
            />{' '}
            Must contain a capital letter.
          </li>

          <li
            className={cn(
              'flex gap-2',
              hasNumber(password) ? 'line-through' : '',
            )}
          >
            <CircleCheckBig
              strokeWidth={hasNumber(password) ? 3 : 1}
              size={18}
              className={hasNumber(password) ? 'text-green-600' : ''}
            />{' '}
            Must contain a number.
          </li>

          <li
            className={cn(
              'flex gap-2',
              hasSpecialCharacter(password) ? 'line-through' : '',
            )}
          >
            <CircleCheckBig
              strokeWidth={hasSpecialCharacter(password) ? 3 : 1}
              size={18}
              className={hasSpecialCharacter(password) ? 'text-green-600' : ''}
            />{' '}
            Should contain a special character like @, #, $.
          </li>
        </ul>
      </motion.div>
    )
  }

  return null
}

export default PasswordChecker
