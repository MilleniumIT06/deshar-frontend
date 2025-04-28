"use state";
import cn from 'classnames';
import styles from './styles.module.scss';
import { cva, type VariantProps } from 'class-variance-authority';
import { ChangeVisible } from './ChangeVisible';
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
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
    visibleValue?: boolean;
    handleVisible?: () => void;
}

const Input = ({ variant, className, type, visibleValue, handleVisible, ...props }: InputProps) => {
    return <label className={cn(inputVariants({ variant, className }))}>
        <input className={styles.input} type={type}{...props} />
        {type === "password" && <ChangeVisible value={visibleValue} onChange={handleVisible} />}
    </label>
}

export { Input, inputVariants }