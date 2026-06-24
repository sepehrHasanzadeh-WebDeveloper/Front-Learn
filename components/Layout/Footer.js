import { Container } from "react-bootstrap";
import styles from "./Footer.module.css";
import { MdCall, MdEmail, MdSupportAgent } from "react-icons/md";
import { PhoneFormatter } from "@/utils/PhoneFormatter";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <Container>
          <div className={styles.footer_head}>
            <div className={styles.footer_title}>
              <h3>بی صبرانه منتظر صدای گرم شما هستیم</h3>
              <p>
                اگر نیاز به مشاوره، راهنمایی یا مشکلی دارید، کافیست با ما در
                تماس باشید.
              </p>
            </div>
            <div className={styles.contact_us_way}>
              <div>
                021-44157785 | {PhoneFormatter("09393148674")}
                <MdSupportAgent
                  size={22}
                  color="var(--accent)"
                  style={{ marginRight: "10px" }}
                />
              </div>
              <div>
                sepehrh471@gmail.com{" "}
                <MdEmail
                  size={22}
                  color="var(--accent)"
                  style={{ marginRight: "10px" }}
                />
              </div>
            </div>
            <div className={styles.contact_btn}>
              <button className={styles.btn_call_1}>تماس با ما</button>
              <button className={styles.btn_call}>
                <MdCall size={22} />{" "}
              </button>
            </div>
          </div>
          <hr className={styles.hr_footer} />
          <div className={styles.footer_body}>
            <div className={styles.website_info}>
              <div className={styles.brand_section_footer}>
                <Image
                  src={"/images/brand.png"}
                  width={55}
                  height={55}
                  alt="front learn"
                />
                <p>فرانت لرن</p>
              </div>
              <p>
                فرانت‌لرن یک پلتفرم آموزشی در حوزه توسعه وب و برنامه‌نویسی
                فرانت‌اند است <br /> که با ارائه آموزش‌های پروژه‌محور و کاربردی،
                به شما کمک می‌کند مهارت‌های موردنیاز بازار کار را یاد بگیرید
                <br /> و مسیر حرفه‌ای خود را آغاز کنید.
              </p>
              <div className={styles.namad_logo}>
                <Image
                  src={"/images/enamad.png"}
                  width={90}
                  height={90}
                  style={{
                    width: "90px",
                    height: "90px",
                  }}
                  alt="خرید مطمعن از فرانت لرن"
                />
                <Image
                  src={"/images/namad.png"}
                  width={90}
                  height={90}
                  style={{
                    width: "90px",
                    height: "90px",
                  }}
                  alt="خرید مطمعن از فرانت لرن"
                />
                <Image
                  src={"/images/javaz.png"}
                  width={90}
                  height={90}
                  style={{
                    width: "90px",
                    height: "90px",
                  }}
                  alt="خرید مطمعن از فرانت لرن"
                />
              </div>
            </div>

            <div className={styles.footer_course_list}>
              <h5>لیست دوره ها</h5>
              <ul>
                <li>
                  <Link href={"/courses/next-js"}>دوره پروژه محور next js</Link>
                </li>
                <li>
                  <Link href={"/courses/javascript"}>
                    دوره جامع جاوا اسکیریپت
                  </Link>
                </li>
                <li>
                  <Link href={"/courses/tailwind-css"}>
                    دوره استایل دهی با tailwind
                  </Link>
                </li>
                <li>
                  <Link href={"/courses/react-js"}>دوره ریکت</Link>
                </li>
                <li>
                  <Link href={"/courses/node-js"}>دوره بک اند node js</Link>
                </li>
              </ul>
            </div>
            <div className={styles.docs_footer}>
              <h5>آخرین های مستندات</h5>
              <ul>
                <li>قوانین و مقررات</li>
                <li>شروع به کار</li>
                <li>دانلود بک آپ</li>
                <li>ریستور بک آپ</li>
                <li>کار با ایمیل ها</li>
              </ul>
            </div>
          </div>
          <hr className={styles.hr_footer} />
          <h4 className={styles.title_copy}>
            تمام حقوق و توسعه این وب اپلیکیشن برای سپهر حسن زاده محفوظ است.
          </h4>
        </Container>
      </footer>
    </>
  );
}
