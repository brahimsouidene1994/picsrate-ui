import { createSlice } from '@reduxjs/toolkit'
import { SPLASH } from '../actions'

// Define a type for the slice state
interface SplashState {
  value: boolean
}

// Define the initial state using that type
const initialState = {
  value: false
} as SplashState

export const splashSlice = createSlice({
  name: SPLASH,
  initialState,
  reducers: {
    enableSplash: state => {
        state.value = true
    },
    disableSplash: state => {
        state.value = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { enableSplash, disableSplash } = splashSlice.actions

export default splashSlice.reducer