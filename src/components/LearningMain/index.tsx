'use client';
import { useEffect, useState } from "react";

import { useAppSelector } from "@/app/_store/hooks";
import { isAllLessonsCompleted } from "@/shared/lib/allCompleted";

import { LearningAttestation } from "../LearningAttestation";
import { LearningContent } from "../LearningContent"
import { LearningSidebar } from "../LearningSidebar"

export const LearningMain = () => {
    const { lessons } = useAppSelector(state => state.learningReducer);
    const [completed, setCompleted] = useState(false);
    useEffect(() => {
        setCompleted(isAllLessonsCompleted(lessons))
    }, [lessons])
    return (
        <>
            <LearningSidebar />
            {!completed ? <LearningContent /> :
                <LearningAttestation />}
        </>
    )
}