import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";
import styles from './../../../styles.module.scss';
import { ModulesContent } from "@/components/ModulesContent";
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
                    <Breadcrumbs />

                </div>
                {id}
                <ModulesContent />
            </div>
        </main>
    );
}
