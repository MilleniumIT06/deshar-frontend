import type { Id, TrainerTheme } from '@/shared/types/types'
import { TrainerType } from '../trainersMap'

export interface TrainerRef {
	handleCheck: () => void
	handleReset: () => void
}

export interface LessonListItem {
	id: Id
	name: string
	description: string
	sort_order: number
	total_tasks: number
	is_required: boolean;
	audio:string|null;
}

export interface TrainersEngineProps {
	config: {
		themeName: TrainerTheme
		time: number
	}
	data: LessonListItem[]
	engineStatus: 'engineLoading' | 'engineSuccess' | 'engineError'
}

export interface UniqueTask {
			task: {
				audio: null|string;
				config:any;
				created_at:string;
				description:string;
				hints:string[];
				id:Id;
				image:string|null;
				is_published:boolean;
				is_required:boolean;
				lesson_id:Id;
				max_attempts:number;
				sort_order:number;
				task_type_id:Id;
				task_type:{
					description:string;
					id:Id;
					name:string;
					slug:TrainerType;
				}
				time_limit_seconds:number;
				title:string;
				updated_at:string;
				video:string|null;
				xp_reward:number;
			}
		}
