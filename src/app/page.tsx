import { Hero, Info, Learn, Reviews, Subscription, Question } from "@/components";
import styles from "./page.module.scss";

export default function Home() {

  return (
    <main className={styles.main}>
      <Hero />
      <Info />
      <Learn />
      <Reviews />
      <Subscription />
      <Question />

    </main>
  );
}
