"use client";
import Image from "next/image";
import styles from "./CourseCard.module.css";
import { PiStudent } from "react-icons/pi";
import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <Link href={`/courses/${course.slug}`} className={styles.card_link}>
      <article className={styles.course_card}>
        {course.discountPrice && !course.isFree && (
          <span className={styles.discount_badge}>
            {getDiscountPercent(course.price, course.discountPrice)}% تخفیف
          </span>
        )}

        <div className={styles.course_head}>
          <Image
            src={course.thumbnail}
            width={400}
            height={250}
            alt={course.title}
            className={styles.course_image}
          />
        </div>

        <div className={styles.course_body}>
          <span className={styles.course_category}>توسعه وب</span>

          <h5>{course.title}</h5>

          <p>{course.shortDescription}</p>

          <div className={styles.teacher}>مدرس: سپهر حسن زاده</div>

          <hr />
        </div>

        <div className={styles.course_footer}>
          <span className={styles.st_count}>
            <PiStudent size={18} />
            {course.studentCount} دانشجو
          </span>

          <div className={styles.price_sec}>
            {course.isFree ? (
              <span className={styles.free_course}>رایگان</span>
            ) : course.discountPrice ? (
              <div className={styles.discount_price}>
                <del>{course.price.toLocaleString("fa-IR")} تومان</del>

                <strong>
                  {course.discountPrice.toLocaleString("fa-IR")} تومان
                </strong>
              </div>
            ) : (
              <strong className={styles.normal_price}>
                {course.price.toLocaleString("fa-IR")} تومان
              </strong>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

function getDiscountPercent(price, discountPrice) {
  return Math.round(((price - discountPrice) / price) * 100);
}
