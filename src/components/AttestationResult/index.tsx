import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';

export const AttestationResult = () => {
    return <section className={styles.index}>
        <div className={styles.index__inner}>
            <div className={styles.index__content}>
                <div className={styles.points}>
                    <div className={styles.points__content_wrapper}>
                        <div className={styles.points__content}>
                            <span className={styles.points__value}>98</span>
                            <span className={styles.points__subtitle}>баллов</span>
                        </div>
                    </div>
                    <h6 className={styles.index__title}>Вы успешно прошли модуль!</h6>
                </div>
                <div className={styles.index__btns}>
                    <Button className={styles.index__btn} variant="primary" size="small" fullWidth>Следующий модуль</Button>
                    <Button className={styles.index__btn} variant="secondary" size="small" fullWidth>Вернуться в профиль</Button>
                </div>
            </div>
        </div>


    </section>
}