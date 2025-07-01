import { ProgressBar } from '@/shared/ui/ProgressBar';

import styles from './styles.module.scss';

export const AttestationItem = ({max=5,current=1}:{max:number;current:number})=> {
    return (
        <div className={styles.index}>
            <div className={styles.inner}>
                <div className={styles.index__top}>
                    <span className={styles.index__title}>Прогресс</span>
                    <div className={styles.index__counter}>
                        <span>{current}</span>
                        /
                        <span>{max}</span>
                    </div>
                </div>
                <ProgressBar maxLessons={max} doneLessons={0} processLessons={current} className={styles.index__bar}/>
            </div>
        </div>
    )
}