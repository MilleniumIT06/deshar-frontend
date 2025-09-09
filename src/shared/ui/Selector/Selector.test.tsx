/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { Selector } from './index'

vi.mock('framer-motion', () => ({
	motion: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
		svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
	},
	AnimatePresence: ({ children }: any) => children,
	easeInOut: 'easeInOut',
}))

describe.skip('Selector Component', () => {
	const mockOptions = [
		{ id: 'week', label: 'Неделя' },
		{ id: 'month', label: 'Месяц' },
		{ id: 'year', label: 'Год' },
	]

	const mockOnChange = vi.fn()

	beforeEach(() => {
		mockOnChange.mockClear()
	})

	it('renders without crashing', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)
		expect(screen.getByRole('combobox')).toBeInTheDocument()
	})

	it('displays the default value', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)
		expect(screen.getByText('Неделя')).toBeInTheDocument()
	})

	it('toggles dropdown when button is clicked', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)

		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		expect(screen.getByText('Месяц')).toBeInTheDocument()
		expect(screen.getByText('Год')).toBeInTheDocument()

		fireEvent.click(toggleButton)
	})

	it('calls onChange when an option is selected', () => {
		render(<Selector options={mockOptions} defaultValue="week" onChange={mockOnChange} />)

		// Open dropdown
		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		// Select an option
		const monthOption = screen.getByText('Месяц')
		fireEvent.click(monthOption)

		// onChange should be called with the option's id
		expect(mockOnChange).toHaveBeenCalledWith('month')
	})

	it('updates displayed value when an option is selected', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)

		// Open dropdown
		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		// Select an option
		const monthOption = screen.getByText('Месяц')
		fireEvent.click(monthOption)

		// The displayed value should update
		expect(screen.getByText('Месяц')).toBeInTheDocument()
	})

	it('closes dropdown after selecting an option', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)

		// Open dropdown
		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		// Select an option
		const monthOption = screen.getByText('Месяц')
		fireEvent.click(monthOption)

		// Dropdown should be closed after selection
		expect(screen.queryByText('Год')).not.toBeInTheDocument()
	})

	it('marks selected option with a special class', () => {
		render(<Selector options={mockOptions} defaultValue="month" />)

		// Open dropdown
		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		// Week option should have selected class
		const weekOption = screen.getAllByText('Месяц')
		expect(weekOption[1]).toBeInTheDocument()
		expect(weekOption[1].parentNode).toHaveClass('selected')
	})

	it('has correct aria attributes', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)

		const combobox = screen.getByRole('combobox')
		expect(combobox).toHaveAttribute('aria-expanded', 'false')

		// Open dropdown and check aria-expanded changes
		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)
		expect(combobox).toHaveAttribute('aria-expanded', 'true')
	})

	it('uses default options when none provided', () => {
		render(<Selector defaultValue="week" />)

		// Should show default options
		expect(screen.getByText('Неделя')).toBeInTheDocument()

		// Open dropdown
		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		// Should show default options
		expect(screen.getByText('Месяц')).toBeInTheDocument()
		expect(screen.getByText('Год')).toBeInTheDocument()
	})

	it('closes dropdown when clicking outside', () => {
		render(
			<div>
				<Selector options={mockOptions} defaultValue="week" />
				<div data-testid="outside-element">Outside element</div>
			</div>,
		)

		// Open dropdown
		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		// Click outside
		const outsideElement = screen.getByTestId('outside-element')
		fireEvent.mouseDown(outsideElement)

		// Dropdown should be closed
		expect(screen.queryByText('Месяц')).not.toBeInTheDocument()
	})
})
