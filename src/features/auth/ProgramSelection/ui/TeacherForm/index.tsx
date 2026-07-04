import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useSignUp } from "@/features/auth/SignUp/useSignUp"
import { useGetDistricts } from "@/hooks/queries/districts/useGetDistricts"
import { useGetSchools } from "@/hooks/queries/schools/useGetSchools"
import { useGetLocalities } from "@/hooks/queries/useGetLocalities"
import { useGetSchoolClasses } from "@/hooks/queries/useGetSchoolClasses"
import { Button } from "@/shared/ui/Button"
import { InputSelect } from "@/shared/ui/InputSelect"
import './styles.scss'
import { MultiInputSelect } from "@/shared/ui/MultiInputSelect"

const validateSchema = z.object({
	locality: z.object({
		id: z.number({ required_error: 'Выберите населенный пункт' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите населенный пункт' }),
	}),
	district: z.object({
		id: z.number({ required_error: 'Пожалуйста, выберите район' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите район' }),
	}),
	school: z.object({
		id: z.number({ required_error: 'Пожалуйста, выберите школу' }),
		name: z.string().min(1, { message: 'Пожалуйста, выберите школу' }),
	}),

	 schoolClasses: z
        .array(
            z.object({
                id: z.number({ required_error: 'ID обязателен' }),
                name: z.string().min(1, { message: 'Имя класса обязательно' }),
            })
        )
        .min(1, { message: 'Пожалуйста, выберите хотя бы один класс' }),
})
const defaultValues = {
	locality: { id: -1, name: '' },
	district: { id: -1, name: '' },
	school: { id: -1, name: '' },
	schoolClasses: [],
}
export const TeacherForm = () => {
    const form = useForm({
        resolver: zodResolver(validateSchema),
        defaultValues: defaultValues,
        mode: 'onChange',
    })
	const { isPending, mutate, isSuccess } = useSignUp()
	const { districts, isLoading: isDistrictsLoading, isError: isDistrictsError } = useGetDistricts()
	const { localities, isLoading: isLocalitiesLoading, isError: isLocalitiesError } = useGetLocalities({
	districtId: null
})
	const { isError: isSchoolsError, schools, isLoading: isSchoolsLoading } = useGetSchools({
		localityId:null
	})
	const { schoolClasses, isLoading: isSchoolClassesLoading,isError:isSchoolClassesError } = useGetSchoolClasses({
	schoolId: null
})
	const onSubmit = async (data: z.infer<typeof validateSchema>) => {
		console.log(data)

		}


const resClasses = [
	{
		id:1,
		name:'Test1'
	},
	{
		id:2,
		name:'Test2'
	},
	{
		id:3,
		name:'Test3'
	},
	{
		id:4,
		name:'Test4'
	},
	{
		id:5,
		name:'Test5'
	}
]
    return (
		<div className="TeacherForm">
			<div className="TeacherForm__inner">
				<h1 className="TeacherForm__title">Регистрация учителя</h1>
       <form onSubmit={form.handleSubmit(onSubmit)} className="TeacherForm__form">
		<div className="TeacherForm__field">
				<InputSelect
					value={form.watch('district')}
					setValue={value => {
						form.setValue('district', value, { shouldValidate: true })
						form.setValue('school', { id: 0, name: '' })
					}}
					options={districts}
					isLoading={isDistrictsLoading}
					isError={isDistrictsError}
					placeholderValue="Выберите район"
				/>
				{form.formState.errors.district && (
					<p className="TeacherForm__error">{form.formState.errors.district.message}</p>
				)}
			</div>
			<div className="TeacherForm__field">
				<InputSelect
					value={form.watch('locality')}
					setValue={value => {
						form.setValue('locality', value, { shouldValidate: true })
						form.setValue('school', { id: 0, name: '' })
					}}
					options={localities}
					isLoading={isLocalitiesLoading}
					isError={isLocalitiesError}
					placeholderValue="Выберите населенный пункт"
				/>
				{form.formState.errors.locality && (
					<p className="TeacherForm__error">{form.formState.errors.locality.message}</p>
				)}
			</div>

			<div className="TeacherForm__field">
				<InputSelect
					value={form.watch('school')}
					setValue={value => form.setValue('school', value, { shouldValidate: true })}
					options={schools}
					isLoading={isSchoolsLoading}
					isError={isSchoolsError}
					placeholderValue="Выберите школу"
				/>
				{form.formState.errors.school && (
					<p className="TeacherForm__error">{form.formState.errors.school.message}</p>
				)}
			</div>

		<div className="TeacherForm__field">
				<MultiInputSelect
					value={form.watch('schoolClasses')}
					setValue={value =>form.setValue('schoolClasses',value,{shouldValidate:true})}
					options={resClasses}
					isLoading={isSchoolClassesLoading}
					isError={isSchoolClassesError}
					placeholderValue="Выберите школу"
				/>

				{form.formState.errors.schoolClasses && (
					<p className="TeacherForm__error">{form.formState.errors.schoolClasses.message}</p>
				)}
			</div>
			<div>
				<Button
					className="TeacherForm__btn"
					size="medium"
					type="submit"
					disabled={!form.formState.isValid || form.formState.isSubmitting || isPending}>
					{form.formState.isSubmitting || isPending ? 'Отправка...' : 'Зарегистрироваться'}
				</Button>
			</div>
		</form>
			</div>
		</div>
    )
}
