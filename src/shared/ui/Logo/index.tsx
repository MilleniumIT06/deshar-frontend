import Image from 'next/image';
import Link from 'next/link';

import cn from 'classnames';

import styles from './styles.module.scss';

export const Logo = ({ size }: { size?: "small" }) => {
    const classes = cn(styles.index, size ? styles.small : styles.big)
    return (
        <div className={classes}>
            <Link href="/" tabIndex={1}>
                <Image
                    width={188}
                    height={28}
                    src="/logo.svg"
                    alt="Picture of the author"
                />
            </Link>
        </div>
    )

}