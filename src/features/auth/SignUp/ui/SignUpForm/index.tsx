'use client'
import { Input } from '@/shared/ui/Input'
import { Button } from '@/shared/ui/Button'
import styles from './styles.module.scss'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { signUpUserFormData, signUpUserSchema } from '../../model/signUp.schema'
import { zodResolver } from '@hookform/resolvers/zod'
export const SignUpForm = ({ handleForm }: { handleForm: () => void; }) => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<signUpUserFormData>({
        resolver: zodResolver(signUpUserSchema),
        mode: "onChange"
    });
    const onSubmit = (data: signUpUserFormData) => {
        console.log(data);
    }
    return (
        <div className={styles.index}>
            <div className={styles.inner}>
                <h1 className={styles.title}>Регистрация аккаунта</h1>
                <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        type="text"
                        placeholder="Введите имя"
                        className={styles.input}
                        error={true}
                        validationMessage={errors.name && errors.name.message}
                        {...register("name")}
                    />
                    <Input
                        type="text"
                        placeholder="Введите фамилию"
                        className={styles.input}
                        validationMessage={errors.surname && errors.surname.message}
                        {...register("surname")}
                    />
                    <Input
                        type="email"
                        placeholder="Введите email"
                        className={styles.input}
                        validationMessage={errors.email && errors.email.message}
                        {...register("email")}
                    />
                    <Input
                        type="password"
                        placeholder="Придумайте пароль"
                        className={styles.input}
                        validationMessage={errors.password && errors.password.message}
                        {...register("password")}
                    />
                    <Input
                        type="password"
                        placeholder="Подтвердите пароль"
                        className={styles.input}
                        validationMessage={errors.confirmPassword && errors.confirmPassword.message}
                        {...register("confirmPassword")}
                    />
                    <Button disabled={!isValid} className={styles.btn} size="medium" type="submit" onClick={handleForm}>
                        Далее
                    </Button>
                </form>
                <div className={styles.bottom}>
                    <div>
                        Уже зарегистрированы?{' '}
                        <Link href="/sign-in">Войти</Link>
                    </div>
                    <p>
                        Продолжая, вы соглашаетесь на обработку персональных данных
                        и принимаете условия пользоват. соглашения
                    </p>
                </div>
            </div>
        </div>
    )
}
