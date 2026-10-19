import dynamic from 'next/dynamic'

import { ContinueLearning } from '@/widgets/ContinueLearning'
import { Successes } from '@/widgets/Successes'

const OtherSubjects = dynamic(() => import('@/widgets/OtherSubjects').then(mod => mod.OtherSubjects), {
	loading: () => <div>Загрузка...</div>,
})
const TopClassmates = dynamic(() => import('@/widgets/TopClassmates').then(mod => mod.TopClassmates), {
	loading: () => <div>Загрузка...</div>,
})
export default function Authed() {
	return (
		<main className="mRelative">
			<Successes />
			<ContinueLearning />
			<TopClassmates />
			<OtherSubjects />
		</main>
	)
}
