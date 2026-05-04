type Id = number
export interface District {
	id: Id
	name: string
	region_id: number
	created_at: null
	deleted_at: null
	updated_at: null
}
export interface Country {
	id: Id
	name: string
	created_at: null
	deleted_at: null
	updated_at: null
}
export interface Role {
	id: Id
	name: 'Admin' | 'Superadmin'
	created_at: null
	deleted_at: null
	updated_at: null
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
