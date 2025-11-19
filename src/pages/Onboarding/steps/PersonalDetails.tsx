import React from 'react'
import { UseFormReturn } from 'react-hook-form'
import Input from '../../../components/form/Input'
import { OnboardingPayload } from '../../../api/services/onboarding'

interface Props {
  form: UseFormReturn<OnboardingPayload>
}

const PersonalDetails: React.FC<Props> = ({ form }) => {
  const { register, formState } = form
  return (
    <div>
      <h3 className="text-lg font-medium">Basic details</h3>
      <div className="mt-3">
        <Input id="fullName" label="Full name" {...register('fullName')} />
        <Input id="email" label="Email" type="email" {...register('email')} />
        <Input id="phone" label="Phone" type="tel" {...register('phone')} />
      </div>
      {formState.errors && (
        <div role="alert" className="text-sm text-red-600 mt-2">
          {Object.values(formState.errors).map((e: any) => e.message).join(', ')}
        </div>
      )}
    </div>
  )
}

export default React.memo(PersonalDetails)
