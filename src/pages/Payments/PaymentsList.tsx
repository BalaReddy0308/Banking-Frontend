import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchPayments } from '../../api/services/payments'
import Container from '../../components/layout/Container'

const PaymentsList: React.FC = () => {
  const { data, isLoading } = useQuery(['payments'], fetchPayments)

  if (isLoading) return <Container><div>Loading payments...</div></Container>

  return (
    <Container>
      <div className="bg-white rounded-md p-6 shadow">
        <h2 className="text-2xl font-semibold">Payments</h2>
        <ul className="mt-4 divide-y">
          {data?.data?.map((p: any) => (
            <li key={p.id} className="py-3 flex justify-between">
              <div>
                <div className="font-medium">{p.beneficiary}</div>
                <div className="text-sm text-gray-600">{p.currency} {p.amount}</div>
              </div>
              <div className="text-sm text-gray-500">{p.status}</div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  )
}

export default PaymentsList
