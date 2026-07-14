import { axiosWithAuth } from '@/config/api.helper'
import { API_URL } from '@/config/api.config'
import { Id } from '@/shared/types/types';

interface ITeachersResponseData {
    success:boolean;
    data:{
			id:Id;
			name: string;
			email: string;
			avatar: string;
			is_online: boolean;
			last_activity: string;
			students_count: number;
			classes_count: number;
		}[];
    meta:{
        total:number;
        school_id:Id;
    };
}
interface ISchoolExportResponse {
    success: boolean;
    csv: string;
    filename: string;
    meta: {
        total_students: number;
        school_name: string;
        generated_at: string;
    };
}
class TeachersService {
async getSchoolTeachersAdmin() {
    const { data } = await axiosWithAuth<ITeachersResponseData>({
        url: API_URL.adminTeachers(),
        method: 'GET',
    })
    return data
}

async exportSchoolDataAdmin() {
        const { data } = await axiosWithAuth<ISchoolExportResponse>({
            url:  API_URL.adminExportSchoolCsv(),
            method: 'GET',
        })
        return data
    }
}

export const teachersService = new TeachersService()
