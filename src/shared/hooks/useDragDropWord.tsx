'use client';

import { useCallback, useEffect, useState } from "react";

import { ISlot } from "@/components/DragDropTrainer";
import { DropInput } from "@/components/DropInput";
import { Task } from "@/components/LearningContent";

interface IWord {
    id: number;
    word: string;
    missedLetter: string;
    wordNumber: number;
}

export interface IMoveWordData {
    id: number;
    sentence: string;
    missingWords: IWord[];
    type: Task
};

interface IUseDragDropdData {
    slots: ISlot[]
    data: IMoveWordData;
    onSuccess: () => void;
    onError: () => void;
}

export const useDragDropWord = ({ data, onError, onSuccess, slots }: IUseDragDropdData) => {
    const [errors, setErrors] = useState<Record<number, boolean>>({});
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);


    useEffect(() => {
        setIsButtonDisabled(true);
        setErrors({});
        setHasError(false);
        setCompleted(false);
    }, [data]);


    useEffect(() => {
        // const allFilled = data.missingWords.every(
        //     word => inputValues[word.id]?.trim().length === 1
        // );
        if (slots) {

            const allFilled = slots.every(
                slot => slot && slot.current && slot?.current?.length > 0
            )
            setIsButtonDisabled(!allFilled);
        }
    }, [slots]);

    // const handleInputChange = (id: number) => {

    //     setCompleted(false);


    //     if (errors[id] || hasError) {
    //         const newErrors = { ...errors };
    //         delete newErrors[id];
    //         setErrors(newErrors);
    //         setHasError(Object.keys(newErrors).length > 0);
    //     }


    // };

    const handleCheckAnswers = useCallback(() => {
        const newErrors: Record<number, boolean> = {};
        let hasAnyError = false;

        slots.forEach((slot) => {
            if (slot.current !== slot.correct) {
                hasAnyError = true;
                newErrors[+slot.id] = true;
            }
        })

        setErrors(newErrors);
        setHasError(hasAnyError);

        if (hasAnyError) {
            onError();
        } else {
            onSuccess();
            setCompleted(true);
        }
    }, [slots, onError, onSuccess]);

    const renderSentence = () => {
        const parts = data.sentence.split(/(\{\{\d+\}\})/g);

        return parts.map((part, index) => {
            const match = part.match(/\{\{(\d+)\}\}/);
            if (match) {
                const wordId = parseInt(match[1], 10);
                const word = data.missingWords.find(w => w.id === wordId);

                if (!word) return <span key={`missing-${index}`}>{part}</span>;
                const slot = slots.find(slot => +slot.id === +word.id);
                if (!slot) return <span key={`missing-${index}`}>{part}</span>;
                console.log(slot);
                return (
                    <DropInput current={slot && slot.current} id={slot.id} key={slot.id} word={word.word} missingLetter={word.missedLetter} />
                );
            }
            return <span key={`text-${index}`}>{part}</span>;
        });
    };

    return {
        renderSentence,
        hasError,
        completed,
        isButtonDisabled,
        handleCheckAnswers
    };
};