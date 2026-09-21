/* eslint-disable @typescript-eslint/no-explicit-any */
import { type TrainerType } from '../trainersMap'

import type { Id } from '@/shared/types/types'

export interface TrainerRef {
	handleCheck: (moduleId?: Id, pieceId?: Id, lessonId?: Id, taskId?: Id, timeSpent?: number) => void
	handleReset: () => void
}

export interface LessonListItem {
	id: Id
	name: string
	description: string
	sort_order: number
	total_tasks: number
	is_required: boolean
	audio: string | null
	image: string | null
	xp_reward: number
	progress: {
		is_completed: boolean
		status: string | 'completed'
	}
}

export interface TrainersEngineProps {
	config: {
		time: number
	}
	data: LessonListItem[]
	engineStatus: 'engineLoading' | 'engineSuccess' | 'engineError'
}

export interface UniqueTask {
	task: {
		audio: null | string
		config: any
		created_at: string
		description: string
		hints: string[]
		id: Id
		image: string | null
		is_published: boolean
		is_required: boolean
		lesson_id: Id
		max_attempts: number
		sort_order: number
		task_type_id: Id
		task_type: {
			description: string
			id: Id
			name: string
			slug: TrainerType
		}
		time_limit_seconds: number
		title: string
		updated_at: string
		video: string | null
		xp_reward: number
	}
	progress: { status: 'completed' | 'failed'; is_completed: boolean }
}
export interface TrainerCommonProps {
	audio: string | null
	currentTrainerIndex: number
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: TrainerStatus) => void
	isAlreadyCompleted: boolean
}
// {subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

export type TrainerTheme = 'towers' | 'ocean' | 'forest' | 's' | 'o' | 'default'
export type TrainerStatus = 'idle' | 'error' | 'success' | 'finish' | 'checking' | 'attempts-left'
