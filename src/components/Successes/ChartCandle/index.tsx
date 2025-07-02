import styles from './styles.module.scss';

export interface ChartCandleProps {
    maxPoints: number;
    currentPoints: number;
    date?: Date; 
}

export const ChartCandle = ({
    maxPoints,
    currentPoints,
    date = new Date() 
}: ChartCandleProps) => {

    const safeMaxPoints = Math.max(1, maxPoints);
    const clampedPoints = Math.max(0, Math.min(currentPoints, maxPoints));

    const pointsPercent = Math.min(100, Math.max(0,
        (clampedPoints / safeMaxPoints) * 100
    ));

    const formatDate = (date: Date): string => {
        const day = date.getDate();
        const month = date.toLocaleString('ru-RU', { month: 'long' });
        return `${day} ${month}`;
    };

    return (
        <div className={styles.index}>
            <div
                className={styles.index__body}
                style={{
                    height: `${pointsPercent}%`,
                    transition: 'height 0.3s ease-in-out'
                }}
                role="progressbar"
                aria-valuenow={clampedPoints}
                aria-valuemin={0}
                aria-valuemax={safeMaxPoints}
            />
            <span className={styles.index__title}>{formatDate(date)}</span>
        </div>
    )
}