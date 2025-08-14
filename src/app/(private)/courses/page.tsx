
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { AllCourses } from "@/widgets/AllCourses";

import styles from './../styles.module.scss';

export default function AllCoursesPage() {

    return (
        <main>
            <div className={styles.inner}>
                <div className="container">
                    <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Все дисциплины", href: "/courses" }]} />
                </div>
            </div>
            <AllCourses />
        </main>
    );
}
