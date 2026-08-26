import ContentPage from "./ContentPage";
import styles from "../components/NotFound.module.css";

export default function NotFoundPage() {
  return <ContentPage title="Page not found — Fior.in" description="The requested Fior.in page could not be found." canonical="https://fior.in/404">
    <main className={styles.page}><h2 className={styles.title}>Page not found</h2><p>This page wandered off into another dimension.</p><a className={styles.link} href="/">Return to Fior.in</a></main>
  </ContentPage>;
}
