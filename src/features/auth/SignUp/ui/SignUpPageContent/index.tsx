'use client'
import { useAppSelector } from '@/app/_store/hooks'
import { ProgramSelectionForm } from '@/features/auth/ProgramSelection/ui/ProgramSelectionForm'
import { SignUpForm } from '@/features/auth/SignUp/ui/SignUpForm'

export const SignUpPageContent = () => {
	const { currentStep } = useAppSelector(state => state.signUpFormReducer)
	// console.log(formData);
	return currentStep === 1 ? <SignUpForm /> : currentStep === 2 ? <ProgramSelectionForm /> : 'error'
}
