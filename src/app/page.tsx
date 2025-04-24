import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Learn } from "@/components/Learn";
import styles from "./page.module.scss";
import { Reviews } from "@/components/Reviews";

export default function Home() {

  return (
    <main className={styles.main}>
      <Hero />
      <Info />
      <Learn />
      <Reviews />
    </main>
  );
}
