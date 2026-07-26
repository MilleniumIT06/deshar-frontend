import { Id } from "@/shared/types/types";
export interface ManagerTopStudent {
				id:Id;
				name: string;
				points: number;
				level: number;
				school: string|null;
				class: string;
			}
			export interface ISchool {
				id: Id;
				name: string;
				district: string|null;
				students_count: number;
				total_points: number;
				average_points: number;
			}
export interface IRepublicStatistic{
    success: boolean;
	data: {
        statistics: {
			total_schools: number;
			total_students: number;
			total_teachers: number;
			total_points: number;
			average_points:number;
		},
		top_districts:{
				id: Id;
				name: string;
				total_schools: number;
				total_students: number;
				total_points: number;
				average_points: number;
			}[]
		top_schools: ISchool[]
		top_students: ManagerTopStudent[]
	}
}
