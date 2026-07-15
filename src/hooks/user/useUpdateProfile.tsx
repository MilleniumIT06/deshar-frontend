import { useMutation, useQueryClient } from '@tanstack/react-query';

import { userService } from '@/services/user.service';

import type { UpdateUser } from '@/shared/types/user.types';

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    const {
        mutate: updateProfile,
        isPending,
        isSuccess,
        isError
    } = useMutation({
        mutationKey: ['update profile'],
        mutationFn: (data: UpdateUser) => userService.updateProfile(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['profile']
            });
        },

        onError: (error) => {

            alert('Ошибка при обновлении профиля');
        }
    });

    return {
        updateProfile,
        isPending,
        isSuccess,
        isError
    };
}
