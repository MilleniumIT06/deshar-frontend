import { type RoleName, type User } from './user.types'

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
	school_id: Id
	// region_id: number
}
export interface Country {
	id: Id
	name: string
}
export interface Role {
	id: Id
	name: RoleName
}

interface IUserResponse extends User {
	points: number
}
export interface IAuthResponse {
	success: boolean
	message: string
	user: IUserResponse
	token: string
}
