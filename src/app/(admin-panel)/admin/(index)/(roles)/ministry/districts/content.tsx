'use client'
import { useRouter } from 'next/navigation'

import { getDistrictsColumns } from '@/columns/ministry/getDistrictsColumns'
import { Table } from '@/components/Admin/Table'
import { useGetDistricts } from '@/hooks/admin/ministry/useGetDistricts'
import { Loader } from '@/shared/ui/Loader'
import { Card } from '@/widgets/AdminWidgets/Card'

import type { IMinistryDistrict } from '@/services/types/ministy.types'

export const DistrictsPageContent = () => {
	const router = useRouter()
	const { ministryDistricts, isMinistryDistrictsLoading, isMinistryDistrictsError } = useGetDistricts()
	if (isMinistryDistrictsLoading)
		return (
			<div>
				<Loader />
			</div>
		)
	if (isMinistryDistrictsError) return 'Error'
	const handleItemClick = (item: IMinistryDistrict) => {
		router.push(`districts/${item.id}`)
	}
	return (
		<div className="PageAdmin">
			<Card resetFilters={() => 'test'} title="Районы" valueFirst={`Всего районов ${ministryDistricts?.meta.total_districts}`}>
				{ministryDistricts && ministryDistricts.data && ministryDistricts.data.length > 0 ? (
					<Table<IMinistryDistrict>
						data={ministryDistricts.data}
						handleRowClick={handleItemClick}
						getColumns={() => getDistrictsColumns()}
					/>
				) : (
					'Данных нет'
				)}
			</Card>
		</div>
	)
}
