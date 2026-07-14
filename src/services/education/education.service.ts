import { axiosWithAuth } from '@/config/api.helper'
import { API_URL } from '@/config/api.config'
import { Id } from '@/shared/types/types'
import { TrainerType } from '@/widgets/trainers-engine/trainersMap';
import { LessonListItem, UniqueTask } from '@/widgets/trainers-engine/types/types';

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

class EducationService {

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
	async getPiece(moduleId:Id,pieceId:Id) {
		const { data } = await axiosWithAuth<{lessons:{id:Id; name: string; description:string; sort_order:number; total_tasks: number; progress:any}[];piece:{name:string}}>({
			url: `${API_URL.ingModules()}/${moduleId}/pieces/${pieceId}`,
			method: 'GET',
		})
		return data
	}
		async getPieceLessons(moduleId:Id,pieceId:Id) {
		const { data } = await axiosWithAuth<{data:LessonListItem[];piece:{name:string}}>({
			url: `${API_URL.ingModules()}/${moduleId}/pieces/${pieceId}/lessons`,
			method: 'GET',
		})
		return data
	}
	async getLessonTasks(moduleId:Id,pieceId:Id,lessonId:Id) {
const { data } = await axiosWithAuth<{data:{id:Id}[]}>({
			url: `${API_URL.ingModules()}/${moduleId}/pieces/${pieceId}/lessons/${lessonId}/tasks`,
			method: 'GET',
		})
		return data
	}
	async getLessonTaskByTaskId(moduleId:Id,pieceId:Id,lessonId:Id,taskId:Id) {
const { data } = await axiosWithAuth<UniqueTask>({
			url: `${API_URL.ingModules()}/${moduleId}/pieces/${pieceId}/lessons/${lessonId}/tasks/${taskId}`,
			method: 'GET',
		})
		return data
	}
}

export const educationService = new EducationService()
