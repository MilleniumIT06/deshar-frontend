
import { AllCourses } from "@/components/AllCourses";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";

import styles from './../styles.module.scss';

export default function AllCoursesPage() {

    return (
        <main>
            <div className={styles.inner}>
            <div className="container">
            <Breadcrumbs />
            </div>
            </div>
            <AllCourses/>
        </main>
    );
}
