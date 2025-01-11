import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.landingPage}>
        <h1>Welcome to the Event Planner App!</h1>
        <p>
          Looking to up your event planning game? Eventer is the best solution
          out there. It less tahn a minute to get started!
        </p>
        <Image
          src="/eventplan.jpg"
          alt="Event Planner"
          width={700}
          height={400}
          className={styles.image}
        />
        <div className={styles.cta}>
          <Link href="/create">
            <button className={styles.button}>Create Event</button>
          </Link>
          <Link href="/events">
            <button className={styles.button}>View Events</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
