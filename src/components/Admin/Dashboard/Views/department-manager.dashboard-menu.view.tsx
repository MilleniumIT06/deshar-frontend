import { DashboardMenuItem } from '../DashboardMenuItem'
import { SchoolsIcon, TeachersIcon } from '../icons'

export const DepartmentManagerDashboardMenuView = () => {
	return (
		<>
			<DashboardMenuItem title="Все школы" href="/admin/department/schools/" icon={<SchoolsIcon />} />
			<DashboardMenuItem title="Ученики" href="/admin/department/students/" />
			<DashboardMenuItem title="Учителя" href="/admin/department/teachers/" icon={<TeachersIcon />} />
		</>
	)
}
