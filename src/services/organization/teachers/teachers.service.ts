import Cookies from 'js-cookie'
import { axiosClassic } from '@/api/api.helper'
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
    const token = Cookies.get('jwt_token')
    const { data } = await axiosClassic<ITeachersResponseData>({
        url: API_URL.adminTeachers(),
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        },
    })
    console.log(data);
    return data
}

async exportSchoolDataAdmin() {
        const token = Cookies.get('jwt_token')
        const { data } = await axiosClassic<ISchoolExportResponse>({

            url:  API_URL.adminExportSchoolCsv(),
            method: 'GET',
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
            },
        })
        return data
    }
}

export const teachersService = new TeachersService()
