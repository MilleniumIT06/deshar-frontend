'use client';
import { useAppSelector } from "@/app/_store/hooks";

import { AttestationResult } from "../AttestationResult";
import { LearningAttestation } from "../LearningAttestation";
import { LearningContent } from "../LearningContent";
import { LearningSidebar } from "../LearningSidebar"

import styles from './styles.module.scss';

export const LearningMain = () => {
    const { status } = useAppSelector(state => state.learningStatusReducer);

    const render = () => {
        switch (status) {
            case 'learning':
                return <LearningContent />
            case 'attestation':
                return <LearningAttestation />
            default:
                return <div>Error</div>
        }
    }
    return (
        <div className={styles.index}>
            {/* {status === "finish" ? <AttestationResult /> :
                <>
                    <LearningSidebar />
                    {render()}
                </>
            } */}
            <LearningSidebar />
            <LearningAttestation />
        </div>
    )
}