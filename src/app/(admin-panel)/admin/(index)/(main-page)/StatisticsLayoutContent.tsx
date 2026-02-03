'use client'

import { type ReactNode } from 'react'

import { useRouter } from 'next/navigation'

import {
	testOptionsDepartment,
	testOptionsMinistry,
	testOptionsTeacher,
	testOptionsVicePrincipal,
} from '@/mocks/adminMock'
import useRole from '@/shared/hooks/admin/useRole'
import { type Option, Selector } from '@/shared/ui/Selector'

import './StatisticsLayout.scss'

interface StatisticsLayoutContentProps {
	children: ReactNode
}

export const StatisticsLayoutContent = ({ children }: StatisticsLayoutContentProps) => {
	const router = useRouter()
	const { role } = useRole()

	let options
	switch (role) {
		case 'teacher':
			options = testOptionsTeacher
			break
		case 'vicePrincipal':
			options = testOptionsVicePrincipal
			break
		case 'department':
			options = testOptionsDepartment
			break
		case 'ministry':
			options = testOptionsMinistry
			break
		default:
			options = testOptionsTeacher
			break
	}

	const handleSelectChange = (item: Option) => {
		if (role === 'department' || role === 'vicePrincipal' || role === 'ministry') {
			if (item.default) {
				router.push('/')
			} else {
				router.push(`/${item.id}`)
			}
		}
	}

	return (
		<div className="StatisticLayout__inner">
			<div className="StatisticLayout__head">
				<h1 className="StatisticLayout__title">Общая статистика</h1>
				<Selector className="StatisticLayout__selector" options={options} onChange={handleSelectChange} />
			</div>
			<div className="StatisticLayout__content">{children}</div>
		</div>
	)
}
