import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useGetSchoolClasses } from '@/hooks/admin/useGetSchoolClasses'

import { MenuAccordion } from '../DashboardAccordion'
import { DashboardMenuItem } from '../DashboardMenuItem'
import { MyClassesIcon, TeachersIcon } from '../icons'

export const SchoolManagerDashboardMenuView = () => {
	const { schoolClassesData, isLoading: isSchoolClassesLoading, isError } = useGetSchoolClasses()
    const pathname = usePathname()
	return (
		<>
			<DashboardMenuItem title="Статистика" href="/admin" />
			<DashboardMenuItem title="Все ученики школы" href="/admin/school/all-students" />
			<DashboardMenuItem title="Учителя" href="/admin/teachers" icon={<TeachersIcon />} />
				{isSchoolClassesLoading ? (
					'Loading...'
				) : isError ? (
					'Error'
				) : schoolClassesData && schoolClassesData.data.length > 0 ? (
					<MenuAccordion title="Классы" icon={<MyClassesIcon />}>
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
					</MenuAccordion>
				) : (
					'Список классов пуст'
				)}

		</>
	)
}
