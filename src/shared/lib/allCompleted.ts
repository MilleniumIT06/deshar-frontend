import { type ILesson } from '@/components/LearningContent'

export const isAllLessonsCompleted = (lessons: ILesson[]) => {
	if (lessons.every(lesson => lesson.completed === true)) {
		return true
	}
	return false
}
