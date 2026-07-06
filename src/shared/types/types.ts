import { User } from "./user.types"

export type Id = number
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
interface IUserResponse extends User{
	points: number
}
export interface IAuthResponse {
	success: boolean
	message: string
	user: IUserResponse
	token: string
}
