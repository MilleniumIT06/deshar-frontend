import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';

export const QuizDialog = () => {
    return (
        <div className={styles.index}>
            <Button variant="iconSecondary" size="iconSmall" className={styles.index__closeBtn}>
                <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.6667 16.667L3.33342 3.33366" stroke="#303030" stroke-width="2" />
                    <path d="M3.33325 16.667L16.6666 3.33366" stroke="#303030" stroke-width="2" />
                </svg>
            </Button>
            <div className={styles.index__inner}>
                <div className={styles.index__top}>
                    <h6 className={styles.index__title}>Впишите пропущенные буквы в следующем предложении</h6>
                    <div className={styles.index__content}>
                        Купил как-то обувной мастер гв  о    зди для того, чтобы поч и     нить обувь лорда Маркиза. К сожалению, он не знал насколько придирчив лорд.
                    </div>
                </div>
                <div className={styles.index__bottom}>
                    <Button variant="secondary" size="medium">Отмена</Button>
                    <Button variant="primary" size="medium">Принять</Button>
                </div>
            </div>
        </div>
    )
}