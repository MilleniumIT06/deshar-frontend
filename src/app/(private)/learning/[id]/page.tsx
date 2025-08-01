import { LearningMain } from '@/components/LearningMain';
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";

import styles from './../../styles.module.scss';


export default async function Learning({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params;

    console.log(id);
    return (
        <main className={styles.main}>
            <div className="container">
                <div className={styles.inner}>

                    <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Все дисциплины", href: "/courses" }, { label: "Английский язык", href: "/" }, { label: "Морфемика", href: "/" }]} />
                    <div className={styles.wrapper}>
                        <LearningMain />

                    </div>
                </div>


            </div>
        </main>
    );
}
