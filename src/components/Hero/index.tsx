import Image from "next/image"
import cn from 'classnames';
import styles from './styles.module.scss';
import { Button } from "@/shared/ui/Button";
export const Hero = () => {
    return (
        <section className={styles.index}>
            <div className={cn("container", styles.heroContainer)}>
                <div className={styles.inner}>
                    <div className={styles.info}>
                        <h1 className={styles.title}>
                            Учимся онлайн в&nbsp;пару кликов
                        </h1>
                        <p>
                            Бесплатные вводые уроки на&nbsp;первые 14&nbsp;учебных дней
                        </p>
                        <Button variant="secondary" className={styles.heroBtn}>
                            Записаться
                        </Button>
                    </div>
                    <div className={styles.image}>
                        <Image src="/hero_image.png" alt="Hero image" width={481} height={485} />
                    </div>
                </div>
            </div>
        </section>

    )
}