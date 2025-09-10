/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Breadcrumbs } from './index' // Adjust import path according to your structure

// Mock next/link component
vi.mock('next/link', () => ({
	default: ({ children, href }: any) => {
		return <a href={href}>{children}</a>
	},
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
	ChevronRight: () => <span data-testid="chevron-icon">→</span>,
}))

describe('Breadcrumbs Component', () => {
	const mockItems = [
		{ label: 'Home', href: '/' },
		{ label: 'Products', href: '/products' },
		{ label: 'Current Page' },
	]

	it('renders without crashing', () => {
		render(<Breadcrumbs items={mockItems} />)
		expect(screen.getByRole('navigation')).toBeInTheDocument()
	})

	it('does not render when items array is empty', () => {
		const { container } = render(<Breadcrumbs items={[]} />)
		expect(container.firstChild).toBeNull()
	})

	it('renders correct number of breadcrumb items', () => {
		render(<Breadcrumbs items={mockItems} />)

		const listItems = screen.getAllByRole('listitem')
		expect(listItems).toHaveLength(mockItems.length)
	})

	it('renders links for non-last items', () => {
		render(<Breadcrumbs items={mockItems} />)

		const links = screen.getAllByRole('link')
		expect(links).toHaveLength(2) // First two items have href
		expect(links[0]).toHaveAttribute('href', '/')
		expect(links[1]).toHaveAttribute('href', '/products')
	})

	it('renders span for the last item (current page)', () => {
		render(<Breadcrumbs items={mockItems} />)

		const lastItem = screen.getByText('Current Page')
		expect(lastItem.tagName).toBe('SPAN')
		expect(lastItem).not.toHaveAttribute('href')
	})

	it('marks last item with aria-current attribute', () => {
		render(<Breadcrumbs items={mockItems} />)

		const lastItem = screen.getByText('Current Page').closest('li')
		expect(lastItem).toHaveAttribute('aria-current', 'page')
	})

	it('renders separators between items', () => {
		render(<Breadcrumbs items={mockItems} />)

		const separators = screen.getAllByTestId('chevron-icon')
		expect(separators).toHaveLength(mockItems.length - 1)
	})

	it('applies custom className', () => {
		const customClass = 'custom-breadcrumbs'
		const { container } = render(<Breadcrumbs items={mockItems} className={customClass} />)

		expect(container.firstChild).toHaveClass(customClass)
	})

	it('has correct aria-label for accessibility', () => {
		render(<Breadcrumbs items={mockItems} />)

		const nav = screen.getByRole('navigation')
		expect(nav).toHaveAttribute('aria-label', 'Хлебные крошки')
	})

	it('uses custom separator when provided', () => {
		const customSeparator = '>'
		render(
			<Breadcrumbs
				items={mockItems}
				separator={<span data-testid="custom-separator">{customSeparator}</span>}
			/>,
		)

		const customSeparators = screen.getAllByTestId('custom-separator')
		expect(customSeparators).toHaveLength(mockItems.length - 1)
		expect(customSeparators[0]).toHaveTextContent(customSeparator)
	})
})
