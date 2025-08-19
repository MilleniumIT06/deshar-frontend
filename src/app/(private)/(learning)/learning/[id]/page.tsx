

import styles from './../../../styles.module.scss'
import { LearningContent } from '@/components/LearningContent';


export default async function Learning() {


    return (
        <main className={styles.main}>
            <div className="container">

                <LearningContent />



            </div>
        </main>
    );
}
