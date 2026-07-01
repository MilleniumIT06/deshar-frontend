export type Id = number
export type UserType = 'student' | 'teacher' | 'parent' | 'admin'
export interface District {
	id: Id
	name: string
	// region_id: number
}
export interface Locality {
	id: Id
	name: string
	// region_id: number
}
export interface SchoolClass {
	id: Id
	name: string
	// region_id: number
}
export interface Country {
	id: Id
	name: string
}
export interface Role {
	id: Id
	name: string
}

export interface TrainerCommonProps {
	currentTrainerIndex: number
	title: string
	subTitle?: string
	onSuccess: () => void
	onError: () => void
	changeStatus: (status: 'idle' | 'error' | 'success') => void
}
// {subTitle && <h2 className="trainer__subtitle">{subTitle}</h2>}

export type TrainerTheme = 'towers' | 'ocean' | 'forest' | 's' | 'o' | 'default'
interface IUserResponse {
	id: number
	name: string
	email: string
	avatar: string
	user_type: string
	level: number
	points: number
}
export interface IAuthResponse {
	success: boolean
	message: string
	user: IUserResponse
	token: string
}
