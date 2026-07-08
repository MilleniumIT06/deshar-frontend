'use client'

import { useRouter } from 'next/navigation'
import { type ReactNode } from 'react'

import {
	testOptionsTeacher,
} from '@/mocks/adminMock'
import { type Option, Selector } from '@/shared/ui/Selector'

import './StatisticsLayout.scss'

interface StatisticsLayoutContentProps {
	children: ReactNode
}

export const StatisticsLayoutContent = ({ children }: StatisticsLayoutContentProps) => {
	const router = useRouter()
	const handleSelectChange = (item: Option) => {

			if (item.default) {
				router.push('/admin')
			} else {
				router.push(`/admin/${item.id}`)
		}
	}

	return (
		<div className="StatisticLayout__inner">
			<div className="StatisticLayout__head">
				<h1 className="StatisticLayout__title">Общая статистика</h1>
				<Selector className="StatisticLayout__selector" options={testOptionsTeacher} onChange={handleSelectChange} />
			</div>
			<div className="StatisticLayout__content">{children}</div>
		</div>
	)
}
