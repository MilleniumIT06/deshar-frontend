'use client'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import styles from './styles.module.scss'
import Link from 'next/link'
import { InputSelect } from '@/shared/ui/InputSelect'
import { useState } from 'react'
export const SignUpForm = ({ testHandle }: { testHandle: () => void; }) => {
    const [p, setP] = useState("");
    return (
        <div className={styles.index}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Регистрация аккаунта</h1>
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
                    <InputSelect variant="default" placeholderValue="Test" />
                    <Input
                        type="password"
                        placeholder="Придумайте пароль"
                        className={styles.input}
                        value={p}
                        onChange={(e) => setP(e.target.value)}
                    />
                    {p}
                    <Input
                        type="password"
                        placeholder="Подтвердите пароль"
                        className={styles.input}
                    />
                    <Button className={styles.btn} size="medium" onClick={testHandle}>
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
