'use client'
import { useState, useRef, useEffect } from 'react'

import styles from './styles.module.scss';

const MissingLetter = ({
    word,
    missingIndex,
    onComplete,
}: {
    word: string
    missingIndex: number
    onComplete: (value: unknown) => void
}) => {
    const [userInput, setUserInput] = useState('')
    const [status, setStatus] = useState('input') // 'input', 'success', 'error'
    const inputRef = useRef<HTMLInputElement | null>(null)

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
        const correctLetter = word[missingIndex].toLowerCase()

        if (letter === correctLetter) {
            setStatus('success')
            if (onComplete) onComplete(true)
        } else {
            setStatus('error')
            setTimeout(() => {
                setStatus('input')
                setUserInput('')
                inputRef.current?.focus()
            }, 1000)
        }
    }

    // Разбиваем слово на части
    const before = word.slice(0, missingIndex)
    const after = word.slice(missingIndex + 1)

    return (
        <span className={styles.index}>
            <span>{before}</span>

            <input
                ref={inputRef}
                type="text"
                value={userInput}
                onChange={handleInput}
                maxLength={1}
                disabled={status !== 'input'}
                className={styles.index__input}
            />

            <span>{after}</span>
        </span>
    )
}

export default MissingLetter
