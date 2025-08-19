import { LearningMain } from '@/components/LearningMain';
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";

import styles from './../../../styles.module.scss';


export default async function Learning() {


    return (
        <main className={styles.main}>
            <div className="container">
                <div className={styles.inner}>

                    <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Все дисциплины", href: "/courses" }, { label: "Английский язык", href: "/" }, { label: "Морфемика", href: "/" }]} />
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>Морфемика</h1>
                        <LearningMain />

                    </div>
                </div>


            </div>
        </main>
    );
}
