import { Roboto, Unbounded } from "next/font/google";



import type { Metadata } from "next";

import "./../globals.scss";
import styles from './styles.module.scss';
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";

const roboto = Roboto({
    variable: "--font-roboto-sans",
    subsets: ["latin"],
});
const unbounded = Unbounded({
    variable: "--font-unbounded-sans",
    subsets: ["latin"],
});
export const metadata: Metadata = {
    title: "Profile",
    description: "Profile",
};

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.variable} ${unbounded.variable}`}>
                <div className={styles.inner}>

                    <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Все дисциплины", href: "/courses" }, { label: "Английский язык", href: "/" }, { label: "Морфемика", href: "/" }]} />
                    <div className={styles.wrapper}>
                        <h1 className={styles.title}>Морфемика</h1>
                        {children}
                    </div>
                </div>
            </body>
        </html>
    );
}
