import cn from 'classnames';
import styles from './styles.module.scss';
import { cva, type VariantProps } from 'class-variance-authority';
const inputVariants = cva(
    styles.index,
    {
        variants: {
            variant: {
                default: styles.primary,
                primary: styles.primary,
                secondary: styles.secondary,
            }
        },
        defaultVariants: {
            variant: "default",
        },
    }
)
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> { }

const Input = ({ variant, className, ...props }: InputProps) => {
    return <label className={cn(inputVariants({ variant, className }))}>
        <input className={styles.input}  {...props} />
    </label>
}

export { Input, inputVariants }