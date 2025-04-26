import cn from 'classnames';
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import styles from './styles.module.scss';
import { CompletedCourses } from '@/components/CompletedCourses';
export default function Completed() {

    return (
        <main>
            <div className={cn("container",styles.completedContainer)}>
            <Breadcrumbs />
            <CompletedCourses/>
            </div>
        </main>
    );
}
