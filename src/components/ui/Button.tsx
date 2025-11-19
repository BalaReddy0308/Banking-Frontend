import React from 'react'
import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button'

export type ButtonProps = MuiButtonProps & { variant?: 'primary' | 'secondary' }

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...rest }) => {
  return (
    <MuiButton
      variant="contained"
      color={variant === 'primary' ? 'primary' : undefined}
      {...rest}
    >
      {children}
    </MuiButton>
  )
}

export default React.memo(Button)
