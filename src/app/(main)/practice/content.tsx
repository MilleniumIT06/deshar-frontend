'use client'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { testCardMock } from '@/mocks/data'

const TrainersEngine = dynamic(() => import('@/widgets/trainers-engine').then(mod => mod.TrainersEngine), {
	loading: () => <div className="engine-loader">Загрузка...</div>,
	ssr: false,
})

export const PracticeContent = () => {
	const [backendData, setBackendData] = useState<typeof testCardMock | null>(null)
	const [status, setStatus] = useState<'engineLoading' | 'engineSuccess' | 'engineError'>('engineLoading')

	useEffect(() => {
		// Имитация асинхронного запроса к API
		const fetchData = async () => {
			try {
				await new Promise(resolve => {
					setTimeout(resolve, 1500)
				}) // Задержка 1.5 сек
				setBackendData(testCardMock)
				setStatus('engineSuccess')
			} catch {
				setStatus('engineError')
				// console.log(e)
			}
		}

		fetchData()
	}, [])

	return <TrainersEngine config={{ themeName: 'default', time: 3 * 60 }} data={backendData} engineStatus={status} />
}
