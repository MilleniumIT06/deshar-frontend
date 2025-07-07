'use client';
import React, { ReactNode, useEffect } from 'react';

import ReactDOM from 'react-dom';

import { Button } from '@/shared/ui/Button';

import styles from './styles.module.scss';


interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    closeOnOverlayClick?: boolean;
}

export const Modal = ({
    isOpen,
    onClose,
    children,
    closeOnOverlayClick
}: ModalProps) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;


    return ReactDOM.createPortal(
        <div className={styles.index__overlay} onClick={closeOnOverlayClick ? onClose : undefined}>
            <div
                className={styles.index}
            >
                <Button variant="iconSecondary" size="iconSmall" className={styles.index__closeBtn} onClick={onClose}>
                    <svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.6667 16.667L3.33342 3.33366" stroke="#303030" strokeWidth="2" />
                        <path d="M3.33325 16.667L16.6666 3.33366" stroke="#303030" strokeWidth="2" />
                    </svg>
                </Button>
                <div className={styles.index__inner}>
                    <div
                        className={styles.index__content}
                        onClick={e => e.stopPropagation()}
                    >
                        {children}

                    </div>
                </div>

            </div>
        </div>,
        document.body
    );
};