import styles from "./AdminLoader.module.css"
export default function AdminLoader () {
  return (
    <div className={styles.container}>
      <span>در حال بارگذاری</span>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
}