"use client";
import Link from "next/link";
import styles from "./AdminSidebar.module.css";
import { MdCategory, MdDashboard, MdLogout } from "react-icons/md";
import { IoIosAddCircle, IoMdSettings } from "react-icons/io";
import { FaComment, FaShoppingCart, FaUser } from "react-icons/fa";
import { SiCoursera } from "react-icons/si";
import { useAuth } from "@/contexts/AuthContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
export default function AdminSidebar() {
  const pathName = usePathname();
  const { logout } = useAuth();

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>
        <Link href={"/"}>فرانت لرن</Link>
      </h2>
      <div className={styles.icon_menu}>
        <Image
          src={"/images/brand.png"}
          alt="فرانت لرن | frontlearn"
          width={60}
          height={60}
        />
      </div>

      <ul>
        <li className={pathName == "/admin/dashboard" ? styles.active : ""}>
          <Link href={"/admin/dashboard"}>
            <MdDashboard size={22} />
            <span>داشبورد</span>
          </Link>
        </li>
        <li className={pathName == "/admin/user" ? styles.active : ""}>
          <Link href={"/admin/user"}>
            <FaUser size={22} />
            <span>کاربران</span>
          </Link>
        </li>
        <li className={pathName == "/admin/comments" ? styles.active : ""}>
          <Link href={"/admin/comments"}>
            <FaComment size={22} />
            <span>کامنت ها</span>
          </Link>
        </li>
        <li className={pathName == "/admin/courses" ? styles.active : ""}>
          <Link href={"/admin/courses"}>
            <SiCoursera size={22} />
            <span>دوره ها</span>
          </Link>
        </li>
        <li className={pathName == "/admin/courses/add" ? styles.active : ""}>
          <Link href={"/admin/courses/add"}>
            <IoIosAddCircle size={22} />
            <span>اضافه کردن دوره</span>
          </Link>
        </li>
        <li className={pathName == "/admin/categories" ? styles.active : ""}>
          <Link href={"/admin/categories"}>
            <MdCategory size={22} />
            <span>دسته بندی ها</span>
          </Link>
        </li>
        <li className={pathName == "/admin/orders" ? styles.active : ""}>
          <Link href={"/admin/orders"}>
            <FaShoppingCart size={22} />
            <span>سفارش ها</span>
          </Link>
        </li>

        <li className={pathName == "/admin/settings" ? styles.active : ""}>
          <Link href={"/admin/settings"}>
            <IoMdSettings size={22} />
            <span>تنظیمات</span>
          </Link>
        </li>
        <li className={styles.logout_item}>
          <button onClick={logout} className={styles.logout_botton}>
            <MdLogout size={22} />
            <span>خروج</span>
          </button>
        </li>
      </ul>
    </div>
  );
}
