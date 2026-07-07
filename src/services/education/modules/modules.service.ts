import Cookies from 'js-cookie'

import { axiosClassic } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import { Id } from '@/shared/types/types'

interface IModule {
            id: Id;
			name: string;
			slug: string;
			image: string|null;
			description: string|null;
			complexity:number;
			total_xp_reward: number|null;
            total_pieces: number|null;
            total_lessons: number|null;
            total_tasks: number|null;
            progress: {
                status: string;
                progress_percentage: number;
                progress_formatted: string;
                is_completed: boolean;
                started_at: string|null;
                completed_at: string|null;
            };
        }
interface UniqueModule {
			module:{
				id:Id;
				name:string;
			};
			pieces:{
				id:Id;
				fon:string|null;
				lessons:any[];
				name:string;
				progress:any;
				sort_order:number;
				total_lessons:number;
			}[]
			progress:any;
			success:boolean;

		}
class ModulesService {

	async getModules() {
        const token = Cookies.get('jwt_token')
		const { data } = await axiosClassic<{data:IModule[];meta:any;success:boolean}>({
			url: API_URL.ingModules(),
			method: 'GET',
            headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		})
		return data
	}
    async getModuleById(id:Id) {
 const token = Cookies.get('jwt_token')
		const { data } = await axiosClassic<UniqueModule>({
			url: `${API_URL.ingModules()}/${id}`,
			method: 'GET',
            headers: {
				Authorization: token ? `Bearer ${token}` : '',
			},
		})
		return data
    }
}

export const modulesService = new ModulesService()
