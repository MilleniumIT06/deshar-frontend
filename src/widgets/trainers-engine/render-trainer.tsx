/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef } from 'react'
import { trainersMap, type TrainerType } from './trainersMap'

interface RenderTrainerProps {
	type: TrainerType
	data: any
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
}

const RenderTrainer = forwardRef<any, RenderTrainerProps>(({ type, data, changeStatus, onSuccess, onError }, ref) => {
	const Component = trainersMap[type]

	if (!Component) {
		return <p>Компонент типа: {type} не найден</p>
	}
	return <Component {...data} ref={ref} changeStatus={changeStatus} onSuccess={onSuccess} onError={onError} />
})

RenderTrainer.displayName = 'RenderTrainer'

export default RenderTrainer
