import cn from 'classnames';

import styles from './styles.module.scss';

export const SubjectsItem = ({
    title,
    text,
    anotherClass
}: {
    title: string;
    text: string;
    anotherClass?: string;
}) => {
    return (
        <li className={cn(styles.index, anotherClass)}>
            <h6>{title}</h6>
            <span>{text}</span>
        </li>
    )
}