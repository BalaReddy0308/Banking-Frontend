import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Container from '../../components/layout/Container'
import Input from '../../components/form/Input'
import MaskedInput from '../../components/form/MaskedInput'
import { createPayment } from '../../api/services/payments'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const schema = yup.object({
  beneficiary: yup.string().required('Beneficiary required'),
  amount: yup.number().positive().required('Amount required')
})

type FormValues = {
  beneficiary: string
  amount: number
  card?: string
}

const PaymentForm: React.FC = () => {
  const qc = useQueryClient()
  const { register, handleSubmit, formState } = useForm<FormValues>({ resolver: yupResolver(schema) })
  const mutation = useMutation(createPayment, {
    onSuccess: () => qc.invalidateQueries(['payments'])
  })

  const onSubmit = (values: FormValues) => {
    mutation.mutate({ amount: values.amount, currency: 'USD', beneficiary: values.beneficiary })
  }

  return (
    <Container>
      <div className="bg-white rounded-md p-6 shadow">
        <h2 className="text-2xl font-semibold">Create Payment</h2>
        <form className="mt-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input {...register('beneficiary')} label="Beneficiary" id="beneficiary" />
          <Input {...register('amount')} label="Amount" id="amount" type="number" />
          <MaskedInput id="card" label="Card (optional)" mask="card" />
          <div className="flex justify-end mt-4">
            <button className="px-4 py-2 bg-brand text-white rounded" type="submit">Send</button>
          </div>
        </form>
      </div>
    </Container>
  )
}

export default PaymentForm
