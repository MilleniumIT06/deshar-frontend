"use client";
import { useState } from 'react';

import Link from 'next/link';

import cn from 'classnames';

import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Logo } from '@/shared/ui/Logo';

import styles from './styles.module.scss';


export const Header = () => {
    const [authed, setAuthed] = useState(true);
    return (<header className={styles.index}>
        <div className={cn("container", styles.headerContainer)}>



            <div className={styles.inner}>
                <Logo />
                <nav className={styles.headerNav}>
                    <ul className={`list-reset ${styles.list}`}>
                        <li className={styles.listItem}>
                            <a href="#" tabIndex={2}>Уроки</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="#" tabIndex={3}>Аттестация</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="#" tabIndex={4}>Контакты</a>
                        </li>
                        <li className={styles.listItem}>
                            <Link href="/profile.html" tabIndex={5}>Профиль</Link>
                        </li>
                    </ul>
                </nav>
                {authed ? <Avatar /> : <Button variant='primary' size="small" className={styles.headerBtn} tabIndex={6}>
                    Войти
                </Button>}
                <button className={cn("btn-reset", styles.headerBurger)} aria-label="Открыть меню" aria-expanded="false" data-burger>
                    <span className={styles.burgerLine}></span>
                </button>
            </div>
        </div>

    </header>)
}