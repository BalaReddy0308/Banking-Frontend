import React from 'react'
import { OnboardingPayload } from '../../../api/services/onboarding'

interface Props {
  data: OnboardingPayload
  files?: File[]
  onEdit: (step: number) => void
}

const ReviewSubmit: React.FC<Props> = ({ data, files, onEdit }) => {
  return (
    <div>
      <h3 className="text-lg font-medium">Review</h3>
      <div className="mt-3 space-y-2">
        <div><strong>Name:</strong> {data.fullName}</div>
        <div><strong>Email:</strong> {data.email}</div>
        <div><strong>Phone:</strong> {data.phone ?? '—'}</div>
        <div><strong>Documents:</strong> {files?.length ?? 0}</div>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => onEdit(1)} className="px-3 py-2 border rounded">Edit</button>
      </div>
    </div>
  )
}

export default React.memo(ReviewSubmit)
