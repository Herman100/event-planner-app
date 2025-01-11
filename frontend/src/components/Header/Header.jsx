import React from "react";
import Link from "next/link";
import styles from "./header.module.css";

export default function Header() {
  return (
    <nav className={styles.nav}>
      <Link className={styles.logo} href="/">
        Eventer
      </Link>
      <ul>
        <li className={styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/create">Create Event</Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/events">All Events</Link>
        </li>
      </ul>
    </nav>
  );
}
