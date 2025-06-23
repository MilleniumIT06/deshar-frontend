'use client'
import { Button } from '@/shared/ui/Button'
import styles from './styles.module.scss'
import { useState } from 'react'
import Link from 'next/link'
import { Tabs } from '@/shared/ui/Tabs'
import { InputSelect } from '@/shared/ui/InputSelect'
export const ProgramSelectionForm = () => {
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [{ id: 0, name: "Ингушетия" }, { id: 1, name: "Др. регионы" }];
    return (
        <div className={styles.index}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Выбор программы</h1>
                <Tabs activeTab={activeTab} handleTab={setActiveTab} tabs={tabs} maxWidth />
                {activeTab === 0 ? <form className={styles.form}>
                    <InputSelect placeholderValue='Выберите населенный пункт' />
                    <InputSelect placeholderValue='Выберите школу' />
                    <InputSelect placeholderValue='Выберите класс' />
                    <Button className={styles.btn} size="medium">
                        Зарегистрировать
                    </Button>
                </form> : <form className={styles.form}>

                    <Button className={styles.btn} size="medium">
                        Зарегистрировать
                    </Button>
                </form>}
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
