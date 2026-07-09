'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useGetSchoolClasses } from '@/hooks/admin/useGetSchoolClasses'
import { useGetSchoolTeachers } from '@/hooks/admin/useGetSchoolTeachers'
import { useProfile } from '@/hooks/user/useProfile'
import { teacherParallelClasses } from '@/mocks/adminMock'
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
	const pathname = usePathname()
	return (
		<aside className="DashboardMenu">
			<div className="DashboardMenu__inner">
				<div className="DashboardMenu__top">
					<div className="DashboardMenu__logo_wrapper">
						<Logo className="DashboardMenu__logo" href="/admin" />
					</div>
					<div className="DashboardMenu__content">

							{hasRole(['Админ', 'Пр. Управления образования', 'Представитель министерства','Представитель школы']) && (
						<DashboardMenuItem title="Статистика" href="/admin" />
							)}
						{hasRole(['Учитель','Директор школы','Представитель школы']) && (
							<DashboardMenuItem title="Все ученики школы" href="/admin/school/all-students" />
						)}
						{hasRole(['Админ', 'Пр. Управления образования', 'Представитель министерства']) && (
							<DashboardMenuItem title="Школы" href="/admin/schools" icon={<SchoolsIcon />} />
						)}

						{hasRole(['Админ', 'Представитель министерства']) && (
							<DashboardMenuItem
								title="Упр. образования"
								href="/admin/education-department"
								icon={<EducationDepartmentIcon />}
							/>
						)}

						{hasRole(['Админ', 'Пр. Управления образования', 'Представитель министерства','Представитель школы']) && (
							<DashboardMenuItem title="Учителя" href="/admin/teachers" icon={<TeachersIcon />} />
						)}

						{hasRole(['Админ', 'Пр. Управления образования', 'Представитель министерства']) && (
							<DashboardMenuItem
								title="Аттестации"
								href="/admin/attestations"
								icon={<AttestationsIcon />}
								count={25}
							/>
						)}

						{hasRole(['Учитель','Представитель школы', 'Админ']) && (
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

						{hasRole(['Учитель', 'Админ']) && (
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
						role={profileData?.data.user.role.name}
					/>}
				</div>
			</div>
		</aside>
	)
}
