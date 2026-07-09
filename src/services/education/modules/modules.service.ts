import { axiosWithAuth } from '@/api/api.helper'
import { API_URL } from '@/config/api.config'
import { Id } from '@/shared/types/types'

export interface IModule {
            id: Id;
			name: string;
			slug: string;
			image: string|null;
			description: string|null;
			complexity:number;
			is_published:boolean;
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
		interface IModulePieceProgress {
completed_at:null|string;
is_completed:boolean;
progress_percentage:number;
started_at:string;
status:string;
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
				progress:IModulePieceProgress;
				sort_order:number;
				total_lessons:number;
			}[]
			progress:any;
			success:boolean;

		}
class ModulesService {

	async getModules() {
		const { data } = await axiosWithAuth<{data:IModule[];meta:any;success:boolean}>({
			url: API_URL.ingModules(),
			method: 'GET',
		})
		console.log('getModules',data)
		return data
	}
    async getModuleById(id:Id) {
		const { data } = await axiosWithAuth<UniqueModule>({
			url: `${API_URL.ingModules()}/${id}`,
			method: 'GET',
		})
		return data
    }
}

export const modulesService = new ModulesService()
