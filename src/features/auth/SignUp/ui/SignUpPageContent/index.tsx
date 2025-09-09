'use client'
import { useState } from 'react'

import { ProgramSelectionForm } from '@/features/auth/ProgramSelection/ui/ProgramSelectionForm'
import { SignUpForm } from '@/features/auth/SignUp/ui/SignUpForm'

export const SignUpPageContent = () => {
	const [step, setStep] = useState(1)

	return step === 1 ? <SignUpForm handleForm={() => setStep(2)} /> : step === 2 ? <ProgramSelectionForm /> : 'error'
}
