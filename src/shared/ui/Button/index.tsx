import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import cn from "classnames";

import styles from './styles.module.scss';

const buttonVariants = cva(
    styles.index,
    {
        variants: {
            variant: {
                default: styles.primary,
                primary: styles.primary,
                secondary: styles.secondary,
                iconPrimary: styles.iconPrimary,
                iconSecondary: styles.iconSecondary,
                iconThird: styles.iconThird
            },
            size: {
                default: styles.big,
                big: styles.big,
                medium: styles.medium,
                small: styles.small,
                iconBig: styles.iconBig,
                iconSmall: styles.iconSmall
            },
            loading: {
                true: styles.loading
            },
            fullWidth: {
                true: styles.fullWidth
            }
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
    loading?: boolean;
    fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ 
        className, 
        variant, 
        size, 
        loading = false,
        disabled = false,
        fullWidth = false,
        children,
        ...props 
    }, ref) => {
        
        const isDisabled = disabled || loading;
        
        return (
            <button
                className={cn(
                    buttonVariants({ 
                        variant, 
                        size, 
                        loading, 
                        fullWidth,
                        className 
                    })
                )}
                ref={ref}
                disabled={isDisabled}
                aria-disabled={isDisabled}
                aria-busy={loading}
                {...props}
            >
                {loading ? (
                    <span className={styles.loadingContent}>
                        <span className={styles.loader} aria-hidden="true">
                            <svg className={styles.spinner} viewBox="0 0 50 50">
                                <circle cx="25" cy="25" r="20" fill="none" stroke="currentColor" strokeWidth="4" />
                            </svg>
                        </span>
                        <span>{children}</span>
                    </span>
                ) : (
                    children
                )}
            </button>
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }