/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
// tests/Avatar.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'

import { Avatar } from './index'

// Mock next/image component
vi.mock('next/image', () => ({
	default: (props: any) => {
		// eslint-disable-next-line jsx-a11y/alt-text
		return <img {...props} />
	},
}))

describe('Avatar Component', () => {
	it('renders without crashing', () => {
		render(<Avatar />)
		expect(screen.getByRole('img')).toBeInTheDocument()
	})

	it('displays image when src is provided and no error occurs', () => {
		const testSrc = '/test-avatar.jpg'
		render(<Avatar src={testSrc} />)

		const image = screen.getByRole('img')
		expect(image).toHaveAttribute('src', testSrc)
		expect(image).toHaveAttribute('alt', 'Аватар Заур П.')
	})

	it('displays fallback initials when image fails to load', () => {
		render(<Avatar />)

		// Simulate image error
		const image = screen.getByRole('img')
		fireEvent.error(image)

		expect(screen.getByText('ЗП')).toBeInTheDocument()
		expect(screen.queryByRole('img')).not.toBeInTheDocument()
	})

	it('generates correct initials from name', () => {
		const testName = 'Иван Иванов'
		render(<Avatar name={testName} />)

		// Simulate image error to see fallback
		const image = screen.getByRole('img')
		fireEvent.error(image)

		expect(screen.getByText('ИИ')).toBeInTheDocument()
	})

	it('shows online indicator when online is true', () => {
		render(<Avatar online={true} />)

		expect(screen.getByRole('img').parentElement).toContainElement(screen.getByTestId('online-indicator'))
	})

	it('does not show online indicator when online is false', () => {
		render(<Avatar online={false} />)

		expect(screen.queryByTestId('online-indicator')).not.toBeInTheDocument()
	})

	it('displays name when provided', () => {
		const testName = 'Тестовое Имя'
		render(<Avatar name={testName} />)

		expect(screen.getByText(testName)).toBeInTheDocument()
	})

	it('applies correct size classes', () => {
		const { rerender } = render(<Avatar size="small" />)

		// Check if the avatar has the small class
		// This assumes your styles are applied as classes
		const avatar = screen.getByRole('img').parentElement
		expect(avatar).toHaveClass('small') // Adjust based on your actual class names

		rerender(<Avatar size="large" />)
		expect(avatar).toHaveClass('large') // Adjust based on your actual class names
	})

	it('applies custom className', () => {
		const customClass = 'custom-avatar-class'
		const { container } = render(<Avatar className={customClass} />)

		expect(container.firstChild).toHaveClass(customClass)
	})

	it('has correct tabindex', () => {
		render(<Avatar />)

		const container = screen.getByTestId('avatar')
		expect(container).toHaveAttribute('tabindex', '6')
	})
})
