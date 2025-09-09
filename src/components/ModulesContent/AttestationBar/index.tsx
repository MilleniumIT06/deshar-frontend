import cn from 'classnames'

import './styles.scss'

export const AttestationBar = ({ points, status }: { points: number; status: 'checking' | 'checked' }) => {
	return (
		<div className="AttestationBar">
			{status === 'checked' && <span className="AttestationBar__number">{points}</span>}
			<div className={cn('AttestationBar__line', status === 'checking' ? 'checking' : 'checked')} />
		</div>
	)
}
