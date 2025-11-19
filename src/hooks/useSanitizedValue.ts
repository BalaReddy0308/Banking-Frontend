import DOMPurify from 'dompurify'

export const sanitize = (value: string) => {
  return DOMPurify.sanitize(value)
}

export default sanitize
