"use client";
import { FaUsers, FaComments } from "react-icons/fa";
import { Col, Container, Row } from "react-bootstrap";
import { SiCoursera } from "react-icons/si";
import { MdPublish, MdOutlinePayments } from "react-icons/md";
import { BiSolidCommentError, BiPackage, BiCommentError } from "react-icons/bi";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminLoader from "@/components/Shared/AdminLoader/AdminLoader";
import MessageBox from "@/components/Ui/MessageBox";

export default function Adminpanel() {
  const [dashboardInfo, setDashboardInfo] = useState({
    users: 0,
    courses: 0,
    publishedCourse: 0,
    notAcceptedComments: 0,
    comments: 0,
  });
  const [latestComments, setLatestComments] = useState([]);
  const [latestOrders, setLatestOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin/dashboard");
      const data = await res.json();
      setDashboardInfo({
        users: data.users,
        courses: data.courses,
        publishedCourse: data.publishedCourse,
        comments: data.comments,
        notAcceptedComments: data.notAcceptedComments,
        ordersCount: data.ordersCount,
      });
      setLatestComments(data.latestComments);
      setLatestOrders(data.latestOrders);
      setError("");
    } catch (err) {
      console.log(err);
      setError("خطایی رخ داد");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Container className="mt-5">
        <h2 className="fw-bold">داشبورد مدیریت </h2>
        {!loading ? (
          <>
            <Row className="g-5 row-cols-lg-4 row-cols-md-2 gy-3 row-cols-1 mt-3">
              <Col>
                <div className="shadow-md rounded-lg d-flex align-items-center border-t-4 p-4 border-purple-500">
                  <span className="inline-flex items-center rounded-md bg-purple-400/10 px-2 py-1 text-xs font-medium text-purple-400 inset-ring inset-ring-purple-400/30">
                    <FaUsers size={40} />{" "}
                  </span>
                  <div className="d-flex flex-col ms-4">
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      کل کاربران
                    </span>
                    <strong>{dashboardInfo.users}</strong>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="shadow-md rounded-lg d-flex align-items-center border-t-4 p-4 border-green-500">
                  <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-400/30">
                    <SiCoursera size={40} />{" "}
                  </span>
                  <div className="d-flex flex-col ms-4">
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      کل دوره ها
                    </span>
                    <strong>{dashboardInfo.courses}</strong>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="shadow-md rounded-lg d-flex align-items-center border-t-4 p-4 border-sky-500">
                  <span className="inline-flex items-center rounded-md bg-sky-400/10 px-2 py-1 text-xs font-medium text-sky-400 inset-ring inset-ring-sky-400/30">
                    <MdPublish size={40} />{" "}
                  </span>
                  <div className="d-flex flex-col ms-4">
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      دوره های منتشر شده
                    </span>
                    <strong>{dashboardInfo.publishedCourse}</strong>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="shadow-md rounded-lg d-flex align-items-center border-t-4 p-4 border-orange-500">
                  <span className="inline-flex items-center rounded-md bg-orange-400/10 px-2 py-1 text-xs font-medium text-orange-400 inset-ring inset-ring-orange-400/30">
                    <FaComments size={40} />{" "}
                  </span>
                  <div className="d-flex flex-col ms-4">
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      کل کامنت ها
                    </span>
                    <strong>{dashboardInfo.comments}</strong>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="shadow-md rounded-lg d-flex align-items-center border-t-4 p-4 border-indigo-500">
                  <span className="inline-flex items-center rounded-md bg-indigo-400/10 px-2 py-1 text-xs font-medium text-indigo-400 inset-ring inset-ring-indigo-400/30">
                    <BiSolidCommentError size={40} />{" "}
                  </span>
                  <div className="d-flex flex-col ms-4">
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      کامنت های تایید نشده
                    </span>
                    <strong>{dashboardInfo.notAcceptedComments}</strong>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="shadow-md rounded-lg d-flex align-items-center border-t-4 p-4 border-cyan-500">
                  <span className="inline-flex items-center rounded-md bg-cyan-400/10 px-2 py-1 text-xs font-medium text-cyan-400 inset-ring inset-ring-cyan-400/30">
                    <BiPackage size={40} />{" "}
                  </span>
                  <div className="d-flex flex-col ms-4">
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      کل سفارش ها
                    </span>
                    <strong>{dashboardInfo?.ordersCount || 0}</strong>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="shadow-md rounded-lg d-flex align-items-center border-t-4 p-4 border-amber-500">
                  <span className="inline-flex items-center rounded-md bg-amber-400/10 px-2 py-1 text-xs font-medium text-amber-400 inset-ring inset-ring-amber-400/30">
                    <MdOutlinePayments size={40} />{" "}
                  </span>
                  <div className="d-flex flex-col ms-4">
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      درامد کل
                    </span>
                    <strong>0</strong>
                  </div>
                </div>
              </Col>
              <Col>
                <div className="shadow-md rounded-lg d-flex align-items-center border-t-4 p-4 border-rose-500">
                  <span className="inline-flex items-center rounded-md bg-rose-400/10 px-2 py-1 text-xs font-medium text-rose-400 inset-ring inset-ring-rose-400/30">
                    <FaUsers size={40} />{" "}
                  </span>
                  <div className="d-flex flex-col ms-4">
                    <span style={{ color: "gray", fontSize: "15px" }}>
                      کل کاربران
                    </span>
                    <strong>0</strong>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5 gy-5 row-cols-1 row-cols-md-2">
              
              <Col>
                <div className="d-flex flex-col rounded-2xl shadow-lg p-5 h-100">
                  <h3 className="p-3">آخرین کامنت ها</h3>
                  <hr />

                  {loading ? (
                    <AdminLoader />
                  ) : error ? (
                    <MessageBox
                      icon={<BiCommentError size={45} color="grey" />}
                      title="خطایی رخ داد"
                      message="خطایی هنگام دریافت داده ها پیش آمده لطفا بعدا سعی کنید"
                    />
                  ) : latestComments.length === 0 ? (
                    <MessageBox
                      icon={<FaComments size={45} color="grey" />}
                      title="کامنتی وجود ندارد"
                      message="هنوز هیچ کامنتی ثبت نشده است"
                    />
                  ) : (
                    latestComments.map((comment) => (
                      <div
                        key={comment._id}
                        className="d-flex flex-column w-100 rounded-lg shadow-md bg-mist-100 border-end border-4 border-sky-500 p-3 mb-3"
                      >
                        <span>
                          <strong>{comment.user?.name || "کاربر"}</strong> در
                          دوره{" "}
                          <Link href={`/courses/${comment.course?.slug}`}>
                            {comment.course?.title}
                          </Link>
                        </span>

                        <p className="mt-2 mb-2">{comment.body}</p>

                        <span className="text-gray-500">
                          {new Date(comment.createdAt).toLocaleDateString(
                            "fa-IR",
                          )}
                        </span>
                      </div>
                    ))
                  )}

                  <Link href="/admin/comments">
                    <strong className="d-flex justify-content-center align-items-center mt-3">
                      مشاهده همه نظرات
                    </strong>
                  </Link>
                </div>
              </Col>

              <Col>
                <div className="d-flex flex-col rounded-2xl shadow-lg p-5 h-100">
                  <h3 className="p-3">آخرین سفارش ها</h3>
                  <hr />

                  {loading ? (
                    <AdminLoader />
                  ) : error ? (
                    <MessageBox
                      icon={<BiCommentError size={45} color="grey" />}
                      title="خطایی رخ داد"
                      message="خطایی هنگام دریافت داده ها پیش آمده لطفا بعدا سعی کنید"
                    />
                  ) : latestOrders.length === 0 ? (
                    <MessageBox
                      icon={<BiPackage size={45} color="grey" />}
                      title="سفارشی وجود ندارد"
                      message="هنوز هیچ سفارشی ثبت نشده است"
                    />
                  ) : (
                    latestOrders.map((order) => (
                      <div
                        key={order._id}
                        className="d-flex flex-column w-100 rounded-lg shadow-md bg-mist-100 border-end border-4 border-green-500 p-3 mb-3"
                      >
                        <span>
                          <strong>{order.user?.name || order.userName}</strong>{" "}
                          دوره{" "}
                          <strong>
                            {order.course?.title || order.courseTitle}
                          </strong>{" "}
                          را خریداری کرده است
                        </span>

                        <p className="mt-2 mb-2">
                          مبلغ سفارش:{" "}
                          <strong>
                            {Number(order.totalPrice || 0).toLocaleString(
                              "fa-IR",
                            )}{" "}
                            تومان
                          </strong>
                        </p>

                        <span className="text-gray-500">
                          {new Date(order.createdAt).toLocaleDateString(
                            "fa-IR",
                          )}
                        </span>
                      </div>
                    ))
                  )}

                  <Link href="/admin/orders">
                    <strong className="d-flex justify-content-center align-items-center mt-3">
                      مشاهده همه سفارش ها
                    </strong>
                  </Link>
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <AdminLoader />
        )}
      </Container>
    </>
  );
}
