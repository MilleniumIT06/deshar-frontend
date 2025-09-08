/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { InputSelect } from './index' // Adjust import path according to your structure

// Mock framer-motion components
vi.mock('motion/react', () => ({
	motion: {
		div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
		svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
	},
	AnimatePresence: ({ children }: any) => children,
}))

describe.skip('InputSelect Component', () => {
	const mockOptions = [
		{ value: 1, label: 'Option 1' },
		{ value: 2, label: 'Option 2' },
		{ value: 3, label: 'Option 3' },
	]

	const mockSetValue = vi.fn()

	it('renders without crashing', () => {
		render(
			<InputSelect
				placeholderValue="Select an option"
				options={mockOptions}
				value=""
				setValue={mockSetValue}
			/>,
		)

		expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument()
	})

	it('displays the selected option label', () => {
		render(
			<InputSelect
				placeholderValue="Select an option"
				options={mockOptions}
				value={2}
				setValue={mockSetValue}
			/>,
		)

		expect(screen.getByDisplayValue('Option 2')).toBeInTheDocument()
	})

	it('shows placeholder when no value is selected', () => {
		render(
			<InputSelect
				placeholderValue="Select an option"
				options={mockOptions}
				value=""
				setValue={mockSetValue}
			/>,
		)

		expect(screen.getByPlaceholderText('Select an option')).toBeInTheDocument()
	})

	it('toggles dropdown when button is clicked', () => {
		render(
			<InputSelect
				placeholderValue="Select an option"
				options={mockOptions}
				value=""
				setValue={mockSetValue}
			/>,
		)

		const toggleButton = screen.getByLabelText('Toggle dropdown')
		fireEvent.click(toggleButton)

		// After clicking, options should be visible
		expect(screen.getByText('Option 1')).toBeInTheDocument()
		expect(screen.getByText('Option 2')).toBeInTheDocument()
		expect(screen.getByText('Option 3')).toBeInTheDocument()

		// Click again to close
		fireEvent.click(toggleButton)
	})

	it('calls setValue when an option is selected', () => {
		render(
			<InputSelect
				placeholderValue="Select an option"
				options={mockOptions}
				value=""
				setValue={mockSetValue}
			/>,
		)

		// Open dropdown
		const toggleButton = screen.getByLabelText('Toggle dropdown')
		fireEvent.click(toggleButton)

		// Select an option
		const option2 = screen.getByText('Option 2')
		fireEvent.click(option2)

		// setValue should be called with the option's value
		expect(mockSetValue).toHaveBeenCalledWith(2)
	})

	it('closes dropdown after selecting an option', () => {
		render(
			<InputSelect
				placeholderValue="Select an option"
				options={mockOptions}
				value=""
				setValue={mockSetValue}
			/>,
		)

		// Open dropdown
		const toggleButton = screen.getByLabelText('Toggle dropdown')
		fireEvent.click(toggleButton)

		// Select an option
		const option2 = screen.getByText('Option 2')
		fireEvent.click(option2)

		// Dropdown should be closed after selection
		expect(screen.queryByText('Option 1')).not.toBeInTheDocument()
	})

	// it('marks selected option with a special class', () => {
	//     render(
	//         <InputSelect
	//             placeholderValue="Select an option"
	//             options={mockOptions}
	//             value={2}
	//             setValue={mockSetValue}
	//         />
	//     );

	//     // Open dropdown///////////////////////////////////////////////
	//     const toggleButton = screen.getByLabelText('Toggle dropdown');
	//     fireEvent.click(toggleButton);

	//     // Option 2 should have selected class
	//     const option2 = screen.getByText('Option 2');
	//     expect(screen.getByTestId('input-select')).toHaveClass('selected');
	// });

	// it('applies custom className', () => {
	//     const customClass = 'custom-select';
	//     const { container } = render(
	//         <InputSelect
	//             placeholderValue="Select an option"
	//             options={mockOptions}
	//             value=""
	//             setValue={mockSetValue}
	//             className={customClass}
	//         />
	//     );

	//     expect(container.firstChild).toHaveClass(customClass);
	// });

	it('has correct aria attributes', () => {
		render(
			<InputSelect
				placeholderValue="Select an option"
				options={mockOptions}
				value=""
				setValue={mockSetValue}
			/>,
		)

		const toggleButton = screen.getByLabelText('Toggle dropdown')
		expect(toggleButton).toHaveAttribute('aria-expanded', 'false')

		// Open dropdown and check aria-expanded changes
		fireEvent.click(toggleButton)
		expect(toggleButton).toHaveAttribute('aria-expanded', 'true')
	})

	it('uses default options when none provided', () => {
		render(<InputSelect placeholderValue="Select an option" value="" setValue={mockSetValue} />)

		// Open dropdown
		const toggleButton = screen.getByLabelText('Toggle dropdown')
		fireEvent.click(toggleButton)

		// Should show default options
		expect(screen.getByText('Option 1')).toBeInTheDocument()
		expect(screen.getByText('Option 2')).toBeInTheDocument()
		expect(screen.getByText('Option 3')).toBeInTheDocument()
	})
})
