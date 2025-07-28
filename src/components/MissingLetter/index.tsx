'use client'
import {useRef, useEffect } from 'react'

import styles from './styles.module.scss';

const MissingLetter = ({
    id = 999,
    word,
    missingLetter,
    onComplete,
    errors,
    inputValues,
    handleInputChange
}: {
    id: number | string;
    word: string;
    missingLetter: string;
    errors: Record<number, boolean>;
    inputValues: Record<number, string>;
    onComplete?: (value: unknown) => void
    handleInputChange: (id: number, value: string) => void;
}) => {
    // const [userInput, setUserInput] = useState('')
    // const [status, setStatus] = useState('input') // 'input', 'success', 'error'
    const inputRef = useRef<HTMLInputElement | null>(null)
    const missingIndex = word && word.split('').findIndex(val => val === missingLetter);
    const check = word && missingIndex && missingLetter;
    console.log(missingIndex);
    // Фокус на инпут при загрузке
    useEffect(() => {
        inputRef.current?.focus()
    }, [])



    const letterIndex = word.indexOf(missingLetter);

    if (letterIndex === -1) {
        return <span key={id} className="error">[Ошибка в данных]</span>;
    }

    const before = check && word.substring(0, letterIndex);
    const after = check && word.substring(letterIndex + 1);

    return (
        <span
            key={id}
            className={`${styles.index} ${errors[+id] ? styles.index__error : ''}`}
        >
            {before}
            <input
                type="text"
                value={inputValues[+id] || ''}
                onChange={e => handleInputChange(+id, e.target.value)}
                maxLength={1}
                className={`${styles.index__input} ${errors[+id] ? styles.index__input_error : ''}`}
                aria-label={`Пропущенная буква в слове "${word}"`}
            />
            {after}
        </span>
    );
}

export default MissingLetter
