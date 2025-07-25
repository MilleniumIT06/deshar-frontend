'use client'
import { useState, useRef, useEffect } from 'react'

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
    inputValues: any;
    onComplete: (value: unknown) => void
    handleInputChange: (id: number, value: string) => void;
}) => {
    const [userInput, setUserInput] = useState('')
    const [status, setStatus] = useState('input') // 'input', 'success', 'error'
    const inputRef = useRef<HTMLInputElement | null>(null)
    const missingIndex = word && word.split('').findIndex(val => val === missingLetter);
    const check = word && missingIndex && missingLetter;
    console.log(missingIndex);
    // Фокус на инпут при загрузке
    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleInput = (e: any) => {
        const value = e.target.value.toLowerCase()
        setUserInput(value)

        if (value.length === 1) {
            checkLetter(value)
        }
    }

    const checkLetter = (letter: string) => {
        const correctLetter = word && missingIndex && word[missingIndex].toLowerCase()

        if (letter === correctLetter) {
            setStatus('success')
            if (onComplete) onComplete(true)
        } else {
            setStatus('error')
            setTimeout(() => {
                setStatus('input')
                inputRef.current?.focus()
            }, 1000)
        }
    }

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
                value={inputValues[id] || ''}
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
