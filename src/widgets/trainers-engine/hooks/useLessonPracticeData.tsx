import { useGetLessonTasks, useGetLessonUniqueTask } from '@/hooks/queries/education/useGetTasks'

import type { LessonListItem } from '../types/types'


interface UseLessonPracticeDataParams {
	moduleId: number
	pieceId: number
	currentLesson: LessonListItem | null
	mode: string
	activeTaskIndex: number | null
}

export function useLessonPracticeData({
	moduleId,
	pieceId,
	currentLesson,
	mode,
	activeTaskIndex,
}: UseLessonPracticeDataParams) {
	const lessonId = currentLesson?.id || 0
	const shouldLoadTaskList = Boolean(currentLesson?.id && currentLesson.total_tasks > 0 && mode === 'practice')

	const { data: taskData, isLoading: isTaskListLoading } = useGetLessonTasks(
		moduleId,
		pieceId,
		lessonId,
		shouldLoadTaskList,
	)

	const activeTask =
		taskData?.data && taskData.data.length > 0 ? taskData.data[activeTaskIndex ?? 0] : undefined

	const {
		data: uniqueTask,
		isLoading: isTaskDetailLoading,
		isError: isTaskDetailError,
	} = useGetLessonUniqueTask(
		moduleId,
		pieceId,
		lessonId,
		activeTask?.id,
		Boolean(mode === 'practice' && activeTask?.id),
	)
	return {
		taskData,
		isTaskListLoading,
		activeTask,
		uniqueTask: uniqueTask,
		isTaskDetailLoading,
		isTaskDetailError,
	}
}
