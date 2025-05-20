'use client';
import { useState } from "react";
import { SignUpForm } from "@/features/SignUp/ui/SignUpForm";
import { ProgramSelectionForm } from "@/features/ProgramSelection/ui/ProgramSelectionForm";
import styles from './../../page.module.scss';
export default function SignUp() {
const [step,setStep] = useState(1);

    return (
        <main className={styles.index}>
   
            <div className="container">
                <div className={styles.inner}>

                    {step===1&&<SignUpForm testHandle={()=>setStep(2)}/>}
                    {step===2&&<ProgramSelectionForm/>}

                </div>
            </div>
        </main>
    );
}
