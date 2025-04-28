import { SignUpForm } from "@/features/SignUp/ui/SignUpForm";
import styles from './../../page.module.scss';
export default function SignUp() {

    return (
        <main className={styles.index}>
            <div className="container">
                <div className={styles.inner}>

                    <SignUpForm />
                </div>
            </div>
        </main>
    );
}
