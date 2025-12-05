import { z } from 'zod'

export const signInUserFormSchema = z.object({
	email: z.string().email('Некорректный email'),
	password: z.string().min(1, 'Пароль обязателен для заполнения'),
	// .string()
	// .min(8, 'Пароль должен быть не менее 8 символов')
	// .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
	// .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})

export type signInUserFormData = z.infer<typeof signInUserFormSchema>
