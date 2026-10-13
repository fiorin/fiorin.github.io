import ContentPage from "./ContentPage";
import styles from "../components/NotFound.module.css";
import { routeMeta } from "../data/meta";

export default function NotFoundPage() {
  return <ContentPage {...routeMeta["/404"]}>
    <main className={styles.page}><h1 className={styles.title}>Page not found</h1><p>This page wandered off into another dimension.</p><a className={styles.link} href="/">Return to Fior.in</a></main>
  </ContentPage>;
}
