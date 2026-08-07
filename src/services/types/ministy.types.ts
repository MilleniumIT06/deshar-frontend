/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Id } from '@/shared/types/types'

import { type ISchool } from './republic.types'

export interface IMinistryDistrict {
	id: Id
	name: string
	region: string
	total_schools: number
	total_students: number
	total_points: number
	average_points: number
}
export interface IMinistrySchool extends Omit<ISchool, 'students_count'> {
	address: string | null
	phone: string | null
	email: string | null
	region: string
	total_students: number
	total_teachers: number
	total_classes: number
}

export interface UniqueDistrictTopSchool {
	id: Id
	name: string
	students_count: number
	total_points: number
	average_points: number
}
export interface UniqueDistrictTopStudent {
	id: Id
	name: string
	points: number
	level: number
	school: string
	class: string
}
export interface UniqueDistrict {
	data: {
		district: {
			id: Id
			name: string
			region: string
		}
		statistics: {
			total_schools: number
			total_students: number
			total_teachers: number
			total_points: number
			average_points: number
		}
		top_schools: UniqueDistrictTopSchool[]
		top_students: UniqueDistrictTopStudent[]
	}
}
export interface UniqueSchool {
	data: {
		school: {
			id: Id
			name: string
			district: string
			region: string
		}
		statistics: {
			total_students: number
			total_teachers: number
			total_classes: number
			total_points: number
			average_points: number
		}
		top_students: {
			id: Id
			name: string
			points: number
			level: number
			class: string
			tasks_completed: number
		}[]
		classes_statistics: {
			id: Id
			name: string
			students_count: number
			total_points: number
			average_points: number
		}[]
		top_teachers: any[]
	}
}
