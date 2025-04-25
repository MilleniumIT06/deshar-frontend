"use client";
import cn from 'classnames';
import styles from './styles.module.scss';
import { Button } from '@/shared/ui/Button';
import { Logo } from '@/shared/ui/Logo';
import { useState } from 'react';
import { Avatar } from '@/shared/ui/Avatar';
import Link from 'next/link';
export const Header = () => {
    const [authed, setAuthed] = useState(true);
    return (<header className={styles.index}>
        <div className={cn("container", styles.headerContainer)}>



            <div className={styles.inner}>
                <Logo />
                <nav className={styles.headerNav}>
                    <ul className={`list-reset ${styles.list}`}>
                        <li className={styles.listItem}>
                            <a href="#">Уроки</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="#">Аттестация</a>
                        </li>
                        <li className={styles.listItem}>
                            <a href="#">Контакты</a>
                        </li>
                        <li className={styles.listItem}>
                            <Link href="/profile.html">Профиль</Link>
                        </li>
                    </ul>
                </nav>
                {authed ? <Avatar /> : <Button variant='primary' size="small" className={styles.headerBtn}>
                    Войти
                </Button>}
                <button className={cn("btn-reset", styles.headerBurger)} aria-label="Открыть меню" aria-expanded="false" data-burger>
                    <span className={styles.burgerLine}></span>
                </button>
            </div>
        </div>

    </header>)
}