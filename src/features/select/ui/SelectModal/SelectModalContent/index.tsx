'use client';
import Image from 'next/image';
import { redirect, RedirectType } from 'next/navigation'

import { useAppDispatch } from '@/app/_store/hooks';
import { changeStatus } from '@/entities/learning/model/status.slice';
import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';

export const SelectModalContent = ({ onClose }: { onClose: () => void; }) => {
    const dispatch = useAppDispatch();
    const handleClickStartBtn = () => {

        dispatch(changeStatus("attestation"));
        redirect('/attestation', RedirectType.replace)
    }
    return <div className={styles.index}>

        <div className={styles.index__image}>
            <Image fill src="/images/Modal/letsAttestateImage.png" alt="Attestation image" />
        </div>
        <span className={styles.index__subtitle}>Приступим к аттестации?</span>
        <div className={styles.index__btns}>
            <Button variant="secondary" size="small" className={styles.index__btn} onClick={onClose}>Отмена</Button>
            <Button variant="primary" size="small" className={styles.index__btn} onClick={handleClickStartBtn}>Начать</Button>
        </div>
    </div>
}