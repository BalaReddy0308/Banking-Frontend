import api from '../client'

export type Payment = {
  id: string
  amount: number
  currency: string
  beneficiary: string
  status: 'pending' | 'posted' | 'failed'
}

export const createPayment = async (payload: Omit<Payment, 'id' | 'status'>) => {
  const { data } = await api.post('/payments', payload)
  return data
}

export const fetchPayments = async () => {
  const { data } = await api.get('/payments')
  return data
}
