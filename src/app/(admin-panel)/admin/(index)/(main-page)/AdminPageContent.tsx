'use client'
import dynamic from 'next/dynamic'

import useRole from '@/shared/hooks/admin/useRole'
import './AdminPageContent.scss'

const SchoolManagerView = dynamic(() => import('@/components/Admin/Views/SchoolManagerView').then(mod=>mod.SchoolManagerView))
const DepartmentManagerView = dynamic(() => import('@/components/Admin/Views/DeparmentManagerView').then(mod=>mod.DepartmentManagerView))
const MinistryManagerView = dynamic(() => import('@/components/Admin/Views/MinistryManagerView').then(mod=>mod.MinistryManagerView))
export const AdminPageContent = () => {
	const {  role } = useRole()
	if(role==="Представитель школы") return <SchoolManagerView/>
	if(role==="Пр. Управления образования") return <DepartmentManagerView/>
	if(role==="Представитель министерства") return <MinistryManagerView/>
	return "..."
}
