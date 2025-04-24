import styles from './styles.module.scss';
import cn from 'classnames';
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