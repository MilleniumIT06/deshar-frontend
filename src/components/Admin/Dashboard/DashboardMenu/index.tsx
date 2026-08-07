'use client'
import { useState } from 'react'

import { UserMenu } from '@/components/UserMenu'
import { useProfile } from '@/hooks/user/useProfile'
import useRole from '@/shared/hooks/admin/useRole'
import { useOutsideClick } from '@/shared/hooks/useOutsideClick'
import { Loader } from '@/shared/ui/Loader'
import { Logo } from '@/shared/ui/Logo'

import { Avatar } from '../../Avatar'
import './styles.scss'
import { DepartmentManagerDashboardMenuView } from '../Views/department-manager.dashboard-menu.view'
import { MinistryManagerDashboardMenuView } from '../Views/ministry-manager.dashboard-menu.view'
import { SchoolManagerDashboardMenuView } from '../Views/school-manager.dashboard-menu.view'

export const DashboardMenu = () => {
	const { isLoading, profileData } = useProfile()
	const { hasRole } = useRole()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const userMenuRef = useOutsideClick(() => {
		setIsMenuOpen(false)
	})
	const handleAvatarClick = () => {
		setIsMenuOpen(prev => !prev)
	}
	return (
		<aside className="DashboardMenu">
			<div className="DashboardMenu__inner">
				<div className="DashboardMenu__top">
					<div className="DashboardMenu__logo_wrapper">
						<Logo className="DashboardMenu__logo" href="/admin" />
					</div>
					<div className="DashboardMenu__content">
						{hasRole('Представитель школы') && <SchoolManagerDashboardMenuView />}
						{hasRole('Представитель министерства') && <MinistryManagerDashboardMenuView />}
						{hasRole('Пр. Управления образования') && <DepartmentManagerDashboardMenuView />}
					</div>
				</div>
				{isLoading ? (
					<Loader />
				) : profileData ? (
					<div className="DashboardMenu__avatar_wrapper" ref={userMenuRef}>
						<Avatar
							src={profileData?.data.user.avatar}
							name={profileData?.data.user.name}
							className="DashboardMenu__avatar"
							size="medium"
							role={profileData?.data.user.role.name}
							onClick={handleAvatarClick}
						/>
						{isMenuOpen && (
							<UserMenu
								profileData={profileData}
								handleMenuClose={() => setIsMenuOpen(false)}
								extraClass="DashboardMenu__userMenu"
							/>
						)}
					</div>
				) : (
					'Error'
				)}
			</div>
		</aside>
	)
}
