/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'

import { Selector } from './index'

// Обновленный мок для motion/react
vi.mock('motion/react', () => ({
	m: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
		svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
	},
	AnimatePresence: ({ children }: any) => children,
}))

describe('Selector Component', () => {
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
	})

	it('calls onChange when an option is selected', () => {
		render(<Selector options={mockOptions} defaultValue="week" onChange={mockOnChange} />)

		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		const monthOption = screen.getByText('Месяц')
		fireEvent.click(monthOption)

		expect(mockOnChange).toHaveBeenCalledWith(mockOptions[1])
	})

	it('updates displayed value when an option is selected', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)

		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		const monthOption = screen.getByText('Месяц')
		fireEvent.click(monthOption)

		expect(screen.getByText('Месяц')).toBeInTheDocument()
	})

	it('closes dropdown after selecting an option', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)

		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		const monthOption = screen.getByText('Месяц')
		fireEvent.click(monthOption)

		expect(screen.queryByText('Год')).not.toBeInTheDocument()
	})

	it('marks selected option with a special class', () => {
		render(<Selector options={mockOptions} defaultValue="month" />)

		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		const weekOption = screen.getAllByText('Месяц')
		// Проверяем, что второй найденный элемент (в выпадающем списке) имеет класс selected
		expect(weekOption[1].parentNode).toHaveClass('selected')
	})

	it('has correct aria attributes', () => {
		render(<Selector options={mockOptions} defaultValue="week" />)

		const combobox = screen.getByRole('combobox')
		expect(combobox).toHaveAttribute('aria-expanded', 'false')

		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)
		expect(combobox).toHaveAttribute('aria-expanded', 'true')
	})

	it('closes dropdown when clicking outside', () => {
		render(
			<div>
				<Selector options={mockOptions} defaultValue="week" />
				<div data-testid="outside-element">Outside element</div>
			</div>,
		)

		const toggleButton = screen.getByLabelText('Открыть список')
		fireEvent.click(toggleButton)

		const outsideElement = screen.getByTestId('outside-element')
		fireEvent.mouseDown(outsideElement)

		expect(screen.queryByText('Месяц')).not.toBeInTheDocument()
	})
})
