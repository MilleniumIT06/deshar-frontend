import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'classnames'

import styles from './styles.module.scss'

const buttonVariants = cva(styles.index, {
	variants: {
		variant: {
			default: styles.primary,
			primary: styles.primary,
			secondary: styles.secondary,
			iconPrimary: styles.iconPrimary,
			iconSecondary: styles.iconSecondary,
			iconThird: styles.iconThird,
		},
		size: {
			default: styles.big,
			big: styles.big,
			medium: styles.medium,
			small: styles.small,
			iconBig: styles.iconBig,
			iconSmall: styles.iconSmall,
		},
		loading: {
			true: styles.loading,
		},
		fullWidth: {
			true: styles.fullWidth,
		},
		isDisabled: {
			true: styles.disabled,
		},
	},
	defaultVariants: {
		variant: 'default',
		size: 'default',
	},
})

export interface ButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'disabled'>,
		VariantProps<typeof buttonVariants> {
	loading?: boolean
	fullWidth?: boolean
	asChild?: boolean
	disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
	(
		{
			className,
			variant,
			size,
			loading = false,
			disabled = false,
			fullWidth = false,
			asChild = false,
			children,
			...props
		},
		ref,
	) => {
		const isDisabled = disabled || loading
		const Comp = asChild ? Slot : 'button'

		const content = loading ? (
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
		)

		return (
			<Comp
				className={cn(
					buttonVariants({
						className,
						variant,
						size,
						loading,
						fullWidth,
						isDisabled: isDisabled,
					}),
				)}
				ref={ref}
				disabled={!asChild ? isDisabled : undefined}
				aria-disabled={isDisabled}
				aria-busy={loading}
				{...props}
				onClick={
					isDisabled
						? e => {
								e.preventDefault()
								e.stopPropagation()
							}
						: props.onClick
				}>
				{content}
			</Comp>
		)
	},
)
Button.displayName = 'Button'

export { Button, buttonVariants }
