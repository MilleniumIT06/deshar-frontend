'use client';
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/app/_store/hooks";
import { changeStatus } from "@/entities/learning/model/status.slice";
import { isAllLessonsCompleted } from "@/shared/lib/allCompleted";

import { LearningAttestation } from "../LearningAttestation";
import { LearningContent } from "../LearningContent"
import { LearningSidebar } from "../LearningSidebar"

export const LearningMain = () => {
    const { lessons } = useAppSelector(state => state.learningReducer);
    const { status } = useAppSelector(state => state.learningStatusReducer);
    const dispatch = useAppDispatch();
    // useEffect(() => {
    //     if (isAllLessonsCompleted(lessons)) {
    //         dispatch(changeStatus("attestation"));

    //     } else {
    //         dispatch(changeStatus("learning"));
    //     }
    // }, [lessons])
    return (
        <>
            <LearningSidebar />
            {status === "learning" ? <LearningContent /> :
                <LearningAttestation />}
            {/* <LearningAttestation /> */}
        </>
    )
}