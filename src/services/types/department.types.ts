/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ManagerTopStudent } from "./republic.types";
import type { Id } from "@/shared/types/types"

export type DepartmentTopStudentType = Omit<ManagerTopStudent, "school">
export interface IDepartmentUniqueSchool {
		school: {
			id: Id
			name: string;
			district: string;
            region: string;
		};
		statistics: {
			total_students: number;
			total_teachers: number;
			total_classes: number;
			total_points: number;
			average_points:number;
		};
		top_students:DepartmentTopStudentType[];
		classes_statistics: {
				id: number;
				name: string;
				students_count:number;
				total_points:number;
				average_points: number;
			}
		top_teachers: any[]
	}
export interface IDepartmentDistrictStats  {
		district: {
			id: Id;
			name: string;
			region: string;
		};
		statistics: {
			total_schools: number;
			total_students: number;
			total_teachers: number;
			total_points:number;
			average_points: number;
		};
		top_schools:{
                id: Id;
				name: string;
				students_count: number;
				total_points: number;
				average_points: number;
			}[]
		top_students:{
				id: Id;
				name: string;
				points: number;
				level: number;
				school: string;
				class: string;
			}[]

	}
export interface IDepartmentStudent {
			id: Id;
			name: string;
			email: string;
			points: number;
			level: number;
			school: string;
			class: string;
			tasks_completed: number;
		}
