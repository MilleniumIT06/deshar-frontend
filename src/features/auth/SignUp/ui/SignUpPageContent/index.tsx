'use client'
import { AnimatePresence, motion } from 'motion/react'

import { useAppSelector } from '@/app/_store/hooks'
import { ProgramSelectionForm } from '@/features/auth/ProgramSelection/ui/ProgramSelectionForm'
import { SignUpForm } from '@/features/auth/SignUp/ui/SignUpForm'

export const SignUpPageContent = () => {
	const { currentStep } = useAppSelector(state => state.signUpFormReducer)

	return (
		<AnimatePresence mode="wait">
			{currentStep === 1 && (
				<motion.div
					key="step1"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 20 }}
					transition={{ duration: 0.3 }}>
					<SignUpForm />
				</motion.div>
			)}

			{currentStep === 2 && (
				<motion.div
					key="step2"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1, x: 0 }}
					exit={{ opacity: 0, x: 20 }}
					transition={{ duration: 0.3 }}>
					<ProgramSelectionForm />
				</motion.div>
			)}
		</AnimatePresence>
	)
}
