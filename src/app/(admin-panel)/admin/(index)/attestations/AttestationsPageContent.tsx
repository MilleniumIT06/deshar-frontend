'use client'
import { useState } from 'react'

import { AttestationsTable } from '@/components/Admin/Attestations/AttestationsTable'
import { mockAttestationData } from '@/mocks/adminMock'
import useRole from '@/shared/hooks/admin/useRole'
import { Card } from '@/widgets/AdminWidgets/Card'

const TABS = [
	{ id: 0, title: 'На проверку' },
	{ id: 1, title: 'Принятые' },
	{ id: 2, title: 'Отклоненные' },
]
export const AttestationsPageContent = () => {
	// const navigate = useNavigate();
	// const router = useRouter()
	const { role } = useRole()
	const [timeFrom, setTimeFrom] = useState<string>('')
	const [timeTo, setTimeTo] = useState<string>('')

	const [modulesFrom, setModulesFrom] = useState<string>('')
	const [modulesTo, setModulesTo] = useState<string>('')
	const [pointsFrom, setPointsFrom] = useState<string>('')
	const [pointsTo, setPointsTo] = useState<string>('')
	const [activeTab, setActiveTab] = useState(0)

	const resetFilters = () => {
		setTimeFrom('')
		setTimeTo('')
		setModulesFrom('')
		setModulesTo('')
		setPointsFrom('')
		setPointsTo('')
	}
	const data =
		activeTab === 0
			? mockAttestationData.checking
			: activeTab === 1
				? mockAttestationData.accepted
				: mockAttestationData.rejected
	return (
		<main className="PageAdmin">
			<Card
				filters={[
					{
						type: 'time',
						setValueFrom: setTimeFrom,
						setValueTo: setTimeTo,
						valueFrom: timeFrom,
						valueTo: timeTo,
					},
					{
						type: 'modules',
						setValueFrom: setModulesFrom,
						setValueTo: setModulesTo,
						valueFrom: modulesFrom,
						valueTo: modulesTo,
					},
					{
						type: 'points',
						setValueFrom: setPointsFrom,
						setValueTo: setPointsTo,
						valueFrom: pointsFrom,
						valueTo: pointsTo,
					},
				]}
				resetFilters={resetFilters}
				title="Аттестации учеников"
				tabs={TABS}
				key={'testCard123'}
				valueFirst="147 аттестаций"
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				csv={role === 'department' && true}>
				<AttestationsTable data={data} />
			</Card>
		</main>
	)
}
