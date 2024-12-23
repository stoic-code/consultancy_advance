'use client'
import FormSubmitBtn from '@/components/form/FormSubmitBtn'
import { Input } from '@/components/ui/input'
import CompulsoryLabel from '@/components/form/CompulsoryLabel'
import { useRegAgentMutation } from '@/hooks/mutations/agents.mutation'
import { useAuth } from '@/providers/AuthProvider'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { TAgentSchema, agentSchema } from '@/schema/agent.schema'
import FormErr from '@/components/form/FormErr'
import toast from 'react-hot-toast'

const page = () => {
  const { token } = useAuth()
  const { mutateAsync, isPending } = useRegAgentMutation(token!)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TAgentSchema>({
    resolver: zodResolver(agentSchema),
  })

  const onSubmit = async (data: TAgentSchema) => {
    try {
      await mutateAsync(data)
      toast.success('Successfully registered agent.')
      reset()
    } catch (err: any) {
      toast.error(err.message || 'Something went wrong')
    }
  }

  return (
    <div className="px-4">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm space-y-4">
        <div>
          <CompulsoryLabel>Agent's Name</CompulsoryLabel>
          <Input {...register('name')} placeholder="Write agent's Name" />
          <FormErr>{errors.name?.message}</FormErr>
        </div>
        <div>
          <CompulsoryLabel>Email</CompulsoryLabel>
          <Input {...register('email')} placeholder="Eg: agent@gmail.com" />
          <FormErr>{errors.email?.message}</FormErr>
        </div>
        <div>
          <CompulsoryLabel>Phone</CompulsoryLabel>
          <Input {...register('phone')} placeholder="Eg: 98xxxxxxxxxx" />
          <FormErr>{errors.phone?.message}</FormErr>
        </div>
        <FormSubmitBtn isSubmitting={isSubmitting || isPending}>
          Add Agent
        </FormSubmitBtn>
      </form>
    </div>
  )
}

export default page
