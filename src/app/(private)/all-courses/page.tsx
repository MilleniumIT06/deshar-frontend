
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { AllCourses } from "@/components/AllCourses";
import styles from './../styles.module.scss';
export default function AllCoursesPage() {

    return (
        <main>
            <div className="container">
            <div className={styles.inner}>
            <Breadcrumbs />
            </div>
            </div>
            <AllCourses/>
        </main>
    );
}
