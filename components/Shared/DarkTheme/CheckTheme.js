"use client";

import { useTheme } from "@/contexts/ThemeContext";
import styles from "./DarkTheme.module.css"

export default function CheckTheme() {
  const { themeg } = useTheme();

  if (themeg !== "dark") return null;

  return (
    <div className={styles.background}>
      <div className={styles.grid}></div>

      <div className={`${styles.glow} ${styles.g1}`}></div>
      <div className={`${styles.glow} ${styles.g2}`}></div>
      <div className={`${styles.glow} ${styles.g3}`}></div>
      <div className={`${styles.glow} ${styles.g4}`}></div>

      {/* نقاط نورانی */}
      <span className={`${styles.dot} ${styles.d1}`}></span>
      <span className={`${styles.dot} ${styles.d2}`}></span>
      <span className={`${styles.dot} ${styles.d3}`}></span>
      <span className={`${styles.dot} ${styles.d4}`}></span>
      <span className={`${styles.dot} ${styles.d5}`}></span>
    </div>
  );
}