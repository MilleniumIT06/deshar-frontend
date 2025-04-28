import Image from 'next/image';
import cn from 'classnames';
import { cva, type VariantProps } from 'class-variance-authority';
import styles from './styles.module.scss';
import Link from 'next/link';
const subjectCardVariants = cva(
    styles.SubjectCard,
    {
        variants: {
            type: {
                default: styles.long,
                long: styles.long,
                short: styles.short
            },
        },
        defaultVariants: {
            type: "default",
        },
    }
)
export interface SubjectCardProps extends VariantProps<typeof subjectCardVariants> {
    id: number | string;
    title: string;
    imageUrl: string;
    description: string;
    modulesCount: number;
    className?: string;
}
const SubjectCard = ({
    id,
    type,
    title = "title",
    imageUrl = "subjectcardskeleton",
    description = "description",
    modulesCount = 99,
    className
}: SubjectCardProps) => {
    return (
        <li className={cn(subjectCardVariants({ type, className }))}>
            <div className={styles.SubjectCard__header}>
                <h6 className={styles.SubjectCard__title}><Link href={`/all-courses/${id}/modules`}>{title}</Link></h6>
                <span>{modulesCount} модулей</span>
            </div>
            {type === "long" && <div className={styles.SubjectCard__body}>
                <p>
                    {description}
                </p>
                <div className={styles.SubjectCard__image}>
                    <Image src={`/${imageUrl}.png`} alt="Subject alt" width={168} height={168} />
                </div>
            </div>}
        </li>
    )
}
export { SubjectCard, subjectCardVariants }