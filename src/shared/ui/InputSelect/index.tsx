"use state";
import cn from 'classnames';
import styles from './styles.module.scss';
import { cva, type VariantProps } from 'class-variance-authority';
import { useState } from 'react';
const inputSelectVariants = cva(
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
export interface InputSelectProps extends VariantProps<typeof inputSelectVariants> {
  className?:string;
  placeholderValue:string;
}

const InputSelect = ({ variant, className,placeholderValue="example"}: InputSelectProps) => {
    const [value,setValue]=useState<number|string>("");
    const [open,setOpen] = useState(false);
    const handleChange = (value:number)=> {
        setValue(value);
        setOpen(false);
    }
    return <div className={cn(inputSelectVariants({ variant, className }))}>
            <input placeholder={placeholderValue} className={cn("input-reset",styles.input)} value={value} type='text'/>
            <button type="button" className={cn("btn-reset",styles.openBtn)} onClick={()=> setOpen(!open)}>
                <svg width="14" height="9" viewBox="0 0 14 9" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M13 1.5L7 7.5L1 1.5" stroke="#7D7979" stroke-width="1.5" />
</svg>
            </button>
            {open&&<div className={styles.options}>
                <div className={styles.option} onClick={()=>handleChange(1)}>1</div>
                <div className={styles.option} onClick={()=>handleChange(2)}>2</div>
                <div className={styles.option} onClick={()=>handleChange(3)}>3</div>
            </div>}
    </div>
}

export { InputSelect, inputSelectVariants }