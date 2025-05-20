'use client'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import styles from './styles.module.scss'
import { useState } from 'react'
import Link from 'next/link'
import { Tabs } from '@/shared/ui/Tabs'
export const ProgramSelectionForm = () => {
     const [activeTab, setActiveTab] = useState(0);
    const tabs = [{ id: 0, name: "Ингушетия" }, { id: 1, name: "Др. регионы" }];
    return (
        <div className={styles.index}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Выбор программы</h1>
                   <Tabs activeTab={activeTab} handleTab={setActiveTab} tabs={tabs} />
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
                    <Button className={styles.btn} size="medium">
                        Зарегистрировать
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
