import styles from "./layout.module.css";
import Sidebar from "@/components/Layout/UserSidebar";

export default function UserLayout({ children }) {
  return (
    <div className={styles.layout}>
  <Sidebar />
  <main className={styles.content}>
    {children}
  </main>
</div>
  );
}