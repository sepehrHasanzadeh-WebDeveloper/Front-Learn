"use client";
import { Container } from "react-bootstrap";
import "./LastCourses.module.css";
import CourseCard from "@/components/Ui/CourseCard";
import { useEffect, useState } from "react";
import CardLoader from "@/components/Shared/CardLoader/CardLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function LastCourses() {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await fetch("/api/courses/latest");
        if (!res.ok) throw new Error();

        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, []);
  return (
    <>
      <Container className="my-5">
        <h4 className="my-4 ">اخرین دوره های اموزشی</h4>
        <div className="slider-wrapper shadow-2xl">
          <div className="swiper-button-prev" style={{ marginLeft: "14px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M15 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="swiper-button-next" style={{ marginRight: "14px" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M9 18l6-6-6-6"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
          
            spaceBetween={20}
            slidesPerView={4}
            style={{ padding: "10px 0" }}
            breakpoints={{
              0: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              576: {
                slidesPerView: 2, 
                spaceBetween: 12,
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
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {loading
              ? [...Array(4)].map((_, i) => (
                  <SwiperSlide key={i} className="d-flex">
                    <CardLoader />
                  </SwiperSlide>
                ))
              : courses.map((card) => (
                  <SwiperSlide key={card._id} className="d-flex">
                    <CourseCard course={card} />
                  </SwiperSlide>
                ))}
          </Swiper>
        </div>
      </Container>
    </>
  );
}
