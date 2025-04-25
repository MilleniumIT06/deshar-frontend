import styles from './styles.module.scss';
import cn from "classnames"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from '@/shared/ui/Button';
const subscriptionItemVariants = cva(
    styles.index,
    {
        variants: {
            variant: {
                default: styles.itemPrimary,
                primary: styles.itemPrimary,
                secondary: styles.itemSecondary,
                tertiary: styles.itemTertiary
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)
export interface SubscriptionItemProps extends VariantProps<typeof subscriptionItemVariants> {
    title: string;
    subjectsCount: number;
    lessonsCount: number;
    modulesCount: number;
    price: number;
    discount?: number;
    className?: string;
}
const SubscriptionItem = ({
    title,
    lessonsCount,
    modulesCount,
    subjectsCount,
    price,
    discount,
    variant,
    className
}: SubscriptionItemProps) => {
    return (
        <li className={cn(subscriptionItemVariants({ variant, className }))}>
            <div className={styles.header}>
                <h6 className={styles.title}>{title}</h6>
            </div>
            <div className={styles.body}>
                <ul className={cn("list-reset", styles.info)}>
                    <li className={styles.infoItem}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12.6413L10.6027 15L16 10" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="8" strokeWidth="2" />
                        </svg>
                        <span>{subjectsCount} предмета</span>
                    </li>
                    <li className={styles.infoItem}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12.6413L10.6027 15L16 10" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="8" strokeWidth="2" />
                        </svg>
                        <span>{lessonsCount} занятий/мес</span>
                    </li>
                    <li className={styles.infoItem}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M8 12.6413L10.6027 15L16 10" strokeWidth="2" strokeLinecap="round"
                                strokeLinejoin="round" />
                            <circle cx="12" cy="12" r="8" strokeWidth="2" />
                        </svg>
                        <span>{modulesCount} модулей</span>
                    </li>
                </ul>
            </div>
            <div className={styles.footer}>
                <span className={styles.footerPrice}>
                    {price > 0 ? price + " ₽" : "Бесплатно"}
                </span>
                <Button variant={variant !== "primary" ? "secondary" : "primary"} size="medium" className={styles.subscriptionBtn}>
                    {price > 0 ? "Записаться" : "Попробовать"}
                </Button>
                {/* <button className={cn("btn-reset" btn btn--primary subscription__item_btn">{price > 0 ? "Записаться" : "Попробовать"}</button> */}
            </div>
            {discount && <div className={styles.discount}>
                <span>-{discount}%</span>
            </div>}
        </li>
    )
}

export { SubscriptionItem, subscriptionItemVariants }