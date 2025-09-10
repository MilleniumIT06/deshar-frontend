import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Input } from './index'

describe('Input Component', () => {
	it('renders without crashing', () => {
		render(<Input />)
		expect(screen.getByRole('textbox')).toBeInTheDocument()
	})

	it('displays the correct placeholder', () => {
		const placeholder = 'Enter text'
		render(<Input placeholder={placeholder} />)
		expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument()
	})

	it('handles value change correctly', () => {
		const handleChange = vi.fn()
		render(<Input onChange={handleChange} />)
		const input = screen.getByRole('textbox')

		fireEvent.change(input, { target: { value: 'test' } })
		expect(handleChange).toHaveBeenCalledTimes(1)
	})

	it('shows validation message when error occurs', () => {
		const errorMessage = 'Invalid input'
		render(<Input error validationMessage={errorMessage} />)

		expect(screen.getByText(errorMessage)).toBeInTheDocument()
		expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true')
	})

	it('toggles password visibility', () => {
		render(<Input type="password" data-testid="Input-test" />)

		const button = screen.getByTestId('button-test')
		const input = screen.getByTestId('Input-test')

		expect(input).toHaveAttribute('type', 'password')

		fireEvent.click(button)
		expect(input).toHaveAttribute('type', 'text')
		expect(button).toHaveAttribute('aria-label', 'Hide password')

		fireEvent.click(button)
		expect(input).toHaveAttribute('type', 'password')
	})

	it('displays start and end adornments', () => {
		const startAdornment = <span data-testid="start">$</span>
		const endAdornment = <span data-testid="end">€</span>

		render(<Input startAdornment={startAdornment} endAdornment={endAdornment} />)

		expect(screen.getByTestId('start')).toBeInTheDocument()
		expect(screen.getByTestId('end')).toBeInTheDocument()
	})

	it('applies disabled state correctly', () => {
		render(<Input disabled />)
		expect(screen.getByRole('textbox')).toBeDisabled()
	})
})
