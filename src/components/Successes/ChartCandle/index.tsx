import styles from './styles.module.scss';

export interface ChartCandleProps {
    id: number | string;
    maxPoints: number;
    currentPoints: number;
    date?: Date;
}

export const ChartCandle = ({
    id,
    maxPoints,
    currentPoints,
    date = new Date()
}: ChartCandleProps) => {

    const safeMaxPoints = Math.max(1, maxPoints);
    const clampedPoints = Math.max(0, Math.min(currentPoints, maxPoints));

    const pointsPercent = Math.min(100, Math.max(0,
        (clampedPoints / safeMaxPoints) * 100
    ));

    const formatDate = (date: Date): { day: number; month: string; } => {
        const day = date.getDate();
        const month = date.toLocaleString('ru-RU', { month: "short" });
        return { day: day, month: month.slice(0, 3) }
    };
    const dateT = formatDate(date);
    return (
        <div className={styles.index}>
            {/* <div
                className={styles.index__body}
                style={{
                    height: `${pointsPercent}%`,
                }}
                role="progressbar"
                aria-valuenow={clampedPoints}
                aria-valuemin={0}
                aria-valuemax={safeMaxPoints}
            /> */}
            <svg
                className={styles.index__body}
                width="45"
                height={`${pointsPercent}%`}
                viewBox="0 0 45 174"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="progressbar"
                aria-valuenow={clampedPoints}
                aria-valuemin={0}
                aria-valuemax={safeMaxPoints}>
                <rect x="0.5" width="44" height="100%" rx="12" fill="#1BAA7D" />
            </svg>
            <time className={styles.index__date}>
                <span>{dateT.day}</span>
                <span>{dateT.month}</span>
            </time>
        </div>
    )
}