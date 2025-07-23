'use client';

import styles from './index.module.scss';

export const MissedLetterTrainer = ({ render }: { render: () => React.ReactNode; }) => {
    return (
        <div className={styles.index}>
            {render()}
        </div>
    )
}