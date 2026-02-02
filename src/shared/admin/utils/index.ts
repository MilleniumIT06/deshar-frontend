export function minutesToHoursAndMinutes(totalMinutes: number) {
	const hours = Math.floor(totalMinutes / 60)
	const minutes = totalMinutes % 60
	return `${hours}ч ${minutes}м`
}

export const ROLE_LABELS = {
	admin: 'Администратор',
	teacher: 'Учитель',
	vicePrincipal: 'Завуч',
	principal: 'Директор',
	department: 'Упр. образования',
	ministry: 'Админ. министерства',
} as const
