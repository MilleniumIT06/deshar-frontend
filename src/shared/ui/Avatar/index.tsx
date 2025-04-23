import Image from 'next/image';
import styles from './styles.module.scss';
export const Avatar = () => {
    return <div className={styles.index}>
        <div className={styles.image}>
            <Image src="/avatar.png" alt="Avatar" width={44} height={44} />
        </div>
        <span className={styles.name}>
            Заур П.
        </span>
    </div>
}