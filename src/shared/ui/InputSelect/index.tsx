'use client';
import { useState } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import cn from 'classnames';
import { motion, AnimatePresence } from 'motion/react';

import styles from './styles.module.scss';

const inputSelectVariants = cva(styles.index, {
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
});

export interface InputSelectProps extends VariantProps<typeof inputSelectVariants> {
  className?: string;
  placeholderValue: string;
  options?: { value: string | number; label: string }[];
  value: number | string;
  setValue: (value: number | string) => void;
}

const InputSelect = ({
  variant,
  className,
  placeholderValue = "example",
  options = [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3' },
  ],
  setValue,
  value
}: InputSelectProps) => {
  const [open, setOpen] = useState(false);

  const handleChange = (selectedValue: string | number) => {
    setValue(selectedValue);
    setOpen(false);
  };

  const selectedLabel = options.find(option => option.value === value)?.label || '';

  return (
    <div className={cn(inputSelectVariants({ variant, className }))}>
      <input
        placeholder={placeholderValue}
        className={cn("input-reset", styles.input)}
        value={selectedLabel}
        type="text"
        readOnly
      />

      <button
        type="button"
        className={cn("btn-reset", styles.openBtn)}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Toggle dropdown"
      >
        <motion.svg
          width="14"
          height="9"
          viewBox="0 0 14 9"
          fill="none"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M13 1.5L7 7.5L1 1.5" stroke="#7D7979" strokeWidth="1.5" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.options}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(styles.option, {
                  [styles.selected]: option.value === value
                })}
                onClick={() => handleChange(option.value)}
              >
                {option.label}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export { InputSelect, inputSelectVariants };