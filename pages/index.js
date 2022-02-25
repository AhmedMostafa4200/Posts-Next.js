import Head from "next/head";
import Link from "next/link";

import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Efreshli Task</title>
        <meta name="description" content="Efreshli task using Next.js!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome!</h1>

        <p className={styles.description}>
          Click on the next Card to Preview the App.
        </p>

        <div className={styles.grid}>
          <Link href="/posts">
            <a className={styles.card}>
              <h2>Efreshli</h2>

              <p>Find in-depth information about Next.js App for Efreshli.</p>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
}
