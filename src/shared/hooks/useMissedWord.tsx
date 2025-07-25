'use client';

import { Fragment, useCallback, useEffect, useState } from "react";

import MissingLetter from "@/components/MissingLetter";

interface IWord {
    id: number;
    word: string;
    missedLetter: string;
    wordNumber: number;

}
interface IMissedWordData {
    id: number;
    sentence: string;
    missingWords: IWord[];
};
interface IUseMissedData {
    data: IMissedWordData;
    onSuccess: () => void;
    onError: () => void;
}
export const useMissedWord = ({ data, onError, onSuccess }: IUseMissedData) => {
    // const [missingWords, setMissingWords] = useState(data.missingWords);
    // const [completed, setCompleted] = useState(false);

    // const checkCompleted = useCallback(() => {
    //     if (missingWords.every((value) => value.completed === true)) {
    //         setCompleted(false);
    //     } else {
    //         setCompleted(true);
    //     }
    // }, [missingWords]);
    // console.log(11, 'Купил как-то обувной мастер {{1}} для того, чтобы {{2}} обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.'.match(/(\{\{\d+\}\})/g));
    // console.log(11, 'Купил как-то обувной мастер {{1}} для того, чтобы {{2}} обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.'.match(/(\{\{2\}\})/g));
    // const handleComplete = (id: number) => {
    //     setMissingWords(prev =>
    //         prev.map(word =>
    //             word.id === id ? { ...word, completed: true } : word
    //         )
    //     );
    //     checkCompleted();
    // };


    // const renderSentence = () => {
    //     return data.sentence.split(' ').map((token, index, arr) => {

    //         const missingWord = missingWords.find(mw =>
    //             token.includes(mw.word)
    //         );


    //         const punctuation = token.replace(missingWord?.word || '', '');

    //         return (
    //             <Fragment key={index}>
    //                 {missingWord ? (
    //                     <>
    //                         <MissingLetter
    //                             id={missingWord.id}
    //                             missingLetter={missingWord.missedLetter}
    //                             word={missingWord.word}
    //                             onComplete={() => handleComplete(missingWord.id)}
    //                         />
    //                         {punctuation}
    //                     </>
    //                 ) : token}

    //                 {index < arr.length - 1 ? ' ' : ''}
    //             </Fragment>
    //         );
    //     });
    // };
    // useEffect(() => {
    //     checkCompleted()
    // }, [missingWords, checkCompleted]);
    const [inputValues, setInputValues] = useState<Record<number, string>>({});
    const [errors, setErrors] = useState<Record<number, boolean>>({});
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);
    useEffect(() => {
        const initialValues: Record<number, string> = {};
        data.missingWords.forEach(word => {
            initialValues[word.id] = '';
        });
        setInputValues(initialValues);
        setIsButtonDisabled(true);
        setErrors({});
        setHasError(false);
    }, [data]);
    useEffect(() => {
        const allFilled = data.missingWords.every(
            word => inputValues[word.id]?.length === 1
        );
        setIsButtonDisabled(!allFilled);
    }, [inputValues, data.missingWords]);
    const handleInputChange = (id: number, value: string) => {
        // Очищаем предыдущую ошибку при изменении
        if (errors[id] || hasError) {
            const newErrors = { ...errors };
            delete newErrors[id];
            setErrors(newErrors);
            setHasError(Object.keys(newErrors).length > 0);
        }

        // Обновляем значение
        setInputValues(prev => ({
            ...prev,
            [id]: value.slice(0, 1), // Ограничиваем одну букву
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
        }
    }, [data.missingWords, inputValues, onSuccess, onError]);
    const renderSentence = () => {
        const parts = data.sentence.split(/(\{\{\d+\}\})/g);

        return parts.map((part, index) => {
            const match = part.match(/\{\{(\d+)\}\}/);
            if (match) {
                const wordId = parseInt(match[1], 10);
                const word = data.missingWords.find(w => w.id === wordId);

                if (!word) return part;

                return <MissingLetter id={1} missingLetter={word.missedLetter} onComplete={() => console.log('test')} word={word.word} key={1} errors={errors} inputValues={inputValues} handleInputChange={handleInputChange} />
            }
            return <span key={index}>{part}</span>;
        });
    };
    // const renderWordInput = (word: IWord) => {
    //     const letterIndex = word.word.indexOf(word.missedLetter);

    //     if (letterIndex === -1) {
    //         return <span key={word.id} className="error">[Ошибка в данных]</span>;
    //     }

    //     const before = word.word.substring(0, letterIndex);
    //     const after = word.word.substring(letterIndex + 1);

    //     return (
    //         <span
    //             key={word.id}
    //             className={`word-input ${errors[word.id] ? 'error' : ''}`}
    //         >
    //             {before}
    //             <input
    //                 type="text"
    //                 value={inputValues[word.id] || ''}
    //                 onChange={e => handleInputChange(word.id, e.target.value)}
    //                 maxLength={1}
    //                 className={errors[word.id] ? 'input-error' : ''}
    //                 aria-label={`Пропущенная буква в слове "${word.word}"`}
    //             />
    //             {after}
    //         </span>
    //     );
    // };
    return {
        renderSentence,
        hasError
    }
}