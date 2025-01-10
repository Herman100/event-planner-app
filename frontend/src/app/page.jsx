import Image from "next/image";
import styles from "./page.module.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";

export default function Home() {
  return (
    <div>
      <Header />
      <h1>Event Planner </h1>
      <p>Plan your events with ease</p>
      <Footer />
    </div>
  );
}
