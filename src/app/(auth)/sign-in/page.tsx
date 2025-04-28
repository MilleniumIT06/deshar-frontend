import { Input } from "@/shared/ui/Input";
import styles from './../../page.module.scss';
export default function SignIn() {

    return (
        <main>

            <section style={{ height: "100vh" }}>
                <div className="container">
                    <Input placeholder="Test" variant="primary" className={styles.Input} />
                    <Input placeholder="Test" variant="secondary" className={styles.Input} />
                </div>
            </section>
        </main>
    );
}
