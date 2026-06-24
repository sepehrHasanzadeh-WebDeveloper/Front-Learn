"use client";
import { Container } from "react-bootstrap";
import styles from "./Courses.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import Link from "next/link";
import Pagination from "@/components/Shared/Pagination/Pagination";
import { useRouter } from "next/navigation";
import AdminLoader from "@/components/Shared/AdminLoader/AdminLoader";
export default function Courses() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [totalCourse, setTotalCourse] = useState(0);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const totalPage = Math.ceil(totalCourse / 5);

  const getCoursesData = async () => {
    try {
      const res = await fetch(
        `/api/admin/courses?search=${search}&page=${page}`,
      );
      const data = await res.json();

      if (data.success) {
        setCourses(data.courses || []);
        setTotalCourse(data.totalCourse);
      }
    } catch (err) {
      toast.error("مشکلی در دریافت اطلاعات به وجود اومد");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCoursesData();
  }, [search, page]);

  const deleteCoursehandler = async (slug) => {
    if (
      !confirm(
        "ایا مطمعن به حذف دوره هستید ؟ قابل بازگشت نیست و از فروشگاه هم حذف میشود",
      )
    ) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/courses/${slug}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCourses((prev) => prev.filter((c) => c.slug !== slug));
        toast.success("دوره با موفقیت حذف شد");
      } else {
        toast.error("خطا در حذف دوره");
      }
    } catch (err) {
      toast.error("خطا از طرف سرور");
    }
  };

  return (
    <>
      <Container fluid className={`p-3 mt-3 ${styles.courses_parent}`}>
        <h3 className="fw-bold">مدیریت دوره ها </h3>
        <div className={styles.action_courses_parent}>
          <input
            type="search"
            className={styles.input_search}
            placeholder="جستجو در عنوان دوره ..."
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={`${styles.add_courses_button} fill-indigo-500 drop-shadow-lg drop-shadow-indigo-500/50 `}
            onClick={() => router.push("/admin/courses/add")}
          >
            اضافه کردن دوره
          </button>
        </div>
        {loading ? (
          <AdminLoader />
        ) : courses.length === 0 ? (
          <div>
            <p>هیچ دوره‌ای یافت نشد</p>
          </div>
        ) : (
          <div className={styles.table_wrapper}>
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th>تصویر</th>
                  <th>عنوان دوره</th>
                  <th>قیمت</th>
                  <th>درس ها</th>
                  <th>وضعیت</th>
                  <th>تاریخ ایجاد</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {courses.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <Image
                        src={item.thumbnail}
                        alt="عکس دوره"
                        width={90}
                        height={90}
                        className={styles.course_image}
                      />
                    </td>
                    <td>
                      <Link href={"#"}>{item.title}</Link>
                    </td>
                    <td>
                      {item.isFree ? (
                        <span className="inline-flex items-center rounded-md bg-blue-800/10 px-2 py-1 text-xs font-medium fs-5 text-blue-600 inset-ring inset-ring-blue-400/30">
                          رایگان
                        </span>
                      ) : (
                        item.price.toLocaleString("fa-IR")
                      )}
                    </td>
                    <td>{item.lessonsCount}</td>
                    <td>
                      <span
                        className={`${styles.statusBG} ${styles[item.status]}`}
                      >
                        {item.status === "draft"
                          ? "پیش نویس"
                          : item.status === "published"
                            ? "منتشر شده"
                            : item.status === "coming-soon"
                              ? "به زودی"
                              : item.status}
                      </span>
                    </td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td>
                      <div className={styles.action_section}>
                        <Link
                          href={`/admin/courses/${item.slug}/edit `}
                          className={styles.edit_course}
                        >
                          ویرایش
                        </Link>
                        <button
                          className={`${styles.action_btn} status`}
                          style={{ backgroundColor: "var(--color-purple-400)" }}
                        >
                          {item.status === "published" ? "غیر فعال" : "انتشار"}
                        </button>
                        <button
                          onClick={() => deleteCoursehandler(item.slug)}
                          className={styles.action_btn}
                          style={{ backgroundColor: "var(--color-red-500)" }}
                        >
                          حذف
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
      {totalCourse > 5 && (
        <Pagination
          totalPage={totalPage}
          currentPage={page}
          onChange={(p) => setPage(p)}
        />
      ) }
    </>
  );
}
