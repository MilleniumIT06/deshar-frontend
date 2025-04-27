import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import styles from './../styles.module.scss';
import { ModulesContent } from "@/components/ModulesContent";
export default function Modules() {

    return (
        <main>
            <div className={styles.inner}>
            <div className="container">
            <Breadcrumbs />
            
            </div>
            <ModulesContent/>
            </div>
        </main>
    );
}
