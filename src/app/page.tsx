import { Hero } from "@/components/Hero";
import styles from "./page.module.scss";
import { Info } from "@/components/Info";

export default function Home() {

  return (
    <main className={styles.main}>
      <Hero />
      <Info />
    </main>
  );
}
