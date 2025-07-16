import { AttestationPaginator } from '../AttestationPaginator';

import styles from './styles.module.scss';

export const LearningAttestation = () => {
    return (
        <div className={styles.index}>
            <AttestationPaginator />
        </div>
    )
}