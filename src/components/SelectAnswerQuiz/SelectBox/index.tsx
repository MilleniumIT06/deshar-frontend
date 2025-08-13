import cn from 'classnames'

import styles from './styles.module.scss';

export const SelectBox = ({ title = 'test', selected, handleSelect }: { title: string; selected: boolean; handleSelect: () => void; }) => {
    return (
        <li className={cn(styles.index, selected && styles.selected)} onClick={handleSelect}>
            {title}
        </li>
    )
}