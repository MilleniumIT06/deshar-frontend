'use client'
import { useProfile } from '@/hooks/user/useProfile'
import useRole from '@/shared/hooks/admin/useRole'
import {Loader} from '@/shared/ui/Loader'
import { Logo } from '@/shared/ui/Logo'

import { Avatar } from '../../Avatar'
import './styles.scss'
import { SchoolManagerDashboardMenuView } from '../Views/school-manager.dashboard-menu.view'


export const DashboardMenu = () => {
	const { isLoading, profileData } = useProfile()
	const {hasRole} = useRole()
	return (
		<aside className="DashboardMenu">
			<div className="DashboardMenu__inner">
				<div className="DashboardMenu__top">
					<div className="DashboardMenu__logo_wrapper">
						<Logo className="DashboardMenu__logo" href="/admin" />
					</div>
					<div className="DashboardMenu__content">
						{
							hasRole("Представитель школы") &&<SchoolManagerDashboardMenuView/>
						}
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
