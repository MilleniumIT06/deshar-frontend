import { useWordPicker } from '@/hooks/trainers/useWordPicker'
import { TrainerTitle } from '@/shared/ui/TrainerTitle'
import { forwardRef, useImperativeHandle } from 'react'
import cn from 'classnames'

import './styles.scss'

interface WordPickerProps {
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
	payload: {
		text: string
		correctValues: string[]
	}
}

export const WordPicker = forwardRef(
	({ title, subTitle, onError, onSuccess, changeStatus, payload }: WordPickerProps, ref) => {
		const { words, toggleWord, checkResult, reset } = useWordPicker({
			text: payload.text,
			correctValues: payload.correctValues,
			onSuccess,
			onError,
			changeStatus,
		})

		useImperativeHandle(ref, () => ({
			handleCheck: checkResult,
			handleReset: reset,
		}))

		return (
			<div className="word-picker">
				<div className="word-picker__content">
					<span className="trainer-number-title">Тренажер 1</span>
					<TrainerTitle title={title} />

					{subTitle && <h2 className="word-picker__subtitle">{subTitle}</h2>}

					<div className="word-picker__interactive-zone">
						<button type="button" className="word-picker__audio-button">
							<svg
								width="22"
								height="18"
								viewBox="0 0 22 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<path
									d="M11.0066 16.0629C11.0066 16.4621 10.7827 16.8247 10.4323 16.9939C10.2968 17.0599 10.1516 17.0918 10.0073 17.0918C9.77891 17.0918 9.55261 17.011 9.36983 16.8549L3.90802 12.1936H0.999054C0.447387 12.194 0 11.733 0 11.1649V7.06537C0 6.49695 0.447387 6.03618 0.999054 6.03618H3.90825L9.37006 1.37485C9.66848 1.12011 10.0823 1.0658 10.4325 1.23628C10.7827 1.40554 11.0069 1.76841 11.0069 2.16733L11.0066 16.0629ZM14.8461 14.4551C14.8217 14.4568 14.7983 14.4577 14.7742 14.4577C14.5103 14.4577 14.2559 14.3503 14.0679 14.1565L13.9343 14.0184C13.5838 13.6582 13.5427 13.0876 13.8378 12.678C14.586 11.639 14.9808 10.4074 14.9808 9.11548C14.9808 7.72585 14.5325 6.42243 13.6841 5.34599C13.3611 4.93684 13.3909 4.34261 13.7529 3.97L13.8863 3.8324C14.0858 3.62685 14.3533 3.51482 14.6427 3.5326C14.9246 3.54721 15.1878 3.68384 15.3665 3.90887C16.5434 5.39202 17.1651 7.19274 17.1651 9.11572C17.1651 10.9067 16.6153 12.6115 15.5748 14.0449C15.401 14.2838 15.1353 14.4339 14.8461 14.4551ZM18.9766 17.6349C18.7959 17.8549 18.5346 17.9868 18.2549 17.999C18.2412 17.9995 18.2272 18 18.2131 18C17.9485 18 17.6945 17.8924 17.5065 17.6987L17.3753 17.5636C17.0085 17.1861 16.9837 16.5824 17.3171 16.1737C18.9284 14.2001 19.816 11.6936 19.816 9.11548C19.816 6.43387 18.8657 3.85237 17.1407 1.84659C16.791 1.43939 16.8087 0.822993 17.1809 0.438203L17.3119 0.303039C17.5063 0.101876 17.7588 -0.00893376 18.0485 0.000564238C18.3235 0.00860101 18.5836 0.13378 18.7664 0.345658C20.8515 2.76351 22 5.87836 22 9.11548C22.0005 12.2301 20.9267 15.2558 18.9766 17.6349Z"
									fill="white"
								/>
							</svg>
						</button>

						<div className="word-picker__text-wrapper">
							{words.map((word, index) => (
								<span
									key={`word-${index}`}
									className={cn('word-picker__word', {
										'is-selected': word.isSelected,
									})}
									onClick={() => toggleWord(index)}>
									{word.text}
								</span>
							))}
						</div>
					</div>
				</div>
			</div>
		)
	},
)

WordPicker.displayName = 'WordPicker'
