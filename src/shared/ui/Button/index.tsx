import * as React from 'react'

import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import cn from 'classnames'

import './styles.scss'

const buttonVariants = cva('Button', {
	variants: {
		variant: {
			default: 'Button__primary',
			primary: 'Button__primary',
			secondary: 'Button__secondary',
			iconPrimary: 'Button__iconPrimary',
			iconSecondary: 'Button__iconSecondary',
			iconThird: 'Button__iconThird',
		},
		size: {
			default: 'Button__big',
			big: 'Button__big',
			medium: 'Button__medium',
			small: 'Button__small',
			iconBig: 'Button__iconBig',
			iconSmall: 'Button__iconSmall',
		},
		loading: {
			true: 'Button__loading',
		},
		fullWidth: {
			true: 'Button__fullWidth',
		},
		isDisabled: {
			true: 'Button__disabled',
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
			<span className="Button__loadingContent">
				<span className="Button__loader" aria-hidden="true">
					<svg className="Button__spinner" viewBox="0 0 50 50">
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
