import { UserType } from '@/shared/types/user.types'
import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export interface SignUpFormData {
	name: string
	surname: string
	email: string
	birthDate: string
	password: string
	confirmPassword: string
	school_class_id: number | null
	district: number | null
	country_id: number | null
	school_id: number | null
	region: number | null
	role_id: number | null
	user_type: UserType
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
		birthDate: '',
		password: '',
		confirmPassword: '',
		school_class_id: null,
		district: null,
		country_id: null,
		school_id: null,
		region: null,
		role_id: null,
		user_type: 'student',
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
