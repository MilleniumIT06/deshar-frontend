import { Button } from "@/shared/ui/Button";
import styles from "./page.module.scss";
import { Logo } from "@/shared/ui/Logo";

export default function Home() {
  console.log("dasds");
  <svg width="12" height="18" viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L10 9L1 17" stroke="white" strokeWidth="2" />
  </svg>
  return (
    <div className={styles.page}>
      TEst
      <Button size="big" variant="primary">Test</Button>
      <Button size="big" variant="secondary">Test</Button>
      <Button size="medium" variant="primary">Test</Button>
      <Button size="medium" variant="secondary">Test</Button>
      <Button size="small" variant="primary">Test</Button>
      <Button size="small" variant="secondary">Test</Button>
      <Button size="iconSmall" variant="iconPrimary">
        <svg viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L10 9L1 17" strokeWidth="2" />
        </svg>
      </Button>
      <Button size="iconBig" variant="iconSecondary">
        <svg viewBox="0 0 12 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1L10 9L1 17" strokeWidth="2" />
        </svg>
      </Button>
      <Logo />
      <Logo size="small" />
    </div>
  );
}
