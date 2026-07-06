'use client';
import { useAppDispatch, useAppSelector } from '@/app/_store/hooks'

import './styles.scss';
import { nextStep, updateFormData } from '../signUp.slice';

import type { UserType } from '@/shared/types/user.types';

export const SelectRoleForm = () => {
const { formData } = useAppSelector(state => state.signUpFormReducer)
const dispatch = useAppDispatch()

const handeRoleSelection = (role: UserType) => {
dispatch(
                updateFormData({
                  ...formData,
                  user_type: role,
                }),
            )
            dispatch(nextStep())
}
    return (
        <div className="SelectRoleForm">
            <div className="SelectRoleForm__inner">
                <h1 className="SelectRoleForm__title">Выберите роль</h1>
				<div className="SelectRoleForm__roles">
                    <div className="SelectRoleForm__role" onClick={() => handeRoleSelection('student')}>
                        <div className="SelectRoleForm__role_image">
<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.5 5H13C15.2091 5 17 6.79086 17 9V13C17 15.2091 15.2091 17 13 17H7C4.79086 17 3 15.2091 3 13V9C3 6.79086 4.79086 5 7 5H12.5Z" stroke="#303030" strokeWidth="1.5" />
  <path d="M3 9H17" stroke="#303030" strokeWidth="1.5" />
  <path d="M7 5V4C7 2.89543 7.89543 2 9 2H11C12.1046 2 13 2.89543 13 4V5" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M6.25 11V11.75H7.75V11H6.25ZM6.25 9V11H7.75V9H6.25Z" fill="#303030" />
  <path d="M12.25 11V11.75H13.75V11H12.25ZM12.25 9V11H13.75V9H12.25Z" fill="#303030" />
</svg>
                        </div>
                        <span>Ученик</span>
                    </div>
                    <div className="SelectRoleForm__role" onClick={() => handeRoleSelection('teacher')}>
                        <div className="SelectRoleForm__role_image">
<svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 4H14C15.6569 4 17 5.34315 17 7V11C17 12.6569 15.6569 14 14 14H10" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" />
  <circle cx="5" cy="5" r="2" fill="#303030" />
  <path d="M6.56362 9H5C3.89543 9 3 9.89543 3 11V15C3 16.1046 3.89543 17 5 17H5.44444C6.54901 17 7.44444 16.1046 7.44444 15V11.8843C7.44444 11.3793 7.82091 10.9536 8.32208 10.8918L9.31262 10.7697C10.1062 10.6718 10.3765 9.65736 9.73685 9.17764C9.58311 9.06233 9.39612 9 9.20394 9H6.56362Z" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" />
  <path d="M14 7L12 9" stroke="#303030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
</svg>
                        </div>
                         <span>Учитель</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
