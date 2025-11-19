import api from '../client'

export const fetchRiskScore = async (customerId: string) => {
  const { data } = await api.get(`/risk/score?customerId=${customerId}`)
  return data
}

export const fetchRiskTransactions = async () => {
  const { data } = await api.get('/risk/transactions')
  return data
}
