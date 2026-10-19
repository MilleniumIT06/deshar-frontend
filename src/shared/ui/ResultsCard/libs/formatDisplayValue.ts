export const formatDisplayValue = (val: string | number, mode: 'value' | 'time') => {
	if (mode === 'time') {
		const totalMinutes = Number(val)
		if (isNaN(totalMinutes)) return val

		const hours = Math.floor(totalMinutes / 60)
		const minutes = totalMinutes % 60

		const hoursStr = hours > 0 ? `${hours}ч ` : ''
		return `${hoursStr}${minutes}м`
	}
	return val
}
