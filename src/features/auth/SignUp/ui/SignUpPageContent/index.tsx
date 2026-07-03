
'use client'

import { AnimatePresence, motion } from 'motion/react'

import { useAppSelector } from '@/app/_store/hooks'
import { ProgramSelectionForm } from '@/features/auth/ProgramSelection/ui/ProgramSelectionForm'
import { SignUpForm } from '@/features/auth/SignUp/ui/SignUpForm'
import { SelectRoleForm } from '@/features/auth/SelectRoleForm'

export const SignUpPageContent = () => {
    const { currentStep,formData } = useAppSelector(state => state.signUpFormReducer)

    return (
        <AnimatePresence mode="wait">
            {currentStep === 1 && (
                <motion.div
                    key="step1"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <SignUpForm />
                </motion.div>
            )}
            {currentStep === 2 && (
                <motion.div
                    key="step2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >
                    <SelectRoleForm />
                </motion.div>
            )}
            {currentStep === 3 && (
                <motion.div
                    key="step3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                >
                     {/* <ProgramSelectionForm /> */}
                    {formData.user_type === 'student' ? <ProgramSelectionForm />:<div>Форма заполнения данных для учителя</div>}
                </motion.div>
            )}
        </AnimatePresence>
    )
}
