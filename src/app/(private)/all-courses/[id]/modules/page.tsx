import { ModulesContent } from "@/components/ModulesContent";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";

import styles from './../../../styles.module.scss';

export default async function Modules({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return (
        <main>
            <div className={styles.inner}>
                <div className="container">
                    <Breadcrumbs items={[{ label: "test", href: "test" }]} />

                </div>
                {id}
                <ModulesContent />
            </div>
        </main>
    );
}
