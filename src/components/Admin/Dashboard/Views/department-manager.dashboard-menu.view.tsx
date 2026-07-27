import { DashboardMenuItem } from '../DashboardMenuItem'




export const DepartmentManagerDashboardMenuView = () => {
    return (
        <>
            <DashboardMenuItem title="Все школы" href="/admin/department/schools/" />
            <DashboardMenuItem title="Ученики" href="/admin/department/students/" />
            <DashboardMenuItem title="Учителя" href="/admin/department/teachers/" />
        </>
    )
}
