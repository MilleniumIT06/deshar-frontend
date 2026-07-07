'use client';
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input"

import { type profileFormData,profileFormSchema } from "../schema/profileForm.schema";
import './styles.scss';

export const ProfileForm = () => {
    const {isError,profileData,isFetching} = useProfile()
    useEffect(()=> {
        console.log(profileData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[isFetching])
   const {
        register,
        handleSubmit,
        reset,
        formState: { errors,isDirty  },
    } = useForm<profileFormData>({
        resolver: zodResolver(profileFormSchema),
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: ''
        }
    });

    useEffect(() => {
        if (profileData?.data.user) {
            reset({
                name: profileData.data.user.name,
                email: profileData.data.user.email
            });
        }
    }, [profileData, reset]);
        const onSubmit = async (data: profileFormData) => {
            console.log(data)
        }
    return (
        <form className="ProfileForm" onSubmit={handleSubmit(onSubmit)}>
					{isFetching ? "Loading..." :<>

                    <Input
						fullWidth
						type="text"
                        variant="secondary"
						placeholder="Имя"
						className="ProfileForm__input"
						validationMessage={errors.name?.message}

						{...register('name')}
                        />
                    <Input
						fullWidth
						type="email"
                        variant="secondary"
						placeholder="E-mail"
						className="ProfileForm__input"
						validationMessage={errors.email?.message}
						{...register('email')}
                        />
					<Button size="medium" className="ProfileForm__btn" disabled={isFetching || !isDirty}>
						Подтвердить
					</Button>
                        </>}
				</form>
    )
}
