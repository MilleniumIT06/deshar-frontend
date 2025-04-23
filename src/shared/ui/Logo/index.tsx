import Image from 'next/image';
import cn from 'classnames';
import styles from './styles.module.scss';
export const Logo = ({ size }: { size?: "small" }) => {
    const classes = cn(styles.index, size ? styles.small : styles.big)
    return (
        <div className={classes}>
            <a href="/">
                <Image
                    width={188}
                    height={28}
                    src="/logo.svg"
                    alt="Picture of the author"
                />
            </a>
        </div>
    )

}