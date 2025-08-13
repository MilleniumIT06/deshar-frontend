import cn from 'classnames';

import styles from './styles.module.scss'

const IncreaseIcon = () => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg">
		<path
			d="M6.29289 16.1924C5.90237 16.5829 5.90237 17.2161 6.29289 17.6066C6.68342 17.9971 7.31658 17.9971 7.70711 17.6066L6.29289 16.1924ZM17.8995 6.99998C17.8995 6.4477 17.4518 5.99998 16.8995 5.99998L7.89949 5.99998C7.34721 5.99998 6.89949 6.4477 6.89949 6.99998C6.89949 7.55227 7.34721 7.99998 7.89949 7.99998L15.8995 7.99998L15.8995 16C15.8995 16.5523 16.3472 17 16.8995 17C17.4518 17 17.8995 16.5523 17.8995 16L17.8995 6.99998ZM7.70711 17.6066L17.6066 7.70709L16.1924 6.29287L6.29289 16.1924L7.70711 17.6066Z"
            fill="currentColor"
		/>
	</svg>
)
const DecreaseIcon = () => (
	<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M7.70698 6.29289C7.31646 5.90237 6.6833 5.90237 6.29277 6.29289C5.90225 6.68342 5.90225 7.31658 6.29277 7.70711L7.70698 6.29289ZM16.8994 17.8995C17.4517 17.8995 17.8994 17.4518 17.8994 16.8995L17.8994 7.89949C17.8994 7.34721 17.4517 6.89949 16.8994 6.89949C16.3471 6.89949 15.8994 7.34721 15.8994 7.89949L15.8994 15.8995L7.89937 15.8995C7.34709 15.8995 6.89937 16.3472 6.89937 16.8995C6.89937 17.4518 7.34709 17.8995 7.89937 17.8995L16.8994 17.8995ZM6.29277 7.70711L16.1923 17.6066L17.6065 16.1924L7.70698 6.29289L6.29277 7.70711Z" 
  fill="currentColor"/>
</svg>
)
export const ResultsCard = ({
    id=111,
    percent=5,
    period=7,
    points=99,
    title='test',
    type="decrease",
    value=144,
}:{
    id:number|string;
    title:string;
    points:number;
    percent:number;
    type:"increase"|"decrease";
    period:string|number;
    value:string|number;
}) => {
	return (
		<div className={styles.index} key={id}>
			<h6 className={styles.index__title}>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M8 12.6413L10.6027 15L16 10"
						stroke="#303030"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<circle cx="12" cy="12" r="8" stroke="#303030" strokeWidth="2" />
				</svg>
				{title}
			</h6>
			<div className={styles.index__info}>
				<span className={styles.index__points}>{points}</span>
				<div className={cn(styles.index__percent,type==="increase"?styles.increase:styles.decrease)}>
					{type==="increase"?<IncreaseIcon/>:<DecreaseIcon/>}
					<span>{type==="increase"?`+${percent}%`:`-${percent}%`}</span>
				</div>
			</div>
			<div className={styles.index__summary}>
				<span className={styles.index__summary_value}>{value}</span>
				<span className={styles.index__summary_period}>в прошлые {period} дней</span>
			</div>
		</div>
	)
}
