import { z } from 'zod'

export const supportFormSchema = z.object({
	name: z.string().min(3, 'Введите имя').max(20),
	email: z.string().email('Некорректный email'),
	theme: z.string().min(3, 'Введите тему').max(20),
	message: z.string().min(10, 'Введите текст сообщения').max(100),
})

export type supportFormData = z.infer<typeof supportFormSchema>
