'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useGetSchoolClasses } from '@/hooks/admin/useGetSchoolClasses'
import { useProfile } from '@/hooks/user/useProfile'
import { teacherMyClasses, teacherParallelClasses } from '@/mocks/adminMock'
import useRole from '@/shared/hooks/admin/useRole'
import {Loader} from '@/shared/ui/Loader'
import { Logo } from '@/shared/ui/Logo'

import { Avatar } from '../../Avatar'
import { MenuAccordion } from '../DashboardAccordion'
import { DashboardMenuItem } from '../DashboardMenuItem'
import './styles.scss'
import {
	AttestationsIcon,
	EducationDepartmentIcon,
	MyClassesIcon,
	ParallelClassessIcon,
	SchoolsIcon,
	TeachersIcon,
} from '../icons'

export const DashboardMenu = () => {
	const { hasRole } = useRole()
	const { isLoading, profileData } = useProfile()
		const {isLoading:isSchoolClassesLoading,schoolClassesData,isError} = useGetSchoolClasses()
		console.log(schoolClassesData)
	const pathname = usePathname()
	return (
		<aside className="DashboardMenu">
			<div className="DashboardMenu__inner">
				<div className="DashboardMenu__top">
					<div className="DashboardMenu__logo_wrapper">
						<Logo className="DashboardMenu__logo" href="/admin" />
					</div>
					<div className="DashboardMenu__content">
						<DashboardMenuItem title="Статистика" href="/admin" />
						{hasRole(['admin', 'department', 'ministry']) && (
							<DashboardMenuItem title="Школы" href="/admin/schools" icon={<SchoolsIcon />} />
						)}
						{hasRole(['admin', 'ministry']) && (
							<DashboardMenuItem
								title="Упр. образования"
								href="/admin/education-department"
								icon={<EducationDepartmentIcon />}
							/>
						)}
						{hasRole(['admin', 'department', 'ministry']) && (
							<DashboardMenuItem title="Учителя" href="/admin/teachers" icon={<TeachersIcon />} />
						)}
						{hasRole(['vicePrincipal', 'admin', 'department', 'ministry']) && (
							<DashboardMenuItem
								title="Аттестации"
								href="/admin/attestations"
								icon={<AttestationsIcon />}
								count={25}
							/>
						)}

						{hasRole(['teacher','manager', 'vicePrincipal', 'admin']) && (
							isSchoolClassesLoading ? "Loading...": isError? "Error": schoolClassesData&&schoolClassesData.data.length>0 ? <MenuAccordion title="Мои классы" icon={<MyClassesIcon />}>
								<ul className="list-reset MenuAccordion__list">
									{schoolClassesData.data.map(item => (
										<li
											className={`MenuAccordion__item ${pathname === `/admin/class/${item.id}` ? 'active' : ''}`}
											key={`accordion-classes-item-${item.id}`}>
											<Link
												href={`/admin/class/${item.id}`}
												className={`MenuAccordion__link ${pathname === `/admin/class/${item.id}` ? 'active' : ''}`}>
												{item.name}
											</Link>
										</li>
									))}
								</ul>
							</MenuAccordion>:"Список классов пуст"
						)}
						{hasRole(['teacher', 'admin']) && (
							<MenuAccordion title="Параллели" icon={<ParallelClassessIcon />}>
								<ul className="list-reset MenuAccordion__list">
									{teacherParallelClasses.map(item => (
										<li
											className={`MenuAccordion__item ${pathname === `/admin/class/${item.id}` ? 'active' : ''}`}
											key={`accordion-classes-item-${item.id}`}>
											<Link
												href={`/admin/class/${item.id}`}
												className={`MenuAccordion__link ${pathname === `/admin/class/${item.id}` ? 'active' : ''}`}>
												{item.title}
											</Link>
										</li>
									))}
								</ul>
							</MenuAccordion>
						)}
					</div>
				</div>
				<div className="DashboardMenu__avatar_wrapper">
					{isLoading? <Loader/>:<Avatar
						src={profileData?.data.user.avatar}
						name={profileData?.data.user.name}
						className="DashboardMenu__avatar"
						size='medium'
						role={profileData?.data.user.user_type}
					/>}
				</div>
			</div>
		</aside>
	)
}
