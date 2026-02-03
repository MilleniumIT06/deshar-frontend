import './styles.scss'
import { useState } from 'react'

export interface IFilter {
	type: 'time' | 'modules' | 'points'
	fromValue?: string
	toValue?: string
	onFromChange?: (value: string) => void
	onToChange?: (value: string) => void
}

export const Filter = ({
	type = 'time',
	fromValue: externalFromValue = '',
	toValue: externalToValue = '',
	onFromChange,
	onToChange,
}: IFilter) => {
	const [internalFromValue, setInternalFromValue] = useState('')
	const [internalToValue, setInternalToValue] = useState('')

	const fromValue = externalFromValue !== undefined ? externalFromValue : internalFromValue
	const toValue = externalToValue !== undefined ? externalToValue : internalToValue

	const validateTime = (value: string) => {
		if (!value) return true

		const [hours, minutes] = value.split(':')
		const h = parseInt(hours, 10)
		const m = parseInt(minutes, 10)

		return h >= 0 && h <= 23 && m >= 0 && m <= 59
	}

	const handleTimeInput = (value: string, setValue: (val: string) => void, callback?: (val: string) => void) => {
		const numbers = value.replace(/\D/g, '')

		if (numbers.length <= 2) {
			setValue(numbers)
			callback?.(numbers)
		} else if (numbers.length <= 4) {
			const formatted = `${numbers.slice(0, 2)}:${numbers.slice(2)}`
			if (validateTime(formatted)) {
				setValue(formatted)
				callback?.(formatted)
			}
		}
	}

	const handleInputChange = (value: string, setValue: (val: string) => void, callback?: (val: string) => void) => {
		if (type === 'time') {
			handleTimeInput(value, setValue, callback)
		} else {
			const newValue = value.replace(/\D/g, '')
			setValue(newValue)
			callback?.(newValue)
		}
	}

	const handleFromChange = (value: string) => {
		if (onFromChange) {
			onFromChange(value)
		} else {
			setInternalFromValue(value)
		}
	}

	const handleToChange = (value: string) => {
		if (onToChange) {
			onToChange(value)
		} else {
			setInternalToValue(value)
		}
	}

	const getTitle = () => {
		switch (type) {
			case 'time':
				return 'Время'
			case 'modules':
				return 'Модули'
			case 'points':
				return 'Баллы'
			default:
				return ''
		}
	}

	return (
		<div className="Filter">
			<span className="Filter__title">{getTitle()}</span>
			<div className="Filter__input">
				<input
					type="text"
					className="input-reset"
					placeholder={'От'}
					value={fromValue}
					onChange={e => handleInputChange(e.target.value, val => handleFromChange(val), onFromChange)}
					maxLength={type === 'time' ? 5 : 10}
				/>
			</div>
			<span className="Filter__divider">-</span>
			<div className="Filter__input">
				<input
					type="text"
					className="input-reset"
					placeholder={'До'}
					value={toValue}
					onChange={e => handleInputChange(e.target.value, val => handleToChange(val), onToChange)}
					maxLength={type === 'time' ? 5 : 10}
				/>
			</div>
		</div>
	)
}
