import React, { useState } from 'react'
import Container from '../../../components/layout/Container'

interface Props {
  onFilesChange: (files: File[]) => void
}

const KYC: React.FC<Props> = ({ onFilesChange }) => {
  const [selected, setSelected] = useState<File[] | null>(null)

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setSelected(files)
    onFilesChange(files)
  }

  return (
    <div>
      <h3 className="text-lg font-medium">KYC Documents</h3>
      <p className="text-sm text-gray-600 mt-2">Upload an identity document and proof of address (PDF or image).</p>
      <div className="mt-4">
        <input aria-label="Upload documents" type="file" multiple accept="image/*,application/pdf" onChange={handleFiles} />
        {selected && <div className="mt-2 text-sm text-gray-700">{selected.length} file(s) selected</div>}
      </div>
    </div>
  )
}

export default React.memo(KYC)
