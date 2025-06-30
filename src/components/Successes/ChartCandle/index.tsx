import styles from './styles.module.scss';

export const ChartCandle = ({ maxPoints, currentPoints }: { maxPoints: number; currentPoints: number }) => {
    const pointsPercent = (currentPoints / maxPoints) * 100;
    return (
        <div className={styles.index}>
            <div className={styles.index__body} style={{ height: pointsPercent + "%" }}></div>
            <span className={styles.index__title}>test</span>
        </div>
    )
}