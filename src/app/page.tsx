import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Learn } from "@/components/Learn";
import styles from "./page.module.scss";
import { Reviews } from "@/components/Reviews";
import { Subscription } from "@/components/Subcription";

export default function Home() {

  return (
    <main className={styles.main}>
      <Hero />
      <Info />
      <Learn />
      <Reviews />
      <Subscription />
    </main>
  );
}
