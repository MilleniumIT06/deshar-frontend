import { Id } from "./types";
export type RoleName =
'Супер-админ' |
'Админ' |
'Модератор' |
'Представитель министерства' |
'Пр. Управления образования' |
'Представитель школы' |
'Директор школы'|
'Учитель'|
'Ученик'|
 null

export type UserType = 'student' | 'teacher' | 'parent' | 'admin'|'department'|'ministry'|'vicePrincipal'|'principal'|'manager'
export interface UserProfileResponse {
	data: ProfileData;
}

export interface ProfileData {
	user: User;
	stats: UserStats;
	metrics: UserMetrics;
	recent_achievements: any[];
}

export interface User {
	id: Id;
	name: string;
	email: string;
	avatar: string;
	user_type: UserType;
	level: number;
	level_name: string;
	level_color: string;
	level_progress: number;
	xp: number;
	xp_to_next_level: number;
	current_streak: number;
	max_streak: number;
	is_online: boolean;
	is_active: boolean;
	is_banned: boolean;
	last_activity: string;
	last_login_at: string;
	location: any[];
	preferences: any;
	settings:any;
	created_at: string;
	updated_at: string;
	role: {
				id:Id;
				name: RoleName;
				slug: string|null
			}
}
export interface UpdateUser extends Pick<User,"name"|"email"> {}
export interface StatItem {
	completed: number;
	total: number;
	percentage: number;
}

export interface UserStats {
	modules: StatItem;
	pieces: StatItem;
	lessons: StatItem;
	tasks: StatItem;
	overall: {
		completion_rate: number;
		total_xp: number;
		rank: number;
	};
}

export interface UserMetrics {
	total_modules: number;
	total_pieces: number;
	total_lessons: number;
	total_tasks: number;
	completed_modules: number;
	completed_pieces: number;
	completed_lessons: number;
	completed_tasks: number;
	completion_rate: number;
	total_xp_earned: number;
	average_score: number;
	total_time_spent: number;
}

// export interface Achievement {
// 	id: number;
// 	title: string;
// 	description: string;
// 	icon: string;
// 	unlocked_at: string;
// }
