import { ModulesContent } from "@/components/ModulesContent";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";

import styles from './../../../styles.module.scss';

export default async function Modules() {
    return (
        <main>
            <div className={styles.inner}>
                <div className="container">
                    <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Все дисциплины", href: "/courses" }, { label: "Английский язык", href: "/" }]} />

                </div>
                <ModulesContent />
            </div>
        </main>
    );
}
