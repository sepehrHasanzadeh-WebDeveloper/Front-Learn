"use client";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./UserCourses.module.css";
import Link from "next/link";
import CardLoader from "@/components/Shared/CardLoader/CardLoader";
import MessageBox from "@/components/Ui/MessageBox";
import { MdOutlineErrorOutline } from "react-icons/md";
import CourseCard from "@/components/Ui/CourseCard";
export default function MyCourses() {
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
      <Container>
        <br />
        <h2 className="mt-5">دوره ها / لایسنس های من</h2>
        <span>خریداری شده</span>
        {myCourses.length === 0 && (
          <div className={styles.empty_user_course}>
            <img
              src={"/images/course-notFound.svg"}
              alt="دوره های خریداری شده من"
            />
            <p>هنوز دوره ای خریداری نکرده اید</p>
            <Link href={"/"}>
              <button className={styles.see_more_course_btn}>
                مشاهده همه دوره ها
              </button>
            </Link>
          </div>
        )}

        {loading ? (
          <CardLoader />
        ) : error ? (
          <MessageBox
            icon={<MdOutlineErrorOutline color="grey" size={50} />}
            title={"مشکلی پیش امد در فرایند دریافت داده."}
          />
        ) : (
          <Row className="gy-4 row-cols-1 row-cols-md-2 row-cols-lg-4 mt-5">
            {myCourses.map((course) => (
              <Col key={course._id}>
                <CourseCard course={course} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
