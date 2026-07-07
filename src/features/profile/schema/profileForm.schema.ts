import { z } from 'zod'

export const profileFormSchema = z
    .object({
        name: z.string().min(3, 'Введите имя').max(20),
        surname: z.string().min(3, 'Введите фамилию').max(20),
        email: z.string().email('Некорректный email'),
        birthDate: z.string().length(10, { message: 'Введите дату полностью (ДД.ММ.ГГГГ)' }),
        password: z
            .string({ message: 'Пароль обязателен для заполнения' })
            .min(8, 'Пароль должен быть не менее 8 символов')
            .regex(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
            .regex(/[a-z]/, 'Пароль должен содержать хотя бы одну строчную букву')
            .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру')
            .regex(/[!@#$%^&*(),.?":{}|<>]/, 'Пароль должен содержать хотя бы один спецсимвол'),
        confirmPassword: z.string(),
    })
    .refine(data => data.password === data.confirmPassword, {
        message: 'Пароли не совпадают',
        path: ['confirmPassword'],
    })

export type profileFormData = z.infer<typeof profileFormSchema>
