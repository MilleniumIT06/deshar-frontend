import type { Metadata } from "next";
import { Roboto, Unbounded } from "next/font/google";
import "./../globals.scss";
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
                <Breadcrumbs />
                {children}

            </body>
        </html>
    );
}
