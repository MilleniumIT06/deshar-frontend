import { z } from 'zod'

export const signUpUserSchema = z
	.object({
		name: z.string().min(3, 'Введите имя').max(20),
		surname: z.string().min(3, 'Введите фамилию').max(20),
		email: z.string().email('Некорректный email'),
		password: z
			.string()
			.min(8, 'Пароль должен быть не менее 8 символов')
			.regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
			.regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
		confirmPassword: z.string(),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Пароли не совпадают',
		path: ['confirmPassword'],
	})

export type signUpUserFormData = z.infer<typeof signUpUserSchema>
