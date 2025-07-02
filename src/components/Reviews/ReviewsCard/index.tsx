import cn from 'classnames';

import styles from './styles.module.scss';

const StarIcon = () => (
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.0781 4.72363C11.3635 5.22996 11.8551 5.58717 12.4248 5.70215L16.5732 6.53906L13.709 9.65527C13.3158 10.0831 13.1286 10.661 13.1953 11.2383L13.6807 15.4424L9.83203 13.6816C9.30355 13.4398 8.69645 13.4398 8.16797 13.6816L4.31934 15.4424L4.80469 11.2383C4.8714 10.661 4.6842 10.0831 4.29102 9.65527L1.42676 6.53906L5.5752 5.70215C6.14493 5.58717 6.63648 5.22997 6.92188 4.72363L9 1.03613L11.0781 4.72363Z" stroke="#1BAA7D" stroke-width="2" />
    </svg>
)
const StarIconFilled = () => (
    <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8.12885 0.545576C8.51136 -0.133069 9.48864 -0.13307 9.87115 0.545575L11.9493 4.2326C12.092 4.48578 12.3378 4.66435 12.6227 4.72183L16.7714 5.55893C17.5351 5.713 17.8371 6.64245 17.3098 7.21595L14.4455 10.3318C14.2488 10.5457 14.1549 10.8346 14.1883 11.1233L14.6742 15.3277C14.7636 16.1016 13.973 16.676 13.2646 16.3518L9.41616 14.5905C9.1519 14.4695 8.8481 14.4695 8.58384 14.5905L4.73539 16.3518C4.02703 16.676 3.2364 16.1016 3.32584 15.3277L3.81175 11.1233C3.84512 10.8346 3.75124 10.5457 3.55455 10.3318L0.690164 7.21595C0.162938 6.64245 0.464932 5.713 1.22856 5.55893L5.37732 4.72183C5.6622 4.66435 5.90799 4.48578 6.05069 4.2326L8.12885 0.545576Z"
            fill="#1BAA7D"
        />
    </svg>
);


interface ReviewsCardProps {
    id: string | number;
    name: string;
    rating: number;
    text: string;
    subject: string;
    className?: string;
}

export const ReviewsCard = ({
    id,
    name = "Зарина М.",
    rating = 3,
    text = "Очень полезные курсы. Все нравится, особенно методика преподавания. Хочу также на другие курсы",
    subject = "Ингушский язык, 7 класс",
    className
}: ReviewsCardProps) => {

    const stars = Array.from({ length: 5 }, (_, index) => (
        <li key={`${id}-star-${index}`} className={styles.slideStar}>
            {index < rating ? <StarIconFilled /> : <StarIcon />}
        </li>
    ));

    return (
        <div className={cn(styles.reviewsCard, className)}>
            <div className={styles.reviewsCard__header}>
                <h6 className={styles.reviewsCard__name}>
                    {name}
                </h6>

                <ul className={cn("list-reset", styles.reviewsCard__stars)}>
                    {stars}
                </ul>
            </div>

            <div className={styles.reviewsCard__body}>
                <p>{text}</p>
            </div>

            <div className={styles.reviewsCard__footer}>
                <span className={styles.reviewsCard__subject}>{subject}</span>
            </div>
        </div>
    )
}