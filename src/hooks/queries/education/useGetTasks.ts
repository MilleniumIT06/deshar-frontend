import { educationService } from '@/services/education/education.service'
import { Id } from '@/shared/types/types'
import { useQuery } from '@tanstack/react-query'

export const useGetLessonTasks = (moduleId: Id, pieceId: Id, lessonId: Id, enabled: boolean) => {
	const {
		data,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['ing-module-piece-lesson-tasks', moduleId, pieceId, lessonId],
		queryFn: () => educationService.getLessonTasks(moduleId, pieceId, lessonId),
		enabled: enabled,
		staleTime: 20 * 60 * 1000,
	})

	return {
		data: data || undefined,
		isLoading,
		isError,
		error
	}
}

export const useGetLessonUniqueTask = (
    moduleId: Id,
    pieceId: Id,
    lessonId: Id,
    taskId: Id | undefined,
    enabled: boolean
) => {
	const {
		data,
		isLoading,
		isError,
		error,
	} = useQuery({
		queryKey: ['ing-module-piece-lesson-tasks-unique', moduleId, pieceId, lessonId, taskId],
		queryFn: () => educationService.getLessonTaskByTaskId(moduleId, pieceId, lessonId, taskId!),
		enabled: enabled && taskId !== undefined,
		staleTime: 20 * 60 * 1000,
	})

	return {
		data: data || undefined,
		isLoading,
		isError,
		error
	}
}
