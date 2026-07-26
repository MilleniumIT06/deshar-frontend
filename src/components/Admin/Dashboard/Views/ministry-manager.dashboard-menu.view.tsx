import { DashboardMenuItem } from '../DashboardMenuItem'


export const MinistryManagerDashboardMenuView = () => {
	return (
		<>
			<DashboardMenuItem title="Все школы" href="/admin/ministry/schools/" />
            <DashboardMenuItem title="Все районы" href="/admin/ministry/districts/" />
		</>
	)
}
