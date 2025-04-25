import { Hero, Info, Learn, Reviews, Subscription, Question } from "@/components";
import styles from "./page.module.scss";
import { Footer } from "@/widgets/Footer";


export default function Home() {

  return (
    <main className={styles.main}>
      <Hero />
      <Info />
      <Learn />
      <Reviews />
      <Subscription />
      <Question />
      <Footer />
    </main>
  );
}
