'use client'
import { useState } from 'react'

import { ProgramSelectionForm } from '@/features/auth/ProgramSelection/ui/ProgramSelectionForm'
import { SignUpForm } from '@/features/auth/SignUp/ui/SignUpForm'

import styles from './../../page.module.scss'

export default function SignUp() {
	const [step, setStep] = useState(1)

	return (
		<main className={styles.index}>
			<section className={styles.signUp}>
				<div className="container">
					<div className={styles.inner}>
						{step === 1 && <SignUpForm handleForm={() => setStep(2)} />}
						{step === 2 && <ProgramSelectionForm />}
					</div>
				</div>
			</section>
		</main>
	)
}
