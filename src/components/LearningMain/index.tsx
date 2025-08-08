'use client';
import { useAppSelector } from "@/app/_store/hooks";

import { LearningAttestation } from "../LearningAttestation";
import { LearningContent } from "../LearningContent";
import { LearningSidebar } from "../LearningSidebar"

export const LearningMain = () => {
    const { status } = useAppSelector(state => state.learningStatusReducer);


    return (
        <>
            <LearningSidebar />
            {/* {status === "learning" ? <LearningContent /> :
                <LearningAttestation />} */}
            <LearningAttestation />
        </>
    )
}