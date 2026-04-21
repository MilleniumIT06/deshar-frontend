import { type ReactNode } from 'react'
import './styles.scss'

export const MenuBtn = ({ handleClick, children }: { handleClick: () => void; children: ReactNode }) => {
	return (
		<button onClick={handleClick} className="menu-btn">
			{children}
		</button>
	)
}
