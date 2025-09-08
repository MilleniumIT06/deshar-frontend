/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { vi, describe, it, expect } from 'vitest'

import { Logo } from './index' // Adjust import path according to your structure

// Mock next/image and next/link components
vi.mock('next/image', () => ({
	default: (props: any) => {
		// eslint-disable-next-line jsx-a11y/alt-text
		return <img {...props} />
	},
}))

vi.mock('next/link', () => ({
	default: (props: any) => {
		return <a {...props} href={props.href} />
	},
}))

describe.skip('Logo Component', () => {
	it('renders without crashing', () => {
		render(<Logo />)
		expect(screen.getByRole('link')).toBeInTheDocument()
	})

	it('has correct aria label for accessibility', () => {
		render(<Logo />)
		expect(screen.getByLabelText('Перейти на главную страницу')).toBeInTheDocument()
	})

	it('links to the correct href', () => {
		const testHref = '/test-page'
		render(<Logo href={testHref} />)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('href', testHref)
	})

	it('uses default href when not provided', () => {
		render(<Logo />)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('href', '/')
	})

	it('renders with small size by default', () => {
		const { container } = render(<Logo />)

		// Check if the container has the small class
		// This assumes your styles are applied as classes
		expect(container.firstChild).toHaveClass('small') // Adjust based on your actual class names
	})

	it('applies correct size classes', () => {
		const { rerender } = render(<Logo size="large" />)

		// Check if the container has the large class
		// This assumes your styles are applied as classes
		const container = screen.getByLabelText('Перейти на главную страницу').parentElement
		expect(container).toHaveClass('large') // Adjust based on your actual class names

		rerender(<Logo size="responsive" />)
		expect(container).toHaveClass('responsive') // Adjust based on your actual class names
	})

	it('applies custom className', () => {
		const customClass = 'custom-logo-class'
		const { container } = render(<Logo className={customClass} />)

		expect(container.firstChild).toHaveClass(customClass)
	})

	it('renders image with correct alt text', () => {
		render(<Logo />)

		const image = screen.getByAltText('Логотип компании')
		expect(image).toBeInTheDocument()
	})

	it('has correct tabindex', () => {
		render(<Logo />)

		const link = screen.getByRole('link')
		expect(link).toHaveAttribute('tabindex', '1')
	})
})
