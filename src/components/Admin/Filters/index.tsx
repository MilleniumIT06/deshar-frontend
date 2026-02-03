import { Filter, type IFilter } from './Filter'
import './styles.scss'

export interface FilterConfig extends IFilter {
	component: 'select' | 'input'
}
interface FiltersProps {
	filters: FilterConfig[]
	handleReset: () => void
}
export const Filters = ({ filters, handleReset }: FiltersProps) => {
	return (
		<div className="ClassCardClassFilters">
			<div className="ClassCardClassFilters__inner">
				<div className="ClassCardClassFilters__filters">
					{filters.map((filter, index) => {
						if (filter.component === 'input') {
							return (
								<Filter
									key={`${filter.type}-${index}`}
									type={filter.type}
									fromValue={filter.fromValue}
									onFromChange={filter.onFromChange}
									toValue={filter.toValue}
									onToChange={filter.onToChange}
								/>
							)
						}
						if (filter.component === 'select') {
							return (
								<select key={`select-test-key-${index}`}>
									<option>test1</option>
									<option>test2</option>
									<option>test3</option>
								</select>
							)
						}
					})}
				</div>
				<button className="btn-reset ClassCardClassFilters__reset" onClick={handleReset}>
					Сбросить
				</button>
			</div>
		</div>
	)
}
