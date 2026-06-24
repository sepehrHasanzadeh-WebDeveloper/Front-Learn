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
  const [filterIsOpen, setFilterIsOpen] = useState(true);

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
    if (selectedLevels.length > 0)
      params.set("level", selectedLevels.join(","));
    if (selectedStatuses.length > 0)
      params.set("status", selectedStatuses.join(","));

    const query = params.toString();

    return query ? `/api/courses?${query}` : "/api/courses";
  }, [page, showDiscount, sortNewest, selectedLevels, selectedStatuses]);

  const { data, error, isLoading } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
    keepPreviousData: true,
  });

  const courses = data?.courses ?? [];
  const totalCourse = data?.totalCount ?? courses.length;
  const totalPage = Math.ceil(totalCourse / 15);
  if (isLoading) {
    return (
      <div className="d-flex gap-3 justify-center align-items-center my-5">
        {[...Array(4)].map((_, i) => (
          <CardLoader key={i} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <MessageBox
        icon={<MdErrorOutline size={55} color="red" />}
        title="خطا در دریافت اطلاعات"
        message="مشکلی در دریافت اطلاعات به وجود آمده است. لطفاً بعداً دوباره تلاش کنید."
      />
    );
  }

  return (
    <>
      <Container className="my-5">
        <h2 className="m-5">دوره های برنامه نویسی </h2>
        {!filterIsOpen && (
          <button
            onClick={() => setFilterIsOpen(true)}
            className={styles.btn_filter_course}
          >
            فیلتر کردن دوره ها
          </button>
        )}
        <Row className="g-5 ">
          {filterIsOpen && (
            <Col lg={3}>
              <div className="d-flex flex-col rounded-lg shadow-md p-3">
                <h4 className="d-flex cursor-pointer">
                  <FaFilter onClick={() => setFilterIsOpen(false)} /> فیلتر
                </h4>

                <button
                  type="button"
                  className={styles.btn_filter_course}
                  style={
                    showDiscount
                      ? { backgroundColor: "#0d6efd", color: "#fff" }
                      : undefined
                  }
                  onClick={() => {
                    setShowDiscount((prev) => !prev);
                    setPage(1);
                  }}
                >
                  دوره های تخفیف خورده
                </button>
                <button
                  type="button"
                  className={styles.btn_filter_course}
                  style={
                    sortNewest
                      ? { backgroundColor: "#0d6efd", color: "#fff" }
                      : undefined
                  }
                  onClick={() => {
                    setSortNewest((prev) => !prev);
                    setPage(1);
                  }}
                >
                  جدید ترین دوره ها
                </button>
                <button
                  type="button"
                  className={styles.btn_filter_course}
                  onClick={() => {
                    setShowDiscount(false);
                    setSortNewest(false);
                    setSelectedStatuses([]);
                    setSelectedLevels([]);
                    setPage(1);
                  }}
                >
                  حذف فیلترها
                </button>

                <div className="d-flex flex-col p-2 mt-2 ">
                  <h4>وضعیت دوره</h4>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes("published")}
                      onChange={() =>
                        toggleValue(
                          "published",
                          selectedStatuses,
                          setSelectedStatuses,
                        )
                      }
                    />
                    <span style={{ marginRight: "10px" }}>منتشر شده</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes("draft")}
                      onChange={() =>
                        toggleValue(
                          "draft",
                          selectedStatuses,
                          setSelectedStatuses,
                        )
                      }
                    />
                    <span style={{ marginRight: "10px" }}>پیش نویس</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes("coming-soon")}
                      onChange={() =>
                        toggleValue(
                          "coming-soon",
                          selectedStatuses,
                          setSelectedStatuses,
                        )
                      }
                    />
                    <span style={{ marginRight: "10px" }}>به زودی</span>
                  </label>
                </div>
                <div className="d-flex flex-col p-2 mt-2 ">
                  <h4>سطح دوره</h4>

                  <label>
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes("beginner")}
                      onChange={() =>
                        toggleValue(
                          "beginner",
                          selectedLevels,
                          setSelectedLevels,
                        )
                      }
                    />
                    <span style={{ marginRight: "10px" }}>مبتدی</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes("intermidate")}
                      onChange={() =>
                        toggleValue(
                          "intermidate",
                          selectedLevels,
                          setSelectedLevels,
                        )
                      }
                    />
                    <span style={{ marginRight: "10px" }}>متوسط</span>
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedLevels.includes("advanced")}
                      onChange={() =>
                        toggleValue(
                          "advanced",
                          selectedLevels,
                          setSelectedLevels,
                        )
                      }
                    />
                    <span style={{ marginRight: "10px" }}>پیشرفته</span>
                  </label>
                </div>
              </div>
            </Col>
          )}
          {courses.length === 0 ? (
            <Col>
              <MessageBox
                title="چیزی برای نمایش وجود ندارد"
                message="هیچ دوره‌ای با فیلترهای انتخابی یافت نشد."
              />
            </Col>
          ) : (
            courses.map((course) => (
              <Col
                lg={filterIsOpen === true ? 3 : 4}
                md={4}
                sm={6}
                key={course._id}
              >
                <CourseCard course={course} />
              </Col>
            ))
          )}
        </Row>
      </Container>
      <div className="mb-5">
        {totalCourse > 15 && (
          <Pagination
            totalPage={totalPage}
            currentPage={page}
            onChange={(p) => setPage(p)}
          />
        ) }
      </div>
    </>
  );
}
