
import styles from './../../styles.module.scss'
import { AttestationContent } from "@/components/AttestationContent";



export default async function Learning() {


    return (
        <main className={styles.main}>
            <div className="container">
                <div className={styles.inner}>

                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>Морфемика</h1>
                        <AttestationContent />

                    </div>
                </div>


            </div>
        </main>
    );
}
