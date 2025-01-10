import React from "react";
import Link from "next/link";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logo}>
        <Link href="/">Eventer</Link>
      </div>
      <div className={styles.copyright}>
        &copy; {new Date().getFullYear()} Eventer. All rights reserved.
      </div>
    </footer>
  );
}
