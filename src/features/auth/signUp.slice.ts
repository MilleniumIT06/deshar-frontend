import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SignUpFormData {
	name: string
	surname: string
	email: string
	password: string
	confirmPassword: string
	classLevel: string | null
	locality: string | null
	country: string | null
	school: string | null
}

interface SignUpFormState {
	currentStep: number
	formData: SignUpFormData
	isSubmitted: boolean
}

const initialState: SignUpFormState = {
	currentStep: 1,
	formData: {
		name: '',
		surname: '',
		email: '',
		password: '',
		confirmPassword: '',
		classLevel: null,
		locality: null,
		country: null,
		school: null,
	},
	isSubmitted: false,
}

const signUpFormSlice = createSlice({
	name: 'signUpForm',
	initialState,
	reducers: {
		updateFormData: (state, action: PayloadAction<Partial<SignUpFormData>>) => {
			state.formData = { ...state.formData, ...action.payload }
		},
		nextStep: state => {
			state.currentStep += 1
		},
		prevStep: state => {
			state.currentStep -= 1
		},
		submitForm: state => {
			state.isSubmitted = true
		},
		resetForm: state => {
			state.currentStep = 1
			state.formData = initialState.formData
			state.isSubmitted = false
		},
	},
})

export const { updateFormData, nextStep, prevStep, submitForm, resetForm } = signUpFormSlice.actions
export default signUpFormSlice.reducer
