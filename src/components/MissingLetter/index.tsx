'use client'
import { useState, useRef, useEffect } from 'react'

import styles from './styles.module.scss';

const MissingLetter = ({
    id = 999,
    word,
    missingLetter,
    onComplete,
}: {
    id: number | string | undefined;
    word: string | undefined;
    missingLetter: string | undefined;
    onComplete: (value: unknown) => void
}) => {
    const [userInput, setUserInput] = useState('')
    const [status, setStatus] = useState('input') // 'input', 'success', 'error'
    const inputRef = useRef<HTMLInputElement | null>(null)
    const missingIndex = word && word.split('').findIndex(val => val === missingLetter);
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
        const correctLetter = word && word[missingIndex].toLowerCase()

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

    // Разбиваем слово на части
    const before = word &&  word.slice(0, missingIndex)
    const after = word &&  word.slice(missingIndex + 1)

    return (
        <span className={styles.index}>
            <span>{before}</span>

            <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                maxLength={1}
                className={styles.index__input}
            />

            <span>{after+" "}</span>
        </span>
    )
}

export default MissingLetter
