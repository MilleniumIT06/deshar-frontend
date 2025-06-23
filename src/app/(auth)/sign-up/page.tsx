'use client';
import { useState } from "react";
import { SignUpForm } from "@/features/auth/SignUp/ui/SignUpForm";
import { ProgramSelectionForm } from "@/features/auth/ProgramSelection/ui/ProgramSelectionForm";
import styles from './../../page.module.scss';
export default function SignUp() {
    const [step, setStep] = useState(2);

    return (
        <main className={styles.index}>

            <div className="container">
                <div className={styles.inner}>

                    {step === 1 && <SignUpForm handleForm={() => setStep(2)} />}
                    {step === 2 && <ProgramSelectionForm />}

                </div>
            </div>
        </main>
    );
}
