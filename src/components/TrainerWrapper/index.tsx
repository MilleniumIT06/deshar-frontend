'use client';
import { redirect, RedirectType } from 'next/navigation';

import { useAppSelector, useAppDispatch } from '@/app/_store/hooks';
import { changeStatus } from '@/entities/learning/model/status.slice';
import { Button } from '@/shared/ui/Button'

import { Notification } from '../../shared/ui/Notification'

import styles from './styles.module.scss'

export const TrainerWrapper = ({
    title = 'test',
    children,
    isButtonDisabled,
    hasError,
    handleCheckAnswers,
}: {
    title: string
    children: React.ReactNode;
    completed?: boolean;
    isButtonDisabled: boolean;
    hasError: boolean;
    handleCheckAnswers: () => void;
}) => {
    const { data } = useAppSelector(state => state.learningAttestationReducer);
    const dispatch = useAppDispatch();
    const checkAllCompleted = () => {
        if (data.every(item => item.completed === true)) {
            return true
        }
        return false
    }
    const handleClickFinishBtn = () => {
        dispatch(changeStatus("finish"));
        redirect(`/attestation-result`, RedirectType.replace)
    }
    return (
        <div className={styles.index}>
            <div className={styles.index__inner}>
                <h6 className={styles.index__title}>{title}</h6>
                <div className={styles.index__content}>{children}</div>

                {hasError && <Notification fullWidth={true} type="warning" warningMessage="Ответ неверный! Попробуйте еще раз." successMessage="Success" />}
                <div className={styles.index__footer}>
                    <Button variant="secondary" size="small">Назад</Button>


                    {
                        checkAllCompleted() ? <Button variant="primary" size="small" onClick={handleClickFinishBtn} disabled={isButtonDisabled}>Завершить аттестацию</Button> : <Button variant="primary" size="small" onClick={handleCheckAnswers} disabled={isButtonDisabled}>Далее</Button>

                    }

                </div>
            </div>
        </div>
    )
}
