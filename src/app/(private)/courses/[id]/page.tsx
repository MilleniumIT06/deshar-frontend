import { Breadcrumbs } from '@/shared/ui/Breadcrumbs';

import styles from './../../styles.module.scss';

export default async function OneCourse() {
    return <main>
        <div className={styles.inner}>
            <div className="container">
                <Breadcrumbs items={[{ label: "test", href: "test" }]} />
            </div>
        </div>
     
    </main>
}