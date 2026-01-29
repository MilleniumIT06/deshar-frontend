import { z } from 'zod'

export const signInUserFormSchema = z.object({
	email: z.string().email('Некорректный email'),
	password: z.string().min(1, 'Пароль обязателен для заполнения'),
})

export type signInUserFormData = z.infer<typeof signInUserFormSchema>
