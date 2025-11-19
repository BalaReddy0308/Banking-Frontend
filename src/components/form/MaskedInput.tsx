import React from 'react'
import Input from './Input'

export interface MaskedInputProps {
  id?: string
  label?: string
  mask?: 'card' | 'ssn' | 'phone'
  value?: string
  onChange?: (v: string) => void
}

const maskValue = (val: string | undefined, mask?: string) => {
  if (!val) return ''
  const digits = val.replace(/\D/g, '')
  if (mask === 'card') {
    return digits.replace(/(.{4})/g, '$1 ').trim()
  }
  if (mask === 'ssn') {
    return digits.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3')
  }
  if (mask === 'phone') {
    return digits.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
  }
  return val
}

const MaskedInput: React.FC<MaskedInputProps> = ({ id, label, mask, value, onChange }) => {
  return (
    <Input
      id={id}
      label={label}
      value={maskValue(value, mask)}
      onChange={(e) => onChange?.(e.target.value)}
      autoComplete="off"
    />
  )
}

export default React.memo(MaskedInput)
