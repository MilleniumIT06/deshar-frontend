import { Roboto, Unbounded } from "next/font/google";

import { LearningSidebar } from "@/components/LearningSidebar";
import { Breadcrumbs } from "@/shared/ui/Breadcrumbs";

import styles from './../../styles.module.scss'

import type { Metadata } from "next";

import "./../../../globals.scss";


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

export default function LearningLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${roboto.variable} ${unbounded.variable}`}>
                <div className={styles.mainWrapper}>

                    <div className="container">
                        <Breadcrumbs items={[{ label: "Главная", href: "/" }, { label: "Все дисциплины", href: "/courses" }, { label: "Английский язык", href: "/" }, { label: "Морфемика", href: "/" }]} />
                        <div className={styles.wrapper}>
                            <h1 className={styles.title}>Морфемика</h1>

                            <div className={styles.mainInner}>
                                <LearningSidebar />
                                {children}
                            </div>
                        </div>
                    </div>
                </div>


            </body>
        </html>
    );
}
