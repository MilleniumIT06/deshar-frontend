import Image from 'next/image';
import cn from 'classnames';
import styles from './styles.module.scss';
export const Header = () => {

    return (<header className={styles.index}>
        <div className={cn("container", styles.headerContainer)}>



            <div className={styles.inner}>
                <div className={styles.logo}>
                    <a href="/">
                        <Image
                            width={188}
                            height={28}
                            src="/logo.svg"
                            alt="Picture of the author"
                        />
                    </a>
                </div>
                <nav className="header__nav">
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
                            <a href="/profile.html">Профиль</a>
                        </li>
                    </ul>
                </nav>
                <button className="btn-reset btn btn--primary header__btn">
                    Войти
                </button>
                <button className="btn-reset burger header__burger" aria-label="Открыть меню" aria-expanded="false" data-burger>
                    <span className="burger__line"></span>
                </button>
            </div>
        </div>

    </header>)
}