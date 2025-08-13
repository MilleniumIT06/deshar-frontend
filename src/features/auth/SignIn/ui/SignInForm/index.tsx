'use client'
import { useState } from 'react'

import Link from 'next/link'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import styles from './styles.module.scss'



export const SignInForm = () => {
    const [vis, setVis] = useState(false)
    const handleVisible = () => {
        setVis(!vis)
    }
    return (
        <div className={styles.index}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Вход в систему</h1>
                <form className={styles.form}>
                    <Input
                        type="email"
                        placeholder="Введите логин или email"
                        className={styles.input}
                    />
                    <Input
                        type="password"
                        placeholder="Введите пароль"
                        visibleValue={vis}
                        handleVisible={handleVisible}
                        className={styles.input}
                    />
                    <Button className={styles.btn} size="medium">
                        Войти
                    </Button>
                </form>
                <div className={styles.bottom}>
                    <div>
                        Еще не зарегистрированы? 
                        <Link href="/sign-up"> Зарегистрироваться</Link>
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
