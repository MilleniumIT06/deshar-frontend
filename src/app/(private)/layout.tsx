import { Roboto, Unbounded } from "next/font/google";

import type { Metadata } from "next";
import "./../globals.scss";

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
                {children}

            </body>
        </html>
    );
}
