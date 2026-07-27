/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_URL } from '@/config/api.config'
import {  axiosWithAuth } from '@/config/api.helper'
import { type StudentCommonData } from '@/shared/types/admin/types';
import { type Id } from '@/shared/types/types';

import { type IDepartmentDistrictStats, type IDepartmentStudent, type IDepartmentUniqueSchool } from '../types/department.types';
import { type IMinistryDistrict, type IMinistrySchool, type UniqueDistrict, type UniqueSchool } from '../types/ministy.types';
import { type IRepublicStatistic } from '../types/republic.types';

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


	// ministry
	async getMinistryRepublicStats() {
		const { data } = await axiosWithAuth<IRepublicStatistic>({
			url: API_URL.adminMinistryRepublicStats(),
			method: 'GET',
		})
		return data
	}
	async getMinistryDistricts() {
		const {data} = await axiosWithAuth<{data:IMinistryDistrict[];meta:{total_districts: number}}>({
			url: API_URL.adminMinistryDistricts(),
			method: 'GET',
		})
		return data
	}
	async getMinistrySchools() {
		const {data} = await axiosWithAuth<{data:IMinistrySchool[]; meta: {total_schools: number}}>({
			url: API_URL.adminMinistrySchools(),
			method: 'GET',
		})
		return data
	}
	async getMinistryDistrictStats(id:Id) {
		const {data} = await axiosWithAuth<UniqueDistrict>({
			url: API_URL.adminMinistryDistrictStats(id),
			method: 'GET',
		})
		return data
	}
	async getMinistrySchoolStats(id:Id) {
		const {data} = await axiosWithAuth<UniqueSchool>({
			url: API_URL.adminMinistrySchoolStats(id),
			method: 'GET',
		})
		return data
	}

	// department
	async getDepartmentMyDistrict() {
		const {data} = await axiosWithAuth<{data:IMinistryDistrict;}>({
			url: API_URL.adminDepartmentMyDistrict(),
			method: 'GET',
		})
		return data
	}
	async getDepartmentSchools() {
		const {data} = await axiosWithAuth<{data:IMinistrySchool[]; meta: {district_id: Id; total_schools: number}}>({
			url: API_URL.adminDepartmentSchools(),
			method: 'GET',
		})
		return data
	}
	async getDepartmentSchoolById(id:Id) {
		const {data} = await axiosWithAuth<{data:IDepartmentUniqueSchool;}>({
			url: API_URL.adminDepartmentUniqueSchool(id),
			method: 'GET',
		})
		return data
	}
	async getDepartmentDistrictStats() {
		const {data} = await axiosWithAuth<{data:IDepartmentDistrictStats}>({
			url: API_URL.adminDepartmentDistrictStats(),
			method: 'GET',
		})
		return data
	}
	async getDepartmentStudents() {
		const {data} = await axiosWithAuth<{data:IDepartmentStudent[];meta:{district_id:Id;total_students: number}}>({
			url: API_URL.adminDepartmentDistrictStudents(),
			method: 'GET',
		})
		return data
	}
	async getDepartmentTeachers() {
		const {data} = await axiosWithAuth<{data:IDepartmentStudent[];meta:{district_id:Id;total_students: number}}>({
			url: API_URL.adminDepartmentDistrictTeachers(),
			method: 'GET',
		})
		return data
	}
}

export const statsService = new StatsService()
