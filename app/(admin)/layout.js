import styles from "./layout.module.css";
import Sidebar from "@/components/Layout/AdminSidebar"
export default function AdminLayout({children}) {
  return (
    <>
      <div className={styles.admin_layout}>
        <div className={styles.sidebar_container}>
          <Sidebar />
        </div>
        <div className={styles.content_container}>{children} </div>
      </div>
    </>
  );
}
