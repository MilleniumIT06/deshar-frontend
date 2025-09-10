import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

import { ProgressBar } from './index'

describe('ProgressBar Component', () => {
	it('renders without crashing', () => {
		render(<ProgressBar maxLessons={10} doneLessons={5} processLessons={2} />)
		expect(screen.getByRole('progressbar')).toBeInTheDocument()
	})

	it('has correct accessibility attributes', () => {
		render(<ProgressBar maxLessons={10} doneLessons={5} processLessons={2} />)

		const progressbar = screen.getByRole('progressbar')
		expect(progressbar).toHaveAttribute('aria-valuenow', '5')
		expect(progressbar).toHaveAttribute('aria-valuemin', '0')
		expect(progressbar).toHaveAttribute('aria-valuemax', '10')
		expect(progressbar).toHaveAttribute('aria-label', 'Прогресс прохождения уроков')
	})

	it('displays counter when counter prop is true', () => {
		render(<ProgressBar maxLessons={99} doneLessons={5} processLessons={2} counter={true} />)

		expect(screen.getByText('99')).toBeInTheDocument()
	})

	it('does not display counter when counter prop is false', () => {
		render(<ProgressBar maxLessons={10} doneLessons={5} processLessons={2} counter={false} />)

		expect(screen.queryByText('5/10')).not.toBeInTheDocument()
	})

	it('displays percentage when showPercentage is true and counter is true', () => {
		render(
			<ProgressBar maxLessons={10} doneLessons={5} processLessons={2} counter={true} showPercentage={true} />,
		)

		expect(screen.getByText('50%')).toBeInTheDocument()
	})

	it('displays bottom percentage when showPercentage is true and counter is false', () => {
		render(
			<ProgressBar maxLessons={10} doneLessons={5} processLessons={2} counter={false} showPercentage={true} />,
		)

		expect(screen.getByText('50% завершено')).toBeInTheDocument()
	})

	it('validates and normalizes input values correctly', () => {
		render(<ProgressBar maxLessons={0} doneLessons={10} processLessons={5} />)

		const progressbar = screen.getByRole('progressbar')
		expect(progressbar).toHaveAttribute('aria-valuenow', '1')
		expect(progressbar).toHaveAttribute('aria-valuemax', '1')
	})

	it('calculates percentages correctly', () => {
		render(<ProgressBar maxLessons={4} doneLessons={2} processLessons={1} showPercentage={true} counter={true} />)

		expect(screen.getByText('50%')).toBeInTheDocument()
	})

	it('applies custom className', () => {
		const customClass = 'custom-progress-bar'
		const { container } = render(
			<ProgressBar maxLessons={10} doneLessons={5} processLessons={2} className={customClass} />,
		)

		expect(container.firstChild).toHaveClass(customClass)
	})

	it('uses custom ariaLabel when provided', () => {
		const customAriaLabel = 'Custom progress label'
		render(<ProgressBar maxLessons={10} doneLessons={5} processLessons={2} ariaLabel={customAriaLabel} />)

		const progressbar = screen.getByRole('progressbar')
		expect(progressbar).toHaveAttribute('aria-label', customAriaLabel)
	})
})
