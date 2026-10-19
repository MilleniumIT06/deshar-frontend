export interface StudentData {
	id: number
	type: 'classmates' | 'parallel'
	class: string
	name: string
	doneModules: number
	placeNumber: number
	points: number
	time: number
}
