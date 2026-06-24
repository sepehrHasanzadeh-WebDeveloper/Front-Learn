"use client";

import { Container } from "react-bootstrap";
import styles from "./LearnRoad.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import RoadCard from "@/components/Ui/RoadCard";
import { useEffect, useState, useRef } from "react";

export default function LearnRoad() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/packages");
        const data = await res.json();

        setPackages(data.packages);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <Container className="my-5">
        <div className={styles.section_header}>
          <span>نقشه راه یادگیری</span>

          <h3>در حال بارگذاری مسیرهای یادگیری...</h3>

          <p>لطفاً چند لحظه صبر کنید.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <div className={styles.section_header}>
        <span>نقشه راه یادگیری</span>

        <h3>مسیر تبدیل شدن به یک Full Stack Developer</h3>

        <p>
          از HTML و CSS شروع کن، JavaScript را یاد بگیر، وارد دنیای React و
          Next.js شو و در نهایت با Node.js و پایگاه داده به یک توسعه‌دهنده
          فول‌استک تبدیل شو.
        </p>
      </div>

      <div className={styles.custom_swiper_wrapper}>
        <div className={styles.stats}>
          <div className="shadow-md">
            <strong>+50</strong>
            <span>ساعت آموزش</span>
          </div>

          <div className="shadow-md">
            <strong>12</strong>
            <span>مسیر یادگیری</span>
          </div>

          <div className="shadow-md">
            <strong>+2000</strong>
            <span>دانشجو</span>
          </div>
        </div>
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: ".road-prev",
            nextEl: ".road-next",
          }}
          pagination={{
            el: ".road-pagination",
            clickable: true,
          }}
          style={{
            padding: "20px 10px",
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            576: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 18,
            },
            1400: {
              slidesPerView: 3,
              spaceBetween: 20,
            },
          }}
        >
          {packages.map((pack) => (
            <SwiperSlide key={pack._id}>
              <RoadCard pack={pack} />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={styles.swiper_controls}>
          <button
            className={`road-prev ${styles.swiper_button_prev_custom}`}
            type="button"
            aria-label="اسلاید قبلی"
          >
            ‹
          </button>

          <div
            className={`road-pagination ${styles.swiper_pagination_custom}`}
          />

          <button
            className={`road-next ${styles.swiper_button_next_custom}`}
            type="button"
            aria-label="اسلاید بعدی"
          >
            ›
          </button>
        </div>
      </div>
    </Container>
  );
}
