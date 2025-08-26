import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Button } from './index' // Adjust import path according to your structure

describe('Button Component', () => {
	it('renders without crashing', () => {
		render(<Button>Click me</Button>)
		expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
	})

	it('displays children correctly', () => {
		const buttonText = 'Test Button'
		render(<Button>{buttonText}</Button>)
		expect(screen.getByText(buttonText)).toBeInTheDocument()
	})

	it('handles click events', () => {
		const handleClick = vi.fn()
		render(<Button onClick={handleClick}>Click me</Button>)

		const button = screen.getByRole('button')
		fireEvent.click(button)

		expect(handleClick).toHaveBeenCalledTimes(1)
	})

	it('does not handle click events when disabled', () => {
		const handleClick = vi.fn()
		render(
			<Button disabled onClick={handleClick}>
				Disabled Button
			</Button>,
		)

		const button = screen.getByRole('button')
		fireEvent.click(button)

		expect(handleClick).not.toHaveBeenCalled()
	})

	it('does not handle click events when loading', () => {
		const handleClick = vi.fn()
		render(
			<Button loading onClick={handleClick}>
				Loading Button
			</Button>,
		)

		const button = screen.getByRole('button')
		fireEvent.click(button)

		expect(handleClick).not.toHaveBeenCalled()
	})

	it('shows loading indicator when loading', () => {
		render(<Button loading>Loading</Button>)

		expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true')
		// Check if loading spinner is present
		expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
	})

	it('applies disabled attributes correctly', () => {
		render(<Button disabled>Disabled</Button>)

		const button = screen.getByRole('button')
		expect(button).toBeDisabled()
		expect(button).toHaveAttribute('aria-disabled', 'true')
	})

	it('renders as child component when asChild is true', () => {
		const TestComponent = () => (
			<Button asChild>
				<a href="/test">Link Button</a>
			</Button>
		)

		render(<TestComponent />)

		// Should render as an anchor tag, not a button
		expect(screen.getByRole('link', { name: /link button/i })).toBeInTheDocument()
		expect(screen.queryByRole('button')).not.toBeInTheDocument()
	})

	it('applies fullWidth class when fullWidth is true', () => {
		render(<Button fullWidth>Full Width</Button>)

		// This test assumes you have a way to check for the class
		// You might need to adjust based on your actual implementation
		const button = screen.getByRole('button')
		expect(button).toHaveClass('fullWidth') // Adjust class name as needed
	})
})
