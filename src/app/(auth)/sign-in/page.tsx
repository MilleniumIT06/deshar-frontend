import cn from 'classnames'
import styles from './../../page.module.scss';
import { SignInForm } from "@/features/auth/SignIn/ui/SignInForm";
export default function SignIn() {
    return (
        <main>
            <section className={cn(styles.index,styles.signIn)}>
                <div className="container">
                    <div className={styles.inner}>
                        <SignInForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
