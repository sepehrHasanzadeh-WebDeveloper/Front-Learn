"use client";
import { Container } from "react-bootstrap";
import { Modal } from "react-bootstrap";
import styles from "./CommentPage.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import AdminLoader from "@/components/Shared/AdminLoader/AdminLoader";
import { toast } from "sonner";
import Pagination from "@/components/Shared/Pagination/Pagination";
export default function Comments() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);
  const [filter, setFilter] = useState("all");
  const closeModal = () => {
    setShowReplyModal(false);
    setReplyText("");
    setSelectedComment(null);
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `/api/comments?page=${page}&limit=10&filter=${filter}`,
        );

        const data = await res.json();

        if (!res.ok) {
          setError("خطایی در بارگزاری دیدگاه ها رخ داد");
          return;
        }

        setComments(data.comments);
        setTotalPages(data.totalPages);
        setPage(data.currentPage);
        setTotalComments(data.totalComments);
        setError("");
      } catch (err) {
        console.error(err);
        setError("خطایی در بارگزاری دیدگاه ها رخ داد");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [page, filter]);

  const DeleteCommentHandler = async (id) => {
    if (!window.confirm("ایا مایل به حذف این کامنت هستید ؟")) return;
    try {
      const res = await fetch(`/api/comments/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        throw new Error("خطا");
      }
      const data = await res.json();
      setComments((prev) => prev.filter((comment) => comment._id !== id));
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error("خطایی در فرایند حذف کامنت به وجود امد.");
    }
  };

  const AcceptCommentHandler = async (id) => {
    if (
      !window.confirm(
        "کامنت مورد نظر تایید بشه ؟ اگر تایید بشه در سایت به نمایش در میاید.",
      )
    )
      return;
    try {
      const res = await fetch(`/api/comments/${id}/accept`, {
        method: "PATCH",
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error("خطا در تایید دیدگاه");
      }
      setComments((prev) =>
        prev.map((comment) =>
          comment._id === id ? { ...comment, status: "accepted" } : comment,
        ),
      );
      toast.success(data.message);
    } catch (err) {
      console.log(err);
      toast.error("خطایی در فرایند تایید کامنت به وجود امد.");
    }
  };

  const submitReplyHandler = async () => {
    if (!replyText.trim()) return;
    try {
      setReplyLoading(true);
      const res = await fetch(`/api/comments/${selectedComment._id}/answer`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: replyText,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "خطا در ارسال پاسخ");
      }

      toast.success("پاسخ ثبت شد");

      setComments((prev) =>
        prev.map((comment) =>
          comment._id === selectedComment._id
            ? {
                ...comment,
                status: "accepted",
                answer: {
                  ...comment.answer,
                  body: replyText,
                  createdAt: new Date(),
                },
              }
            : comment,
        ),
      );
      closeModal();
    } catch (err) {
      console.log(err);
      toast.error("خطا در ارسال پاسخ");
    } finally {
      setReplyLoading(false);
    }
  };
  return (
    <>
      <Container fluid className="p-3 mt-2 rounded-2xl shadow-md">
        <h3 className="fw-bold my-5">مدیریت کامنت ها </h3>
        <div className={styles.filters}>
          <input
            type="search"
            className={styles.input_search}
            placeholder="جستجو بر اساس دوره ..."
          />

          <div className={styles.input_field}>
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">همه کامنت‌ها</option>
              <option value="accepted">تایید شده</option>
              <option value="pending">در انتظار تایید</option>
              <option value="rejected">رد شده</option>
              <option value="answered">پاسخ داده شده</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="mt-5">
            <AdminLoader />
          </div>
        ) : error ? (
          <div className={styles.error_box}>
            <p>{error}</p>
          </div>
        ) : comments.length === 0 ? (
          <div className={styles.empty_box}>
            <p>هنوز دیدگاهی ثبت نشده است.</p>
          </div>
        ) : (
          <div className={styles.table_wrapper}>
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th>کاربر</th>
                  <th>دوره</th>
                  <th>متن نظر</th>
                  <th>وضعیت</th>
                  <th>تاریخ</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {comments.map((comment) => (
                  <tr key={comment._id}>
                    <td>{comment.user?.name}</td>

                    <td>
                      <Link href={`/courses/${comment.course?.slug}`}>
                        {comment.course?.title}
                      </Link>
                    </td>

                    <td className={styles.comment_text}>{comment.body}</td>

                    <td>
                      {comment.answer?.body ? (
                        <span className={styles.repliedBadge}>
                          پاسخ داده شده
                        </span>
                      ) : comment.status === "accepted" ? (
                        <span className={styles.accepted}>تایید شده</span>
                      ) : comment.status === "pending" ? (
                        <span className={styles.pending}>در انتظار تایید</span>
                      ) : (
                        <span className={styles.rejected}>رد شده</span>
                      )}
                    </td>

                    <td>
                      {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                    </td>

                    <td>
                      <button
                        className={styles.action_btn}
                        onClick={() => {
                          setSelectedComment(comment);
                          setShowReplyModal(true);
                        }}
                      >
                        پاسخ
                      </button>

                      {comment.status !== "accepted" && (
                        <button
                          className={styles.action_btn}
                          style={{
                            backgroundColor: "var(--color-green-500)",
                          }}
                          onClick={() => AcceptCommentHandler(comment._id)}
                        >
                          تایید
                        </button>
                      )}

                      <button
                        className={styles.action_btn}
                        style={{
                          backgroundColor: "var(--color-red-500)",
                        }}
                        onClick={() => DeleteCommentHandler(comment._id)}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>

      {totalComments > 10 && (
        <div className="my-5">
          <Pagination
            totalPage={totalPages}
            currentPage={page}
            onChange={(p) => setPage(p)}
          />
        </div>
      )}

      {selectedComment && (
        <Modal
          show={showReplyModal}
          onHide={() => setShowReplyModal(false)}
          centered
          size="lg"
        >
          <div className={styles.replyModal}>
            <div className={styles.modalHeader}>
              <div>
                <h4>پاسخ به {selectedComment?.user?.name}</h4>
                <span>در حال پاسخ به دیدگاه کاربر</span>
              </div>

              <button className={styles.closeBtn} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.commentBox}>
                <h6>متن دیدگاه کاربر</h6>

                <p>{selectedComment?.body}</p>
              </div>

              <div className={styles.replyBox}>
                <label>پاسخ ادمین</label>

                <textarea
                  placeholder="پاسخ خود را بنویسید..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className={styles.replyTextarea}
                />
              </div>

              <button
                className={styles.submitReplyBtn}
                disabled={replyLoading || !replyText.trim()}
                onClick={submitReplyHandler}
              >
                {replyLoading ? "در حال ارسال..." : "ثبت پاسخ"}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
