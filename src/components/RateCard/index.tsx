import { cva, type VariantProps } from "class-variance-authority"
import cn from "classnames"

import { Button } from '@/shared/ui/Button'


import styles from './styles.module.scss'


const CHECK_ICON = (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M8 12.6413L10.6027 15L16 10"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <circle cx="12" cy="12" r="8" strokeWidth="2" />
    </svg>
)

const RateCardVariants = cva(styles.index, {
    variants: {
        variant: {
            default: styles.itemPrimary,
            free: styles.itemPrimary,
            standart: styles.itemSecondary,
            premium: styles.itemTertiary
        },
    },
    defaultVariants: {
        variant: "default",
    },
})

export interface RateCardProps extends VariantProps<typeof RateCardVariants> {
    title: string;
    price: number;
    discount?: number;
    className?: string;
    onSelect?: () => void;
    info: { id: number; content: string; }[]
}

const RateCard = ({
    title,
    price,
    discount,
    variant,
    className,
    onSelect,
    info = [{ id: 1, content: "test" }]
}: RateCardProps) => {

    const formattedPrice = price > 0
        ? new Intl.NumberFormat('ru-RU').format(price) + ' ₽'
        : 'Бесплатно'


    const buttonText = price > 0 ? "Записаться" : "Попробовать"

    return (
        <li className={cn(RateCardVariants({ variant, className }))}>
            <div className={styles.header}>
                <h6 className={styles.title}>{title}</h6>
            </div>

            <div className={styles.body}>
                <ul className={cn("list-reset", styles.info)}>
                    {info.map((item) => (
                        <li key={item.id} className={styles.infoItem}>
                            {CHECK_ICON}
                            <span>{item.content}</span>
                        </li>
                    ))}
                </ul>
            </div>

            <div className={styles.footer}>
                <span className={styles.footerPrice}>
                    {formattedPrice}
                </span>
                <Button
                    variant={variant !== "free" ? "secondary" : "primary"}
                    size="medium"
                    className={styles.subscriptionBtn}
                    onClick={onSelect}
                >
                    {buttonText}
                </Button>
            </div>

            {discount && (
                <div className={styles.discount}>
                    <span>-{discount}%</span>
                </div>
            )}
        </li>
    )
}

export { RateCard, RateCardVariants }