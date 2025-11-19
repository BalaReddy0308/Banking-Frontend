import React, { InputHTMLAttributes } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id?: string
  description?: string
}

const Input: React.FC<InputProps> = ({ label, id, description, ...rest }) => {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={id}
        aria-describedby={description ? `${id}-desc` : undefined}
        className="mt-1 block w-full rounded border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand"
        {...rest}
      />
      {description && (
        <p id={`${id}-desc`} className="text-xs text-gray-500 mt-1">
          {description}
        </p>
      )}
    </div>
  )
}

export default React.memo(Input)
