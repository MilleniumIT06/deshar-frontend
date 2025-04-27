import cn from 'classnames';
import styles from './styles.module.scss';
import { RateCard } from '../RateCard';
export const Subscription = () => {
    return (
        <section className={styles.index}>
            <div className="container">
                <div className={styles.inner}>
                    <h2 className="section__title">Выбираем лучшую подписку</h2>
                    <ul className={cn("list-reset", styles.list)}>
                        <RateCard
                            lessonsCount={10}
                            modulesCount={11}
                            price={0}
                            subjectsCount={11}
                            title='test'
                            variant="free" />
                        <RateCard
                            lessonsCount={10}
                            modulesCount={11}
                            price={100}
                            subjectsCount={11}
                            title='test'
                            discount={10}
                            variant="standart" />
                        <RateCard
                            lessonsCount={10}
                            modulesCount={11}
                            price={100}
                            subjectsCount={11}
                            title='test'
                            discount={10}
                            variant="standart" />
                        <RateCard
                            lessonsCount={10}
                            modulesCount={11}
                            price={100}
                            subjectsCount={11}
                            title='test'
                            discount={10}
                            variant="premium" />
                    </ul>
                </div>
            </div>
        </section>

    )
}