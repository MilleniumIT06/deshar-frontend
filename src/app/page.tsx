import { Button } from "@/shared/ui/Button";
import styles from "./page.module.scss";

export default function Home() {
  console.log("dasds");
  return (
    <div className={styles.page}>
      TEst
      <Button type="primary">
        Test
      </Button>
      <Button type="secondary">
        Test
      </Button>
    </div>
  );
}
