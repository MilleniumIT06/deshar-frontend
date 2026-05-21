import { z } from 'zod'

export const supportFormSchema = z.object({
	email: z.string().email('Некорректный email'),
	text: z.string().min(1, 'Обязателен для заполнения'),
})

export type supportFormData = z.infer<typeof supportFormSchema>
