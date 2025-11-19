import { createTheme } from '@mui/material'
import { colors, typography } from './tokens'

export const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary
    }
  },
  typography: {
    fontFamily: typography.fontFamily,
    fontSize: typography.fontSize
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none'
        }
      }
    }
  }
})
