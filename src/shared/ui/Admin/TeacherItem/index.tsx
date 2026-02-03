import type { ReactNode } from 'react'

import { Tooltip } from '../Tooltip'

import './styles.scss'

const DefaultIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M10 4H14C15.6569 4 17 5.34315 17 7V11C17 12.6569 15.6569 14 14 14H10"
			stroke="#7D7979"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<circle cx="5" cy="5" r="2" fill="#7D7979" />
		<path
			d="M6.56362 9H5C3.89543 9 3 9.89543 3 11V15C3 16.1046 3.89543 17 5 17H5.44444C6.54901 17 7.44444 16.1046 7.44444 15V11.8843C7.44444 11.3793 7.82091 10.9536 8.32208 10.8918L9.31262 10.7697C10.1062 10.6718 10.3765 9.65736 9.73685 9.17764C9.58311 9.06233 9.39612 9 9.20394 9H6.56362Z"
			stroke="#7D7979"
			stroke-width="1.5"
			stroke-linecap="round"
		/>
		<path d="M14 7L12 9" stroke="#7D7979" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
	</svg>
)
interface ITeacherItem {
	icon?: ReactNode
	name: string
}
export const TeacherItem = ({ name, icon }: ITeacherItem) => {
	return (
		<div className="TeacherItem">
			<span className="TeacherItem__icon">
				<Tooltip className="TeacherItem__tooltip" />
				{icon || <DefaultIcon />}
			</span>
			<span className="TeacherItem__name">{name}</span>
		</div>
	)
}
