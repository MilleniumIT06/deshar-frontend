'use client';
import { useAppSelector } from "@/app/_store/hooks";
import { LearningSidebar } from "../LearningSidebar";
import { AttestationResult } from "../AttestationResult";
import { LearningAttestation } from "../LearningAttestation";
export const AttestationContent = () => {
    const { status } = useAppSelector(state => state.learningStatusReducer);
    return (
        <>
            {status === "finish" ? <AttestationResult /> : <LearningAttestation />
            }
        </>
    )
}