'use client'
import Image from 'next/image'
import { redirect, RedirectType, useParams } from 'next/navigation'

import { useAppDispatch } from '@/app/_store/hooks'
import { changeStatus } from '@/entities/learning/model/status.slice'
import { Button } from '@/shared/ui/Button'

import './styles.scss'

export const SelectModalContent = ({ onClose }: { onClose: () => void }) => {
	const params = useParams<{ id: string }>()

	const dispatch = useAppDispatch()
	const handleClickStartBtn = () => {
		dispatch(changeStatus('attestation'))
		redirect(`/attestation/${params.id}`, RedirectType.replace)
	}
	return (
		<div className="SelectModalContent">
			<div className="SelectModalContent__image">
				<Image fill src="/images/Modal/letsAttestateImage.png" alt="Attestation image" />
			</div>
			<span className="SelectModalContent__subtitle">Приступим к аттестации?</span>
			<div className="SelectModalContent__btns">
				<Button variant="secondary" size="small" className="SelectModalContent__btn" onClick={onClose}>
					Отмена
				</Button>
				<Button
					variant="primary"
					size="small"
					className="SelectModalContent__btn"
					onClick={handleClickStartBtn}>
					Начать
				</Button>
			</div>
		</div>
	)
}
