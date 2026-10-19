import dynamic from 'next/dynamic'

import { Continue } from '@/components/Continue'
import { Successes } from '@/widgets/Successes'

const OtherSubjects = dynamic(() => import('@/widgets/OtherSubjects').then(mod => mod.OtherSubjects), {
	loading: () => <div>Загрузка...</div>,
})
const TopClassmates = dynamic(() => import('@/components/TopClassmates').then(mod => mod.TopClassmates), {
	loading: () => <div>Загрузка...</div>,
})
export default function Authed() {
	return (
		<main className="mRelative">
			<Successes />
			<Continue />
			<TopClassmates />
			<OtherSubjects />
		</main>
	)
}
