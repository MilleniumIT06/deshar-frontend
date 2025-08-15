import { CompletedCourses } from '@/components/CompletedCourses';
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";

import styles from './../styles.module.scss';

export default function Completed() {

    return (
        <main>
            <div className="container">
                <div className={styles.inner}>
                    <Breadcrumbs items={[{ label: 'Главная', href: '/' }, { label: 'Выполненные дисциплины', href: '/completed-courses' }]} />
                    <CompletedCourses />
                </div>
            </div>
        </main>
    );
}
