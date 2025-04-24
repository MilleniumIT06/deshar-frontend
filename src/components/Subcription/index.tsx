import cn from 'classnames';
import styles from './styles.module.scss';
import { SubscriptionItem } from './SubscriptionItem';
export const Subscription = () => {
    return (
        <section className={styles.index}>
            <div className="container">
                <div className={styles.inner}>
                    <h2 className="section__title">Выбираем лучшую подписку</h2>
                    <ul className={cn("list-reset", styles.list)}>
                        <SubscriptionItem
                            lessonsCount={10}
                            modulesCount={11}
                            price={100}
                            subjectsCount={11}
                            title='test'
                            discount={10}
                            variant="primary" />
                        <SubscriptionItem
                            lessonsCount={10}
                            modulesCount={11}
                            price={100}
                            subjectsCount={11}
                            title='test'
                            discount={10}
                            variant="secondary" />
                        <SubscriptionItem
                            lessonsCount={10}
                            modulesCount={11}
                            price={100}
                            subjectsCount={11}
                            title='test'
                            discount={10}
                            variant="secondary" />
                        <SubscriptionItem
                            lessonsCount={10}
                            modulesCount={11}
                            price={100}
                            subjectsCount={11}
                            title='test'
                            discount={10}
                            variant="tertiary" />
                    </ul>
                </div>
            </div>
        </section>

    )
}