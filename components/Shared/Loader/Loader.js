import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={styles.parent_login}>
      <span className={styles.loader}></span>
    </div>
  );
}
