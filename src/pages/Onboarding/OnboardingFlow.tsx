import React, { useState } from 'react'
import Container from '../../components/layout/Container'
import { useForm } from 'react-hook-form'
import { OnboardingPayload, submitOnboarding } from '../../api/services/onboarding'
import PersonalDetails from './steps/PersonalDetails'
import KYC from './steps/KYC'
import ReviewSubmit from './steps/ReviewSubmit'
import { useMutation } from '@tanstack/react-query'
import sanitize from '../../hooks/useSanitizedValue'

type Step = 1 | 2 | 3

const OnboardingFlow: React.FC = () => {
  const [step, setStep] = useState<Step>(1)
  const [files, setFiles] = useState<File[] | undefined>(undefined)

  const form = useForm<OnboardingPayload>({
    defaultValues: { fullName: '', email: '', phone: '' }
  })

  const mutation = useMutation((payload: OnboardingPayload) => submitOnboarding(payload), {
    onSuccess: (data) => {
      alert(`Onboarding submitted (mock id: ${data.id})`)
      form.reset()
      setFiles(undefined)
      setStep(1)
    }
  })

  const handleNext = async () => {
    // validate current step fields
    if (step === 1) {
      const ok = await form.trigger(['fullName', 'email'])
      if (!ok) return
      setStep(2)
    } else if (step === 2) {
      setStep(3)
    }
  }

  const handleSubmit = async () => {
    const values = form.getValues()
    // sanitize strings
    const payload: OnboardingPayload = {
      fullName: sanitize(values.fullName),
      email: sanitize(values.email),
      phone: sanitize(values.phone || ''),
      documents: files?.map((f) => ({ name: f.name })) || []
    }
    mutation.mutate(payload)
  }

  return (
    <Container>
      <div className="bg-white rounded-md p-6 shadow">
        <h2 className="text-2xl font-semibold">Customer Onboarding</h2>
        <div className="mt-4">
          {step === 1 && <PersonalDetails form={form} />}
          {step === 2 && <KYC onFilesChange={(f) => setFiles(f)} />}
          {step === 3 && <ReviewSubmit data={form.getValues()} files={files} onEdit={(s) => setStep(s as Step)} />}

          <div className="flex justify-between gap-2 mt-6">
            {step > 1 ? (
              <button className="px-4 py-2 border rounded" onClick={() => setStep((step - 1) as Step)}>Back</button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <button className="px-4 py-2 bg-brand text-white rounded" onClick={handleNext}>Next</button>
            ) : (
              <button className="px-4 py-2 bg-brand text-white rounded" onClick={handleSubmit} disabled={mutation.isLoading}>
                {mutation.isLoading ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default OnboardingFlow
