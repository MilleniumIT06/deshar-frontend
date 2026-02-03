import { type ReactNode } from 'react'

import './styles.scss'
import cn from 'classnames'

export const Loading = ({
	content = 'Loading...',
	isLoading,
	children,
	type = 'page',
}: {
	type: 'page' | 'component'
	content: ReactNode
	isLoading: boolean
	children: ReactNode
}) => {
	if (isLoading) {
		return <div className={cn('Loading', `Loading--${type}`)}>{content}</div>
	}
	return children
}
