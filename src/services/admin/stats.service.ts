import {  axiosWithAuth } from '@/config/api.helper'
import { API_URL } from '@/config/api.config'
import { StudentCommonData } from '@/shared/types/admin/types';
import { Id } from '@/shared/types/types';
interface ISchoolStatistic {
    statistics:{
        overview:{[key:string]:number};
        school_progress:{[key:string]:number};
		classes:{
			class:{
				id:Id;
				name:string;
				class_type_id:Id;
				class_type_name:string;
				teacher_id:Id | null;
				teacher_name:string;
			},
			statistics:{
				students_count:number;
				total_xp:number;
				average_xp:number;
				average_level:number;
				active_students:number;
				active_percentage:number;
				completed_modules:number;
				class_progress_percentage:number;
			};
			top_students:{id:Id;level:number;level_name:string;name:string;rank:number;xp:0}[]
		}[];
		class_ranking:{rank:number;class_name:string;average_xp:number;students_count:number;progress_percentage:0}
    }
	meta:{
		school_id:number;
		school_name:string;
		generated_at:string;
	}
}
export interface ISchoolAllStudents extends StudentCommonData {
progress_percentage:number;
avatar:string;
class:string;
class_id:Id;
completed_modules:number;
current_streak:number;
email:string;
is_online:boolean;
}
class StatsService {
	async getUserStats() {
		const { data } = await axiosWithAuth<{data:{stats:any}}>({
			url: API_URL.userStats(),
			method: 'GET',
		})
		return data
	}
	async getAdminSchoolStats() {
		const { data } = await axiosWithAuth<ISchoolStatistic>({
			url: API_URL.adminSchoolStats(),
			method: 'GET',
		})
		return data
    }
	async getSchoolAllStudents() {
		const { data } = await axiosWithAuth<{data:ISchoolAllStudents[];meta:{school_id:Id;school_name:string;total:number}}>({
			url: API_URL.adminGetAllSchoolStudents(),
			method: 'GET',
		})
		return data
	}
}

export const statsService = new StatsService()
