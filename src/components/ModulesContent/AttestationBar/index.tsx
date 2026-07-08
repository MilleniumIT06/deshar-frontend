import cn from 'classnames'

import './styles.scss'

export const AttestationBar = ({ percentage, status }: { percentage: number; status: string }) => {
	const getClassByStatus = () => {
		switch(status) {
			case "checked":
				return "checked"
			case "not_started":
				return ""
			case "checking":
				return "checking"
			default:
			return ""
		}
	}
	return (
		<div className="AttestationBar">
			{status === 'checked' && <span className="AttestationBar__number">{percentage}%</span>}
			<div className={cn('AttestationBar__line', getClassByStatus())} />
		</div>
	)
}
