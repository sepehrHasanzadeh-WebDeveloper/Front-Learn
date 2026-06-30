"use client";
import { Container } from "react-bootstrap";
import styles from "./Header.module.css";
import Image from "next/image";
import Link from "next/link";
import { IoMdSchool } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { SlBasket } from "react-icons/sl";
import UserModalMenu from "../Features/Modal/Modal";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import { HiMenuAlt2 } from "react-icons/hi";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useCart } from "@/contexts/CartContext";
import Skeleton from "react-loading-skeleton";
import { CiDark, CiLight } from "react-icons/ci";
import { useTheme } from "@/contexts/ThemeContext";
export default function Header({ theme }) {
  const { user, loading, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpne] = useState(false);
  const { cartCount } = useCart();
  const { themeg, toggleTheme } = useTheme();
  return (
    <>
      <header>
        <Container fluid>
          <div className={styles.nav_bar_content}>
            <div
              onClick={() => setIsMenuOpne(!isMenuOpen)}
              className={styles.mobile_menu}
            >
              {isMenuOpen ? <HiMenuAlt2 /> : <MdOutlineMenu />}
            </div>
            <div className={styles.brand_bar}>
              <Link href={"/"}>
                <h4>فرانت لرن</h4>
              </Link>
              <Image
                src={"/images/brand.png"}
                width={50}
                height={50}
                alt="فرانت لرن | front learn"
              />
            </div>

            <div className={styles.links_bar}>
              <ul>
                <li>
                  <Link href={"/"}>
                    <FaHome size={20} />
                    <span>صفحه اصلی</span>
                  </Link>
                </li>
                <li>
                  <Link href={"/courses"}>
                    <IoMdSchool size={20} />
                    <span>دوره های اموزشی</span>
                  </Link>
                </li>

                <li>
                  <Link href={"/about-us"}>
                    <BsFillInfoCircleFill size={20} />
                    <span>درباره ما</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={styles.auth_bar}>
              {loading ? (
                <Skeleton
                  baseColor="rgba(255, 255, 255, 0.1)"
                  highlightColor="#444"
                  width={42}
                  height={39}
                  style={{ marginBottom: "5px" }}
                />
              ) : user ? (
                <div className={styles.user_icon}>
                  <UserModalMenu logout={logout} theme={theme} />
                </div>
              ) : (
                <Link className={styles.auth_button} href={"/auth"}>
                  <button className="px-3">ورود | ثبت نام</button>
                </Link>
              )}
              <Link href={"/cart"} className={styles.cart_wraper}>
                {cartCount > 0 && (
                  <span className={styles.cart_count}>{cartCount}</span>
                )}
                <SlBasket size={20} />
              </Link>
              <div onClick={toggleTheme} className={styles.cart_wraper}>
                
                 {themeg === "dark" ? <CiLight size={22} /> : <CiDark size={22} />}
              </div>
            </div>
          </div>

          <div
            className={`xl:hidden ${isMenuOpen ? "block" : "hidden"} py-3 fixed inset-0  m-5`}
          >
            <div className="rounded-3xl bg-slate-950/95 p-4 shadow-xl shadow-black/20 ring-1 ring-white/10 backdrop-blur-sm">
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href={"/"}
                    onClick={() => setIsMenuOpne(false)}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-sky-400/40 hover:bg-slate-800"
                  >
                    <FaHome size={20} />
                    <span>صفحه اصلی</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/courses"}
                    onClick={() => setIsMenuOpne(false)}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-sky-400/40 hover:bg-slate-800"
                  >
                    <IoMdSchool size={20} />
                    <span>دوره های اموزشی</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/about-us"}
                    onClick={() => setIsMenuOpne(false)}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-sky-400/40 hover:bg-slate-800"
                  >
                    <BsFillInfoCircleFill size={20} />
                    <span>درباره ما</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href={"/cart"}
                    onClick={() => setIsMenuOpne(false)}
                    className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition hover:border-sky-400/40 hover:bg-slate-800"
                  >
                    <SlBasket size={20} />
                    <span> سبد خرید</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
}
