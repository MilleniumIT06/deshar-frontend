'use client'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import styles from './styles.module.scss'
import { useState } from 'react'
import Link from 'next/link'
export const SignUpForm = () => {
    const [vis, setVis] = useState(false)
    const [visT, setVisT] = useState(false)
    const handleVisible = () => {
        setVis(!vis)
    }
    const handleVisibleT = () => {
        setVisT(!visT)
    }
    return (
        <div className={styles.index}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Вход в систему</h1>
                <form className={styles.form}>
                    <Input
                        type="text"
                        placeholder="Введите имя"
                        className={styles.input}
                    />
                    <Input
                        type="text"
                        placeholder="Введите фамилию"
                        className={styles.input}
                    />
                    <Input
                        type="email"
                        placeholder="Введите email"
                        className={styles.input}
                    />
                    <Input
                        type="password"
                        placeholder="Придумайте пароль"
                        visibleValue={vis}
                        handleVisible={handleVisible}
                        className={styles.input}
                    />
                    <Input
                        type="password"
                        placeholder="Подтвердите пароль"
                        visibleValue={visT}
                        handleVisible={handleVisibleT}
                        className={styles.input}
                    />
                    <Button className={styles.btn} size="medium">
                        Далее
                    </Button>
                </form>
                <div className={styles.bottom}>
                    <div>
                        Уже зарегистрированы?{' '}
                        <Link href="/sign-in">Войти</Link>
                    </div>
                    <p>
                        Продолжая, вы соглашаетесь на обработку персональных данных
                        и принимаете условия пользоват. соглашения
                    </p>
                </div>
            </div>
        </div>
    )
}
