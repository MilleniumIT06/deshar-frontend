'use client';

import { useCallback, useEffect, useState } from "react";

import { ISlot } from "@/components/DragDropTrainer";
import { DropInput } from "@/components/DropInput";
import MissingLetter from "@/components/MissingLetter";
import { MoveBox } from "@/components/MoveBox";

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
    type: "move-letter"
};

interface IUseDragDropdData {
    slots: ISlot[]
    data: IMoveWordData;
    onSuccess: () => void;
    onError: () => void;
}

export const useDragDropWord = ({ data, onError, onSuccess, slots }: IUseDragDropdData) => {
    const [inputValues, setInputValues] = useState<Record<number, string>>({});
    const [errors, setErrors] = useState<Record<number, boolean>>({});
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    const [completed, setCompleted] = useState<boolean>(false);


    useEffect(() => {
        const initialValues: Record<number, string> = {};
        data.missingWords.forEach(word => {
            initialValues[word.id] = '';
        });
        setInputValues(initialValues);
        setIsButtonDisabled(true);
        setErrors({});
        setHasError(false);
        setCompleted(false);
    }, [data]);


    useEffect(() => {
        const allFilled = data.missingWords.every(
            word => inputValues[word.id]?.trim().length === 1
        );
        setIsButtonDisabled(!allFilled);
    }, [inputValues, data.missingWords]);

    const handleInputChange = (id: number, value: string) => {

        setCompleted(false);


        if (errors[id] || hasError) {
            const newErrors = { ...errors };
            delete newErrors[id];
            setErrors(newErrors);
            setHasError(Object.keys(newErrors).length > 0);
        }


        setInputValues(prev => ({
            ...prev,
            [id]: value.slice(0, 1),
        }));
    };

    const handleCheckAnswers = useCallback(() => {
        const newErrors: Record<number, boolean> = {};
        let hasAnyError = false;

        data.missingWords.forEach(word => {
            const isIncorrect = inputValues[word.id] !== word.missedLetter;
            if (isIncorrect) {
                newErrors[word.id] = true;
                hasAnyError = true;
            }
        });

        setErrors(newErrors);
        setHasError(hasAnyError);

        if (hasAnyError) {
            onError();
        } else {
            onSuccess();
            setCompleted(true);
        }
    }, [data.missingWords, inputValues, onSuccess, onError]);

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