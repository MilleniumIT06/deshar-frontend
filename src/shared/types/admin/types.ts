export type Student = {
	id: number
	placeNumber: number
	name: string
	time: number
	doneModules: number
	points: number
	parallelClass?: string
	class: string
}

export type StudentTableProps = {
	data: Student[]
	type: 'parallel' | 'classmates'
}

export type Module = {
	id: number
	moduleNumber: number
	moduleName: string
	allLessonsCount: number
	currentLessonsCount: number
	learningTime: number
	mistakesCount: number
	points: number
	attestationStatus: 'accepted' | 'not-completed' | 'rejected' | 'checking'
}

export type AttestationStatus = 'rejected' | 'accepted' | 'checking' | 'notCompleted'
export interface SchoolItem {
	id: number
	place: number
	schoolName: string
	learningTime: number
	doneModules: number
	points: number
}
export interface DepartamentItem {
	id: number
	placeNumber: number
	departmentName: string
	schoolsCount: number
	studentsCount: number
	learningTime: number
	doneModules: number
	points: number
}
export interface SchoolDepItem extends SchoolItem {
	department: string
}
// department: string
export interface IEducationDepartment {
	id: number
	place: number
	educationDepartmentName: string
	schoolsCount: number
	studentsCount: number
	learningTime: number
	doneModules: number
	points: number
}
