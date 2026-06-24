"use client";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Profile.module.css";
import Image from "next/image";
import { PhoneFormatter } from "@/utils/PhoneFormatter";
import { FaBookOpen, FaCalendar, FaClock } from "react-icons/fa";
import { PiPlayCircleDuotone } from "react-icons/pi";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { MdOutlineErrorOutline , MdAccessTimeFilled} from "react-icons/md";
import Loader from "@/components/Shared/Loader/Loader";
import MessageBox from "@/components/Ui/MessageBox";
export default function ProfilePage() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const myCourse = user?.purchasedCourses;
  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/users/me/courses");
        if (!res.ok) {
          throw new Error("request faild");
        }
        const data = await res.json();
        setMyCourses(data?.courses || []);
      } catch (err) {
        console.error(err);
        setError("مشکلی در دریافت دوره‌ها پیش آمد");
      } finally {
        setLoading(false);
      }
    };
    fetchUserCourses();
  }, []);
  return (
    <>
      <Container className="mt-5">
        <div className={styles.img_icon_section}>
          <Link href="/">
            <Image
              src="/images/brand.png"
              alt="FrontLearn"
              width={80}
              height={80}
            />
          </Link>

          <div>
            <h2>فرانت لرن</h2>
            <span>پنل کاربری</span>
          </div>
        </div>

        <div className={styles.intro_bg_box}>
          <div className={styles.profile_image}>
            <Image
              src="/images/user-icon.png"
              alt="عکس پروفایل"
              width={110}
              height={110}
            />
          </div>

          <div className={styles.user_info}>
            <h3>سلام کاربر عزیز 👋</h3>

            <p>{PhoneFormatter("09393148674")}</p>

            <span>
              <FaCalendar />
              تاریخ عضویت: 1405/01/01
            </span>

            <button className={styles.btn_edit_profile}>
              ویرایش اطلاعات پروفایل
            </button>
          </div>
        </div>

        <Row className="g-5 mt-5">
          <Col xs={12} md={6} lg={4}>
            <div className={styles.stat_card}>
              <FaBookOpen size={50} color="var(--color-blue-500)" />
              <div className="d-flex flex-col ms-4">
                <p>دوره خریداری شده</p>
                <p style={{ marginTop: "-12px", fontWeight: "bold" }}>
                  {myCourse?.length}
                </p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.stat_card}>
              <FaClock size={50} color="var(--color-blue-500)" />
              <div className="d-flex flex-col ms-4">
                <p>ساعت یادگیری</p>
                <p style={{ marginTop: "-12px", fontWeight: "bold" }}>+0</p>
              </div>
            </div>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <div className={styles.stat_card}>
              <PiPlayCircleDuotone size={50} color="var(--color-blue-500)" />
              <div className="d-flex flex-col ms-4">
                <p>وضعیت فعلی</p>
                <p style={{ marginTop: "-12px", fontWeight: "bold" }}>
                  شروع کنید !{" "}
                </p>
              </div>
            </div>
          </Col>
        </Row>

        <h5 className="mt-5 ">دوره های خریداری شده({myCourse?.length})</h5>
        <div className={styles.my_course_container}>
          {myCourses.length === 0 && (
            <>
           
              <p>هنوز دوره ای خریداری نکرده اید</p>
              <Link href={"/"}>
                <button className={styles.see_more_course_btn}>
                  مشاهده همه دوره ها
                </button>
              </Link>
            </>
          )}
          {loading ? (
            <Loader />
          ) : error ? (
            <MessageBox
              icon={<MdOutlineErrorOutline color="grey" size={50} />}
              title={"مشکلی پیش امد در فرایند دریافت داده."}
            />
          ) : (
            <div className={styles.my_course}>
              {myCourses.map((course) => (
               <Link  href={`/courses/${course.slug}`} key={course._id}>
                   <div className={styles.course_div_buy} >
                  <div className={styles.user_course_img}>
                      <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={200}
                    height={200}
                  />
                  </div>
                  <p>{course.title}</p>
                  <div className={styles.user_course_footer}>
                      <span className="flex justify-center"> <MdAccessTimeFilled size={22} color="lightgray" /> {course.totalDuration || " _ "} </span>
                      <span> {course.lessonsCount} درس</span>
                  </div>
                </div>
               </Link>
              ))}
            </div>
          )}
        </div>
      </Container>
    </>
  );
}
