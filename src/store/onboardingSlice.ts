import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type OnboardingState = {
  currentStep: number
  data: Record<string, any>
}

const initialState: OnboardingState = {
  currentStep: 1,
  data: {}
}

const slice = createSlice({
  name: 'onboarding',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload
    },
    updateData(state, action: PayloadAction<Record<string, any>>) {
      state.data = { ...state.data, ...action.payload }
    },
    reset(state) {
      state.currentStep = 1
      state.data = {}
    }
  }
})

export const { setStep, updateData, reset } = slice.actions
export default slice.reducer
