import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { useGetSchoolClasses } from '@/hooks/admin/useGetSchoolClasses'

import { MenuAccordion } from '../DashboardAccordion'
import { DashboardMenuItem } from '../DashboardMenuItem'
import { MyClassesIcon, TeachersIcon } from '../icons'

export const MinistryManagerDashboardMenuView = () => {
	const { schoolClassesData, isLoading: isSchoolClassesLoading, isError } = useGetSchoolClasses()
    const pathname = usePathname()
	return (
		<>
			<DashboardMenuItem title="Все школы" href="/admin/schools/" />
            <DashboardMenuItem title="Все районы" href="/admin/schools/" />
		</>
	)
}
