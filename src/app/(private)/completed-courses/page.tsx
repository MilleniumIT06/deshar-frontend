import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import { CompletedCourses } from '@/components/CompletedCourses';
import styles from './../styles.module.scss';
import { ChevronRight } from "lucide-react";
export default function Completed() {

    return (
        <main>
            <div className="container">
            <div className={styles.inner}>
            <Breadcrumbs items={[{label:'Главная',href:'/'},{label:'Выполненные дисциплины',href:'/completed-courses'}]} separator={<ChevronRight size={20}/>}/>
            <CompletedCourses/>
            </div>
            </div>
        </main>
    );
}
