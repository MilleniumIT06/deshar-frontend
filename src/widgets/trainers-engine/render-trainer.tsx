/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'
import { trainersMap, type TrainerType } from './trainersMap'

interface RenderTrainerProps {
	type: TrainerType
	data: any
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	currentIndex: number
}

const RenderTrainer = forwardRef<any, RenderTrainerProps>(
	({ type, data, changeStatus, onSuccess, onError, currentIndex }, ref) => {
		const Component = trainersMap[type]

		if (!Component) {
			return <p>Компонент типа: {type} не найден</p>
		}
		return (
			<Component
				{...data}
				ref={ref}
				changeStatus={changeStatus}
				onSuccess={onSuccess}
				onError={onError}
				currentTrainerIndex={currentIndex}
			/>
		)
	},
)

RenderTrainer.displayName = 'RenderTrainer'

export default RenderTrainer
