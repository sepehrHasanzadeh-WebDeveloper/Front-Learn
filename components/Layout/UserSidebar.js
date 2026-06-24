"use client";

import styles from "./UserSidebar.module.css";
import Link from "next/link";
import { MdDashboard, MdLogout } from "react-icons/md";
import { FaComment } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Swal from "sweetalert2";
import { useState } from "react";
import Image from "next/image";

export default function UserSidebar() {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  const { logout } = useAuth();

  const LogoutHandler = () => {
    Swal.fire({
      title: "آیا قصد خروج دارید؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "بله",
      cancelButtonText: "خیر",
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  const isActive = (href) =>
    pathname === href ? `${styles.link} ${styles.active}` : styles.link;

  return (
    <>
      <div>
        <button
          className={`${styles.mobileMenuBtn} ${open ? styles.hide : ""}`}
          onClick={() => setOpen(true)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className={styles.overlay} onClick={() => setOpen(false)} />
      )}

      <aside className={`${styles.sidebar} ${open ? styles.open : ""}`}>
        <button className={styles.closeBtn} onClick={() => setOpen(false)}>
          ✕
        </button>
        <div className={styles.logo}>
          <Link style={{ color: "white " }} href={"/"}>
            <h3>FrontLearn</h3>
          </Link>
          <span>پنل کاربری</span>
        </div>

        <nav className={styles.nav}>
          <Link href="/profile" className={isActive("/profile")}>
            <MdDashboard size={20} />
            داشبورد
          </Link>

          <Link
            href="/profile/courses"
            className={isActive("/profile/courses")}
          >
            <SiCoursera size={20} />
            دوره‌های من
          </Link>

          <Link
            href="/profile/comments"
            className={isActive("/profile/comments")}
          >
            <FaComment size={18} />
            دیدگاه‌ها
          </Link>
        </nav>

        <button onClick={LogoutHandler} className={styles.logout}>
          <MdLogout size={20} />
          خروج از حساب
        </button>
      </aside>
    </>
  );
}
