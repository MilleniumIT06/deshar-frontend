/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useCallback } from 'react'

import { educationService } from '@/services/education/education.service'

import type { Id } from '@/shared/types/types'

type TaskProgress = {
  task: Record<string, any>
  lesson: Record<string, any>
  piece: Record<string, any>
  module: Record<string, any>
}

type CheckAnswerResponse = {
  success: boolean
  is_correct: boolean
  message: string
  task: { id: Id; title: string; xp_reward: number }
  task_type: { id: Id; name: string; slug: string }
  progress?: TaskProgress
  xp_earned?: number
  attempts?: number
  attempts_left?: number
  hint?: string | null
}

type CheckAnswerParams = {
  moduleId: Id
  pieceId: Id
  lessonId: Id
  taskId: Id
  answer: unknown
  timeSpent: number
}

type UseCheckAnswerOptions = {
  onSuccess?: (data: CheckAnswerResponse) => void
  onError?: (data: CheckAnswerResponse) => void
  onRequestError?: (error: unknown) => void
}

export const useCheckAnswer = (options: UseCheckAnswerOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const [result, setResult] = useState<CheckAnswerResponse | null>(null)

  const checkAnswer = useCallback(
    async ({ moduleId, pieceId, lessonId, taskId, answer, timeSpent }: CheckAnswerParams) => {
      setIsLoading(true)
      setError(null)

      try {
        const data: CheckAnswerResponse = await educationService.checkTask(moduleId, pieceId, lessonId, taskId, {
          answer,
          time_spent: timeSpent,
        })

        setResult(data)

        if (data.is_correct) {
          options.onSuccess?.(data)
        } else {
          options.onError?.(data)
        }

        return data
      } catch (err) {
        setError(err)
        options.onRequestError?.(err)
        return null
      } finally {
        setIsLoading(false)
      }
    },
    [options]
  )

  return {
    checkAnswer,
    isLoading,
    error,
    result,
  }
}
