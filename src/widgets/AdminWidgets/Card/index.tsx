'use client'
import { useState, type ReactNode } from 'react'

import './styles.scss'
import { Filter } from '@/components/Admin/Filters/Filter'
import useRole from '@/shared/hooks/admin/useRole'
import { Tabs } from '@/shared/ui/Admin/Tabs'
import { TeacherItem } from '@/shared/ui/Admin/TeacherItem'

interface Tab {
	id: number
	title: string
}

interface FilterType {
	type: 'time' | 'modules' | 'points'
	valueFrom: string
	valueTo: string
	setValueFrom: React.Dispatch<React.SetStateAction<string>>
	setValueTo: React.Dispatch<React.SetStateAction<string>>
}

interface CardProps {
	title?: string
	tabs?: Tab[]
	filters?: FilterType[]
	resetFilters: () => void
	valueFirst?: string
	valueSecond?: string
	children: ReactNode
	isParallel?: boolean
	activeTab: number
	setActiveTab: React.Dispatch<React.SetStateAction<number>>
	onClickBackButton?: () => void
	type?: 'class' | 'teachers'
	csv?: boolean
}

const FilterIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M10 7L20 7" stroke="#303030" strokeWidth="2" strokeLinecap="round" />
		<path d="M14 17H4" stroke="#303030" strokeWidth="2" strokeLinecap="round" />
		<circle cx="7" cy="7" r="3" stroke="#303030" strokeWidth="2" />
		<circle cx="17" cy="17" r="3" transform="rotate(180 17 17)" stroke="#303030" strokeWidth="2" />
	</svg>
)
const CsvIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M19 9.68868V7.31055C19 5.10141 17.2091 3.31055 15 3.31055H10.6603C6.98191 3.31055 4 6.29245 4 9.97083V10.8361V16.3105C4 18.5197 5.79086 20.3105 8 20.3105H17"
			stroke="#303030"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M4.05469 11.5489L4.69605 10.9498C5.43686 10.2579 6.41277 9.87296 7.4265 9.87296H8.31129C9.41586 9.87296 10.3113 8.97753 10.3113 7.87296V7.19597C10.3113 6.08778 10.771 5.02925 11.5809 4.2728L12.6111 3.31055"
			stroke="#303030"
			stroke-width="2"
		/>
		<path
			d="M9.72598 16.273C10.0809 16.273 10.4257 16.5143 10.4257 16.8692C10.4257 17.118 10.2565 17.3398 10.0101 17.3743C9.87308 17.3935 9.74416 17.403 9.62336 17.403C8.80545 17.403 8.14149 17.1697 7.63146 16.703C7.12455 16.2339 6.87109 15.6179 6.87109 14.8551C6.87109 14.1467 7.12766 13.5627 7.64079 13.1031C8.15393 12.6411 8.80234 12.4102 9.58604 12.4102C9.73059 12.4102 9.86954 12.4171 10.0029 12.4309C10.2533 12.457 10.4257 12.6799 10.4257 12.9317C10.4257 13.2872 10.089 13.5408 9.73369 13.5306C9.70919 13.5299 9.68485 13.5296 9.66068 13.5296C9.29371 13.5296 8.98894 13.6575 8.74636 13.9134C8.50379 14.1692 8.38251 14.495 8.38251 14.8906C8.38251 15.3171 8.50379 15.6546 8.74636 15.9034C8.99205 16.1498 9.31858 16.273 9.72598 16.273Z"
			fill="#303030"
		/>
		<path
			d="M11.6601 17.3002C11.4595 17.2477 11.3308 17.059 11.3308 16.8517C11.3308 16.4943 11.6992 16.2615 12.0478 16.3399C12.1972 16.3735 12.3345 16.3903 12.4597 16.3903C12.637 16.3903 12.7769 16.3535 12.8795 16.2801C12.9822 16.2043 13.0335 16.1048 13.0335 15.9816C13.0335 15.8868 12.9915 15.798 12.9075 15.7151C12.8267 15.6321 12.6852 15.5315 12.483 15.413C11.9948 15.1287 11.6402 14.8646 11.4194 14.6205C11.2017 14.3741 11.0929 14.1005 11.0929 13.7996C11.0929 13.3898 11.2624 13.0557 11.6014 12.7975C11.9403 12.5393 12.3788 12.4102 12.9169 12.4102C13.2029 12.4102 13.4874 12.4438 13.7702 12.5111C13.9705 12.5587 14.1017 12.7445 14.1017 12.9504C14.1017 13.2917 13.7546 13.5154 13.4206 13.4449C13.2951 13.4184 13.1816 13.4052 13.0801 13.4052C12.906 13.4052 12.7676 13.4383 12.6649 13.5047C12.5654 13.5686 12.5157 13.6575 12.5157 13.7712C12.5157 13.9702 12.7505 14.1941 13.2201 14.4428C13.5 14.5897 13.783 14.797 14.0691 15.0647C14.3583 15.3301 14.5029 15.6381 14.5029 15.9887C14.5029 16.3985 14.3148 16.7385 13.9385 17.0086C13.5622 17.2763 13.0848 17.4102 12.5063 17.4102C12.2227 17.4102 11.9406 17.3735 11.6601 17.3002Z"
			fill="#303030"
		/>
		<path
			d="M15.0254 13.4709C14.8469 13.026 15.1745 12.5416 15.6539 12.5416C15.9379 12.5416 16.1917 12.7188 16.2896 12.9854L16.8963 14.6383C17.041 15.0486 17.14 15.3997 17.1932 15.6917C17.1942 15.697 17.1988 15.7008 17.2042 15.7008C17.2096 15.7008 17.2142 15.6969 17.2152 15.6916C17.2614 15.4375 17.3122 15.2286 17.3675 15.0647L18.0663 13.0105C18.1617 12.7301 18.425 12.5416 18.7211 12.5416C19.2089 12.5416 19.5434 13.0331 19.3645 13.4869L18.1078 16.6741C17.9623 17.0432 17.6059 17.2858 17.2091 17.2858C16.8145 17.2858 16.4595 17.0457 16.3125 16.6794L15.0254 13.4709Z"
			fill="#303030"
		/>
	</svg>
)
export const Card = ({
	title = 'Название класса',
	resetFilters,
	filters = [],
	tabs = [],
	valueFirst,
	valueSecond,
	children,
	onClickBackButton,
	activeTab,
	setActiveTab,
	isParallel,
	type,
	csv,
}: CardProps) => {
	const [showFilters, setShowFilters] = useState(false)
	const { hasRole } = useRole()
	const hasFilters = filters.length > 0
	const shouldShowFilters = showFilters && hasFilters
	// console.log("isParallel:", isParallel);
	return (
		<div className="Card">
			<div className="Card__inner">
				<div className="Card__header">
					<div className="Card__header-top">
						<div className="Card__header-top_title-wrapper">
							{onClickBackButton && (
								<button className="btn-reset Card__back" onClick={onClickBackButton}>
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg">
										<path
											d="M18.9497 12.9492C19.502 12.9492 19.9497 12.5015 19.9497 11.9492C19.9497 11.3969 19.502 10.9492 18.9497 10.9492L18.9497 12.9492ZM4.2426 11.2421C3.85208 11.6326 3.85208 12.2658 4.2426 12.6563L10.6066 19.0203C10.9971 19.4108 11.6302 19.4108 12.0208 19.0203C12.4113 18.6298 12.4113 17.9966 12.0208 17.6061L6.36392 11.9492L12.0208 6.29236C12.4113 5.90184 12.4113 5.26867 12.0208 4.87815C11.6303 4.48763 10.9971 4.48763 10.6066 4.87815L4.2426 11.2421ZM18.9497 10.9492L4.94971 10.9492L4.94971 12.9492L18.9497 12.9492L18.9497 10.9492Z"
											fill="#303030"
										/>
									</svg>
								</button>
							)}
							<h2 className="Card__title">{title}</h2>
						</div>
						{(type === 'class' && hasRole(['vicePrincipal', 'department', 'ministry', 'admin'])) ||
						isParallel ? (
							<TeacherItem name="Татриева Зарема" />
						) : null}
					</div>

					<div className="Card__controls">
						{tabs.length > 0 && <Tabs activeTab={activeTab} handleTab={setActiveTab} tabs={tabs} />}
						<div className="Card__controls-spacer">
							{csv && (
								<button className="btn-reset Card__controls-csv">
									<CsvIcon />
								</button>
							)}
							{hasFilters && (
								<button
									className={`btn-reset Card__filters-show ${showFilters ? 'Card__filters-show--active' : ''}`}
									onClick={() => setShowFilters(prev => !prev)}
									aria-label={showFilters ? 'Скрыть фильтры' : 'Показать фильтры'}
									aria-expanded={showFilters}>
									<FilterIcon />
								</button>
							)}
						</div>
					</div>

					{shouldShowFilters && (
						<div className="Card__filters">
							<div className="Card__filters-inner">
								<div className="Card__filters-list">
									{filters.map((filter, index) => (
										<Filter
											key={`${filter.type}-${index}`}
											type={filter.type}
											fromValue={filter.valueFrom}
											onFromChange={filter.setValueFrom}
											toValue={filter.valueTo}
											onToChange={filter.setValueTo}
										/>
									))}
								</div>
								<button className="btn-reset Card__filters-reset" onClick={resetFilters}>
									Сбросить
								</button>
							</div>
						</div>
					)}
				</div>

				<div className="Card__content">{children}</div>

				<div className="Card__footer">
					<div className="Card__footer-inner">
						<span className="Card__value-first">{valueFirst}</span>
						<span className="Card__value-second">{valueSecond}</span>
					</div>
				</div>
			</div>
		</div>
	)
}
