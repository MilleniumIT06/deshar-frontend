"use client";
import { useState, useCallback } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import cn from 'classnames';

import styles from './styles.module.scss';

const inputVariants = cva(styles.base, {
    variants: {
        variant: {
            primary: styles.primary,
            secondary: styles.secondary,
        },
        size: {
            sm: styles.sm,
            md: styles.md,
            lg: styles.lg,
        },
        fullWidth: {
            true: styles.fullWidth,
        },
    },
    defaultVariants: {
        variant: "primary",
        size: "md",
    },
});

export interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>,
    VariantProps<typeof inputVariants> {
    error?: boolean;
    validationMessage?: string;
    startAdornment?: React.ReactNode;
    endAdornment?: React.ReactNode;
}

const Input = ({
    variant,
    size,
    fullWidth,
    className,
    type,
    error = false,
    startAdornment,
    endAdornment,
    validationMessage,
    ...props
}: InputProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;
    const showVisibilityToggle = isPassword && !props.disabled;

    return (
        <div className={cn(
            inputVariants({ variant, size, fullWidth, className }),
            { [styles.error]: error },
            { [styles.passwordInput]: isPassword }
        )
        }>
            {startAdornment && (
                <span className={styles.startAdornment}>
                    {startAdornment}
                </span>
            )}

            <input
                className={styles.input}
                type={inputType}
                aria-invalid={error}
                {...props}
            />

            {
                showVisibilityToggle && (
                    <button
                        type="button"
                        className={styles.visibilityButton}
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                    // tabIndex={-1} // Предотвращает фокусировку при табинге
                    >
                        {showPassword ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 12C20 16 16.4444 19 12 19C7.55556 19 4 16 2 12C4 8 7.55556 5 12 5C16.4444 5 20 8 22 12Z" strokeWidth="2" />
                            <circle cx="12" cy="12" r="3" strokeWidth="2" />
                        </svg>
                            :
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.5 17.2931C15.8976 18.3663 14.0427 19 12 19C7.55556 19 4 16 2 12C3.10926 9.78147 4.69704 7.87056 6.6496 6.60849M9.5 5.3291C10.296 5.11468 11.131 5 12 5C16.4444 5 20 8 22 12C21.3987 13.2026 20.6568 14.3148 19.7924 15.2823" strokeWidth="2" />
                                <path d="M14.1213 14.1213C12.9497 15.2929 11.0502 15.2929 9.87866 14.1213C8.70709 12.9497 8.70709 11.0502 9.87866 9.87866" strokeWidth="2" />
                                <path d="M4 4L20 20" strokeWidth="2" strokeLinecap="round" />
                            </svg>}
                    </button>
                )
            }

            {
                !isPassword && endAdornment && (
                    <span className={styles.endAdornment}>
                        {endAdornment}
                    </span>
                )
            }
            {validationMessage && <span className={styles.validationMessage}>{validationMessage}</span>}
        </div >
    );
}

export { Input, inputVariants };