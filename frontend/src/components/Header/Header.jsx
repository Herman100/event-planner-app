"use client";
import React from "react";
import Link from "next/link";
import styles from "./header.module.css";
import { usePathname } from "next/navigation";

export default function Header() {
  const currentURL = usePathname();

  return (
    <nav className={styles.nav}>
      <Link className={styles.logo} href="/">
        Eventer
      </Link>
      <ul>
        <li className={currentURL === "/" ? styles.active : styles.navItem}>
          <Link href="/">Home</Link>
        </li>
        <li
          className={currentURL === "/create" ? styles.active : styles.navItem}
        >
          <Link href="/create">Create Event</Link>
        </li>
        <li
          className={currentURL === "/events" ? styles.active : styles.navItem}
        >
          <Link href="/events">All Events</Link>
        </li>
      </ul>
    </nav>
  );
}
