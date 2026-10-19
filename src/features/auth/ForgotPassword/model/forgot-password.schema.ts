import z from 'zod'

export const forgotPasswordValidateSchema = z.object({
	email: z.string().email('Некорректный email'),
})
export type forgotPasswordFormData = z.infer<typeof forgotPasswordValidateSchema>
