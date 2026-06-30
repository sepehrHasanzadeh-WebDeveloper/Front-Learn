"use client";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./CoursePage.module.css";
import Image from "next/image";
import { FaCartPlus } from "react-icons/fa";
import { useState } from "react";
import { RxCaretDown, RxCaretUp } from "react-icons/rx";
import MessageBox from "@/components/Ui/MessageBox";
import { PiEmpty } from "react-icons/pi";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import {  BiLock } from "react-icons/bi";
import sanitizeHtml from "sanitize-html";
import CourseComments from "@/components/Sections/Course/CourseComment";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa6";
export default function CourseClient({ course }) {
  const [showMore, setShowMore] = useState(false);
  const { cart, addToCart } = useCart();
  const { user } = useAuth();
  const [openIndex, setOpenIndex] = useState(null);
  const courseIsInCart = cart.some((course) => course._id === course._id);

  const chapterColors = [
    "bg-indigo-100 text-indigo-700",
    "bg-emerald-100 text-emerald-700",
    "bg-cyan-100 text-cyan-700",
    "bg-rose-100 text-rose-700",
    "bg-orange-100 text-orange-700",
  ];

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  const cleanHtml = sanitizeHtml(course.fullDescription, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ["src", "alt", "width", "height"],
      a: ["href", "target", "rel"],
    },
    selfClosing: ["img", "br", "hr"],
    transformTags: {
      a: (tagName, attribs) => ({
        tagName: "a",
        attribs: {
          ...attribs,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    },
  });

  const addToCartHandler = (course) => {
    if (!user) {
      return toast.info(
        "برای افزودن دوره به سبد خرید ابتدا وارد حساب کاربری خود شوید",
      );
    }
    addToCart(course);
    toast.success("دوره با موفقیت به سبد خرید اضافه شد");
  };

  const haspurchased =
    user &&
    user.purchasedCourses?.some(
      (purchasedCourseId) => purchasedCourseId === course._id,
    );
  const isFreeCourse = course.isFree;

  return (
    <>
      <Container className="my-5">
        <Row className="gy-5 row-cols-1 row-cols-md-2">
          <Col className="order-2 order-md-1">
            <div className="d-flex flex-col">
              <h1 className="fs-3">{course.title}</h1>
              <p className="text-base/8 mt-3">{course.shortDescription}</p>
            </div>

            {haspurchased ? (
              <div
                className={`flex justify-between align-items-center rounded-md mt-5 bg-green-400/10 p-2 text-green-400 inset-ring inset-ring-green-500/20 ${styles.start_course_btn}`}
              >
                <p className="fw-bold mt-3 flex g-3">
                  <IoCheckmarkDoneCircleSharp size={26} /> شما در این دوره ثبت
                  نام کرده اید
                </p>
                <button className={styles.btn_start_course}>
                  شروع یادگیری
                </button>
              </div>
            ) : (
              <div className="d-flex flex-column flex-md-row justify-between align-items-start align-items-md-center mt-5 px-2 gap-3">
                {course.isFree ? (
                  <span className={styles.free_course}>رایگان</span>
                ) : course.discountPrice ? (
                  <p className={`${styles.p_discount_price} m-0`}>
                    <del>{course.price.toLocaleString("fa-IR")} تومان</del>
                    <span>
                      {course.discountPrice.toLocaleString("fa-IR")} تومان
                    </span>
                  </p>
                ) : (
                  <strong className="text-lg">
                    {course.price.toLocaleString("fa-IR")} تومان
                  </strong>
                )}

         
                <button
                  className={`${styles.btn_add_course_cart} fill-indigo-500 drop-shadow-lg drop-shadow-indigo-500/50`}
                  onClick={() => addToCartHandler(course)}
                >
                  <FaCartPlus size={22} />
                  {courseIsInCart
                    ? "دوره در سبد خرید شما است"
                    : "اضافه کردن به سبد خرید"}
                </button>
              </div>
            )}
          </Col>

          <Col className="order-1 order-md-2">
            <div className="d-flex justify-center align-items-center">
              <Image
                alt={`دوره پروژه محور ${course.slug}`}
                src={course.thumbnail}
                width={400}
                height={400}
                className={styles.course_thumbnail}
              />
            </div>
          </Col>
        </Row>
        <Row className="mt-5 g-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
          <Col>
            <div className={styles.box_option_course}>
              <span>سطح دوره</span>
              <span>
                {course.status === "published"
                  ? "منتشر شده"
                  : course.status === "draft"
                    ? "پیش نویس"
                    : course.status === "coming-soon"
                      ? "به زودی"
                      : "نامشخص"}
              </span>
            </div>
          </Col>
          <Col>
            <div className={styles.box_option_course}>
              <span>سطح دوره</span>
              <span>
                {course.level === "beginner"
                  ? "مبتدی"
                  : course.level === "intermidate"
                    ? "متوسط"
                    : course.level === "advanced"
                      ? "پیشرفته"
                      : "نامشخص"}
              </span>
            </div>
          </Col>
          <Col>
            <div className={styles.box_option_course}>
              <span>مدت زمان</span>
              <span>منتشر شده</span>
            </div>
          </Col>
          <Col>
            <div className={styles.box_option_course}>
              <span>تعداد جلسات</span>
              <span>{course.lessonsCount.toLocaleString("fa-IR")}</span>
            </div>
          </Col>
          <Col>
            <div className={styles.box_option_course}>
              <span>روش پشتیبانی</span>
              <span>تیکت و پرسش و پاسخ</span>
            </div>
          </Col>
          <Col>
            <div className={styles.box_option_course}>
              <span>پیش نیاز</span>
              <span>ندارد</span>
            </div>
          </Col>
        </Row>

        <div
          className={`mt-5 p-4 p-md-5 shadow-md rounded-lg d-flex flex-column ${styles.text_h}`}
        >
          <h4>توضیحات تکمیلی دوره</h4>

          <div
            className={
              showMore
                ? styles.description_course_open
                : styles.description_course_close
            }
            dangerouslySetInnerHTML={{ __html: cleanHtml }}
          />
          <button
            onClick={() => setShowMore((p) => !p)}
            className={styles.show_more_btn}
          >
    
            {showMore ? (
              <>
                مشاهده کمتر <RxCaretDown size={25} />
              </>
            ) : (
              <>
                مشاهده بیشتر <RxCaretUp size={25} />
              </>
            )}
          </button>
        </div>

        <div
          className={`${styles.course_chapters} w-full d-flex flex-col mt-5`}
        >
          <div className="d-flex justify-between p-3 align-items-center">
            <h3 className="fw-bold" >
              سر فصل دوره
            </h3>
            <p className="mt-2">{course.lessonsCount} جلسه</p>
          </div>
          {course.chapters.length === 0 ? (
            <MessageBox
              title={"هیچ فصلی وجود ندارد"}
              message={"ویدیو این دوره هنوز منتشر نشده "}
              icon={<PiEmpty size={50} color="red" />}
            />
          ) : (
            course.chapters.map((lesson, index) => {
              const headerColor = chapterColors[index % chapterColors.length];
              return (
                <div
                  className=" mx-auto rounded-lg  border border-gray-200  shadow-sm my-3 overflow-hidden"
                  key={lesson._id}
                  style={{ width: "98%" }}
                >
                  <button
                    onClick={() => toggle(lesson._id)}
                    className={`w-full flex items-center justify-between gap-3 py-1 px-3 text-right ${headerColor} border-b border-gray-200 transition hover:shadow-sm`}
                    aria-expanded={openIndex === lesson._id}
                  >
                    <div>
                      <p className="text-base font-semibold leading-tight mt-3">
                        فصل {lesson.lessons.length.toLocaleString("fa-IR")} -{" "}
                        {lesson.title}
                      </p>
                    </div>
                    <ChevronDownIcon
                      className={`h-6 w-6 text-gray-700 transition-transform duration-300 ${
                        openIndex === lesson._id ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openIndex === lesson._id && (
                    <div
                      className={`space-y-3 px-5 py-4 bg-slate-50 ${styles.contetn_lesson_bar}`}
                    >
                      {lesson.lessons?.length ? (
                        lesson.lessons.map((item, itemIndex) => (
                          <div
                            key={
                              item._id ??
                              item.id ??
                              `${lesson._id}-${itemIndex}`
                            }
                            className={`rounded-lg border flex justify-between border-gray-200 bg-white p-2 shadow-sm ${styles.lessons_contetn_parent}`}
                          >
                            <p className="text-sm  font-semibold text-slate-900 mt-2 flex justify-center align-items-center">
                              {isFreeCourse || haspurchased ? (
                                <FaDownload size={25} color="green" />
                              ) : (
                                <BiLock size={25} color="red" />
                              )}
                              <span className="mt-2 ms-3"> {item.title}</span>
                            </p>

                            {isFreeCourse || haspurchased ? (
                              <>
                                <span className="mt-2 ">{item.duration}</span>
                              </>
                            ) : (
                              <>
                                <p className="text-red-500 mt-2 ms-3">
                                  قفل شده - برای دسترسی دوره را خریداری کنید
                                </p>
                              </>
                            )}
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-gray-600">
                          این فصل فعلا درس ندارد.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <CourseComments course={course} />
      </Container>
    </>
  );
}
