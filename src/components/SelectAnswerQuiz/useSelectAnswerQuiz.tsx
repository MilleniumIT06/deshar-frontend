'use client';

import { exampleSelectData } from "@/mocks/data";
import { useEffect, useState } from "react";
import { ISelectItem } from "./SelectAnswerQuizContent";

export const useSelectAnswerQuiz = (setError: (value: boolean) => void) => {
    const [data, setData] = useState(exampleSelectData);
    const [selected, setSelected] = useState<ISelectItem[]>([]);
    let correctAnswersCount = 0;
    exampleSelectData.forEach(el => {
        if (el.correct === true) {
            correctAnswersCount++;
        }
    })
    console.log(correctAnswersCount);
    const onSelect = (item: ISelectItem) => {
        setSelected(prev => {
            if (prev.find(el => el.id === item.id)) {
                return prev.filter(el => el.id !== item.id);
            }
            else {
                return [...prev, item];
            }
        });
    }
    const checkSelected = (item: ISelectItem) => {

        return selected.includes(item) ? true : false
    }
    const checkCorrect = (data: ISelectItem[]) => {

        if (data.length === 0) return;
        if (data.length !== correctAnswersCount) {
            setError(true);
            return;
        }
        data.forEach((el) => {
            if (el.correct === false) {
                setError(true);
            } else {
                setError(false);
            }
        })
    }
    const disableButton = () => {
        if (selected.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    // useEffect(() => {
    //     checkCorrect(selected);
    // }, [checkCorrect, data, selected])
    return {
        data,
        selected,
        setData,
        setSelected,
        onSelect,
        checkSelected,
        checkCorrect,
        disableButton
    }
}