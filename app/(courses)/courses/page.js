"use client";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./courses.module.css";
import { FaFilter } from "react-icons/fa";
import { useMemo, useState } from "react";

import CourseCard from "@/components/Ui/CourseCard";
import CardLoader from "@/components/Shared/CardLoader/CardLoader";
import MessageBox from "@/components/Ui/MessageBox";
import { MdErrorOutline } from "react-icons/md";
import Pagination from "@/components/Shared/Pagination/Pagination";
import useSWR from "swr";
import { fetcher } from "@/utils/FetchCourses";

export default function Courses() {
  const [filterIsOpen, setFilterIsOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [showDiscount, setShowDiscount] = useState(false);
  const [sortNewest, setSortNewest] = useState(false);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedLevels, setSelectedLevels] = useState([]);

  const toggleValue = (value, selected, setSelected) => {
    if (selected.includes(value)) {
      setSelected(selected.filter((item) => item !== value));
    } else {
      setSelected([...selected, value]);
    }
    setPage(1);
  };

  const url = useMemo(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());

    if (showDiscount) params.set("discount", "true");
    if (sortNewest) params.set("sort", "newest");
    if (selectedLevels.length) params.set("level", selectedLevels.join(","));
    if (selectedStatuses.length)
      params.set("status", selectedStatuses.join(","));

    return `/api/courses?${params.toString()}`;
  }, [page, showDiscount, sortNewest, selectedLevels, selectedStatuses]);

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  const courses = data?.courses ?? [];
  const totalCourse = data?.totalCount ?? courses.length;
  const totalPage = Math.ceil(totalCourse / 15);

  if (isLoading)
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Row className="g-4 justify-content-center">
          {[...Array(4)].map((_, i) => (
            <Col lg={3} md={4} sm={6} key={i}>
              <CardLoader />
            </Col>
          ))}
        </Row>
      </div>
    );

  if (error) {
    return (
      <MessageBox
        icon={<MdErrorOutline size={50} color="red" />}
        title="خطا"
        message="مشکل در دریافت اطلاعات"
      />
    );
  }

  return (
    <>
      <Container className="my-5">
        <h2 className="m-5">دوره های برنامه نویسی</h2>

        {!filterIsOpen && (
          <button
            className={styles.btn_filter_course}
            onClick={() => setFilterIsOpen(true)}
          >
            فیلتر کردن دوره ها
          </button>
        )}

        <div className={styles.wrapper}>
          <div
            className={`${styles.filterBox} ${filterIsOpen ? styles.open : ""}`}
          >
            <div className={styles.filterHeader}>
              <h4>فیلتر</h4>
              <FaFilter onClick={() => setFilterIsOpen(false)} />
            </div>

            <button
              type="button"
              className={`${styles.btn_filter_course} ${
                showDiscount ? styles.activeBtn : ""
              }`}
              onClick={() => {
                setShowDiscount((p) => !p);
                setPage(1);
              }}
            >
              دوره های تخفیف خورده
            </button>

            <button
              type="button"
              className={`${styles.btn_filter_course} ${
                sortNewest ? styles.activeBtn : ""
              }`}
              onClick={() => {
                setSortNewest((p) => !p);
                setPage(1);
              }}
            >
              جدیدترین دوره ها
            </button>

            <button
              type="button"
              className={styles.btn_filter_course}
              onClick={() => {
                setShowDiscount(false);
                setSortNewest(false);
                setSelectedLevels([]);
                setSelectedStatuses([]);
                setPage(1);
              }}
            >
              حذف فیلترها
            </button>

            <div className="d-flex flex-col p-2 mt-2">
              <h4>وضعیت دوره</h4>

              {[
                { label: "منتشر شده", value: "published" },
                { label: "پیش نویس", value: "draft" },
                { label: "به زودی", value: "coming-soon" },
              ].map((item) => (
                <label key={item.value}>
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(item.value)}
                    onChange={() =>
                      toggleValue(
                        item.value,
                        selectedStatuses,
                        setSelectedStatuses,
                      )
                    }
                  />
                  <span style={{ marginRight: "10px" }}>{item.label}</span>
                </label>
              ))}
            </div>

            <div className="d-flex flex-col p-2 mt-2">
              <h4>سطح دوره</h4>

              {[
                { label: "مبتدی", value: "beginner" },
                { label: "متوسط", value: "intermidate" },
                { label: "پیشرفته", value: "advanced" },
              ].map((item) => (
                <label key={item.value}>
                  <input
                    type="checkbox"
                    checked={selectedLevels.includes(item.value)}
                    onChange={() =>
                      toggleValue(item.value, selectedLevels, setSelectedLevels)
                    }
                  />
                  <span style={{ marginRight: "10px" }}>{item.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.content}>
            <Row className="g-4">
              {courses.length === 0 ? (
                <Col>
                  <MessageBox
                    title="هیچ دوره‌ای نیست"
                    message="با این فیلتر چیزی پیدا نشد"
                  />
                </Col>
              ) : (
                courses.map((c) => (
                  <Col lg={4} md={4} sm={6} key={c._id}>
                    <CourseCard course={c} />
                  </Col>
                ))
              )}
            </Row>
          </div>
        </div>
      </Container>

      {totalCourse > 15 && (
        <div style={{ marginBottom: "40px" }}>
          <Pagination
            totalPage={totalPage}
            currentPage={page}
            onChange={setPage}
          />
        </div>
      )}
    </>
  );
}
