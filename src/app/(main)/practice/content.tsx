'use client'
import dynamic from 'next/dynamic'

const TrainersEngine = dynamic(() => import('@/widgets/trainers-engine').then(mod => mod.TrainersEngine), {
	loading: () => <div className="engine-loader">Загрузка...</div>,
	ssr: false,
})

export const PracticeContent = () => {
	return <TrainersEngine themeName="towers" />
}
