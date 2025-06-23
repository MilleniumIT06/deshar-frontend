"use client";
import { useState, useCallback } from 'react';
import cn from 'classnames';
import styles from './styles.module.scss';
import { cva, type VariantProps } from 'class-variance-authority';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

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
                        {showPassword ? <EyeIcon size={18} /> : <EyeOffIcon size={18} />}
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
        </div >
    );
}

export { Input, inputVariants };