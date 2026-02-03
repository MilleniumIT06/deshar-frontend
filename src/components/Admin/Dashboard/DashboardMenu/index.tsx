'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { teacherMyClasses, teacherParallelClasses } from '@/mocks/adminMock'
import useRole from '@/shared/hooks/admin/useRole'
import { Logo } from '@/shared/ui/Logo'

import { Avatar } from '../../Avatar'
import { MenuAccordion } from '../DashboardAccordion'
import { DashboardMenuItem } from '../DashboardMenuItem'

import './styles.scss'

const SchoolsIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M8.09199 3.57254C9.20007 2.65928 10.7999 2.65928 11.908 3.57254L12.7865 4.2966C13.2478 4.67673 13.8269 4.88462 14.4245 4.88462C15.8469 4.88462 17 6.03769 17 7.46007V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V7.46007C3 6.03769 4.15307 4.88462 5.57546 4.88462C6.17315 4.88462 6.75223 4.67673 7.21346 4.2966L8.09199 3.57254Z"
			stroke="#7D7979"
			strokeWidth="1.5"
		/>
		<mask id="path-2-inside-1_4463_19629" fill="white">
			<rect x="5" y="8" width="2" height="2" rx="0.5" />
		</mask>
		<rect
			x="5"
			y="8"
			width="2"
			height="2"
			rx="0.5"
			stroke="#7D7979"
			strokeWidth="2"
			mask="url(#path-2-inside-1_4463_19629)"
		/>
		<mask id="path-3-inside-2_4463_19629" fill="white">
			<rect x="13" y="8" width="2" height="2" rx="0.5" />
		</mask>
		<rect
			x="13"
			y="8"
			width="2"
			height="2"
			rx="0.5"
			stroke="#7D7979"
			strokeWidth="2"
			mask="url(#path-3-inside-2_4463_19629)"
		/>
		<mask id="path-4-inside-3_4463_19629" fill="white">
			<rect x="5" y="12" width="2" height="2" rx="0.5" />
		</mask>
		<rect
			x="5"
			y="12"
			width="2"
			height="2"
			rx="0.5"
			stroke="#7D7979"
			strokeWidth="2"
			mask="url(#path-4-inside-3_4463_19629)"
		/>
		<mask id="path-5-inside-4_4463_19629" fill="white">
			<rect x="9" y="12" width="2" height="2" rx="0.5" />
		</mask>
		<rect
			x="9"
			y="12"
			width="2"
			height="2"
			rx="0.5"
			stroke="#7D7979"
			strokeWidth="2"
			mask="url(#path-5-inside-4_4463_19629)"
		/>
		<mask id="path-6-inside-5_4463_19629" fill="white">
			<rect x="9" y="8" width="2" height="2" rx="0.5" />
		</mask>
		<rect
			x="9"
			y="8"
			width="2"
			height="2"
			rx="0.5"
			stroke="#7D7979"
			strokeWidth="2"
			mask="url(#path-6-inside-5_4463_19629)"
		/>
		<mask id="path-7-inside-6_4463_19629" fill="white">
			<rect x="13" y="12" width="2" height="2" rx="0.5" />
		</mask>
		<rect
			x="13"
			y="12"
			width="2"
			height="2"
			rx="0.5"
			stroke="#7D7979"
			strokeWidth="2"
			mask="url(#path-7-inside-6_4463_19629)"
		/>
	</svg>
)
const EducationDepartmentIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M12.5 5H13C15.2091 5 17 6.79086 17 9V13C17 15.2091 15.2091 17 13 17H7C4.79086 17 3 15.2091 3 13V9C3 6.79086 4.79086 5 7 5H12.5Z"
			stroke="#7D7979"
			strokeWidth="1.5"
		/>
		<path d="M3 9H17" stroke="#7D7979" strokeWidth="1.5" />
		<path
			d="M7 5V4C7 2.89543 7.89543 2 9 2H11C12.1046 2 13 2.89543 13 4V5"
			stroke="#7D7979"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path d="M6.25 11V11.75H7.75V11H6.25ZM6.25 9V11H7.75V9H6.25Z" fill="#7D7979" />
		<path d="M12.25 11V11.75H13.75V11H12.25ZM12.25 9V11H13.75V9H12.25Z" fill="#7D7979" />
	</svg>
)
const AttestationsIcon = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		style={{ fill: 'transparent' }}>
		<path
			d="M10.5 17H8C5.23858 17 3 14.7614 3 12V8C3 5.23858 5.23858 3 8 3H12C14.7614 3 17 5.23858 17 8V9.5"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path d="M7 8L13 8" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M7 12H10" strokeWidth="1.5" strokeLinecap="round" />
		<path d="M13 14.5L14.5 16L17.5 13" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)
const MyClassesIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="15" cy="16" r="2" fill="#7D7979" />
		<circle cx="10" cy="16" r="2" fill="#7D7979" />
		<circle cx="5" cy="16" r="2" fill="#7D7979" />
		<rect x="2.75" y="2.75" width="14.5" height="8.5" rx="3.25" stroke="#7D7979" strokeWidth="1.5" />
		<path d="M7.5 7.5L9 9L13 5" stroke="#7D7979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)
const ParallelClassessIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="15" cy="16" r="2" fill="#7D7979" />
		<circle cx="10" cy="16" r="2" fill="#7D7979" />
		<circle cx="5" cy="16" r="2" fill="#7D7979" />
		<rect x="2.75" y="2.75" width="14.5" height="8.5" rx="3.25" stroke="#7D7979" strokeWidth="1.5" />
	</svg>
)
const TeachersIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M10 4H14C15.6569 4 17 5.34315 17 7V11C17 12.6569 15.6569 14 14 14H10"
			stroke="#7D7979"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<circle cx="5" cy="5" r="2" fill="#7D7979" />
		<path
			d="M6.56362 9H5C3.89543 9 3 9.89543 3 11V15C3 16.1046 3.89543 17 5 17H5.44444C6.54901 17 7.44444 16.1046 7.44444 15V11.8843C7.44444 11.3793 7.82091 10.9536 8.32208 10.8918L9.31262 10.7697C10.1062 10.6718 10.3765 9.65736 9.73685 9.17764C9.58311 9.06233 9.39612 9 9.20394 9H6.56362Z"
			stroke="#7D7979"
			strokeWidth="1.5"
			strokeLinecap="round"
		/>
		<path d="M14 7L12 9" stroke="#7D7979" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
	</svg>
)
export const DashboardMenu = () => {
	const { role, hasRole } = useRole()
	const pathname = usePathname()
	return (
		<aside className="DashboardMenu">
			<div className="DashboardMenu__inner">
				<div className="DashboardMenu__top">
					<div className="DashboardMenu__logo_wrapper">
						<Logo className="DashboardMenu__logo" href="/" />
					</div>
					<div className="DashboardMenu__content">
						<DashboardMenuItem title="Статистика" href="/" />
						{hasRole(['admin', 'department', 'ministry']) && (
							<DashboardMenuItem title="Школы" href="/schools" icon={<SchoolsIcon />} />
						)}
						{hasRole(['admin', 'ministry']) && (
							<DashboardMenuItem
								title="Упр. образования"
								href="/education-department"
								icon={<EducationDepartmentIcon />}
							/>
						)}
						{hasRole(['admin', 'department', 'ministry']) && (
							<DashboardMenuItem title="Учителя" href="/teachers" icon={<TeachersIcon />} />
						)}
						{hasRole(['vicePrincipal', 'admin', 'department', 'ministry']) && (
							<DashboardMenuItem
								title="Аттестации"
								href="/attestations"
								icon={<AttestationsIcon />}
								count={25}
							/>
						)}

						{hasRole(['teacher', 'vicePrincipal', 'admin']) && (
							<MenuAccordion title="Мои классы" icon={<MyClassesIcon />}>
								<ul className="list-reset MenuAccordion__list">
									{teacherMyClasses.map(item => (
										<li
											className="MenuAccordion__item"
											key={`accordion-classes-item-${item.id}`}>
											<Link
												href={`/class/${item.id}`}
												className={`MenuAccordion__link ${pathname === `/class/${item.id}` ? 'active' : ''}`}>
												{item.title}
											</Link>
										</li>
									))}
								</ul>
							</MenuAccordion>
						)}
						{hasRole(['teacher', 'admin']) && (
							<MenuAccordion title="Параллели" icon={<ParallelClassessIcon />}>
								<ul className="list-reset MenuAccordion__list">
									{teacherParallelClasses.map(item => (
										<li
											className="MenuAccordion__item"
											key={`accordion-parallel-item-${item.id}`}>
											<Link
												href={`/class/${item.id}`}
												className={`MenuAccordion__link ${pathname === `/class/${item.id}` ? 'active' : ''}`}>
												{item.title}
											</Link>
										</li>
									))}
								</ul>
							</MenuAccordion>
						)}
						{/* <Selector /> */}
					</div>
				</div>
				<div className="DashboardMenu__avatar_wrapper">
					<Avatar src="/avatar.png" className="DashboardMenu__avatar" role={role} />
				</div>
			</div>
		</aside>
	)
}
