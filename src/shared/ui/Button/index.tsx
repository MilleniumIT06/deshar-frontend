import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import styles from './styles.module.scss';
import cn from "classnames"

const buttonVariants = cva(
    styles.index,
    {
        variants: {
            variant: {
                default: styles.primary,
                primary: styles.primary,
                secondary: styles.secondary,
                iconPrimary: styles.iconPrimary,
                iconSecondary: styles.iconSecondary
            },
            size: {
                default: styles.big,
                big: styles.big,
                medium: styles.medium,
                small: styles.small,
                iconBig: styles.iconBig,
                iconSmall: styles.iconSmall
            },
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
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant, size, ...props }, ref) => {
        return (
            <button
                className={cn(buttonVariants({ variant, size, className }))}
                ref={ref}
                {...props}
            />
        )
    }
)
Button.displayName = "Button"

export { Button, buttonVariants }