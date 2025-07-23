'use client';

import { Fragment, useCallback, useEffect, useState } from "react";

import MissingLetter from "@/components/MissingLetter";

interface IWord {
    id: number;
    word: string;
    missedLetter: string;
    wordNumber: number;

}
interface IMissedWordData { id: number; sentence: string; missingWords: IWord[] };

export const useMissedWord = (data: IMissedWordData) => {
    const [missingWords, setMissingWords] = useState(data.missingWords);
    const [completed, setCompleted] = useState(false);

    const checkCompleted = useCallback(() => {
        if (missingWords.every((value) => value.completed === true)) {
            setCompleted(false);
        } else {
            setCompleted(true);
        }
    }, [missingWords]);
    console.log(11, 'Купил как-то обувной мастер {{1}} для того, чтобы {{2}} обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.'.match(/(\{\{\d+\}\})/g));
    console.log(11, 'Купил как-то обувной мастер {{1}} для того, чтобы {{2}} обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.'.match(/(\{\{2\}\})/g));
    const handleComplete = (id: number) => {
        setMissingWords(prev =>
            prev.map(word =>
                word.id === id ? { ...word, completed: true } : word
            )
        );
        checkCompleted();
    };


    const renderSentence = () => {
        return data.sentence.split(' ').map((token, index, arr) => {

            const missingWord = missingWords.find(mw =>
                token.includes(mw.word)
            );


            const punctuation = token.replace(missingWord?.word || '', '');

            return (
                <Fragment key={index}>
                    {missingWord ? (
                        <>
                            <MissingLetter
                                id={missingWord.id}
                                missingLetter={missingWord.missedLetter}
                                word={missingWord.word}
                                onComplete={() => handleComplete(missingWord.id)}
                            />
                            {punctuation}
                        </>
                    ) : token}

                    {index < arr.length - 1 ? ' ' : ''}
                </Fragment>
            );
        });
    };
    useEffect(() => {
        checkCompleted()
    }, [missingWords, checkCompleted]);
    return {
        renderSentence,
        completed,
        checkCompleted
    }
}