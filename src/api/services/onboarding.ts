import api from '../client'

export type OnboardingPayload = {
  fullName: string
  email: string
  phone?: string
  dob?: string
  documents?: Array<{ name: string; url?: string }>
}

export const submitOnboarding = async (payload: OnboardingPayload) => {
  const { data } = await api.post('/onboarding', payload)
  return data
}

export const fetchOnboardingStatus = async (id: string) => {
  const { data } = await api.get(`/onboarding/${id}/status`)
  return data
}
