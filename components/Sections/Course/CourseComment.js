"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./CourseComment.module.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import Loader from "@/components/Shared/Loader/Loader";
import MessageBox from "@/components/Ui/MessageBox";
import { BiCommentX } from "react-icons/bi";

export default function CourseComments({ course }) {
  const { user } = useAuth();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const fetchCourseComments = async () => {
      try {
        setCommentLoading(true);
        const res = await fetch(`/api/comments/course/${course._id}`);
        const data = await res.json();
        if (!res.ok) {
          return setError("خطایی در بارگزاری کامنت ها پیش امده");
        }
        setComments(data.comments);
        setError("");
      } catch (err) {
        console.error(err);
        setError("خطایی در بارگذاری کامنت‌ها رخ داده است");
      } finally {
        setCommentLoading(false);
      }
    };
    fetchCourseComments();
  }, [course._id]);
  const openModal = () => {
    if (!user) {
      router.push("/auth");
      return;
    }
    setIsModalOpen(true);
    setMessage({ text: "", type: "" });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCommentText("");
    setMessage({ text: "", type: "" });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          body: commentText,
          courseId: course._id,
        }),
      });

      const data = await res.json();

      toast.info("دیدگاه شما با موفقیت ثبت شد پس از تایید به نمایش در میاید");

      setMessage({
        text: data.message,
        type: "success",
      });

      setCommentText("");
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);

      setMessage({
        text: "خطا در ارسال کامنت",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.comments}>
      <div className={styles.header}>
        <h2 className={styles.title}>نظرات کاربران ({comments.length})</h2>

        <button onClick={openModal} className={styles.addCommentBtn}>
          + نوشتن نظر
        </button>
      </div>

      {commentLoading ? (
        <div className="mt-5 flex justify-center align-items-center">
          <Loader />
        </div>
      ) : error ? (
        <MessageBox
          icon={<BiCommentX size={45} color="grey" />}
          message={"خطایی هنگام دریافت کامنت ها اتفاق افتاد"}
          title={"خطایی رخ داد"}
        />
      ) : comments.length === 0 ? (
        <p className={styles.empty}>هنوز نظری برای این دوره ثبت نشده است.</p>
      ) : (
        <div className={styles.commentsList}>
          {comments.map((comment) => (
            <div key={comment._id} className={styles.commentItem}>
              <div className={styles.commentHeader}>
                <div className={styles.userInfo}>
                  <div className={styles.avatar}>
                    {comment.user?.avatar ? (
                      <Image
                        src={comment.user.avatar}
                        alt={comment.user.name || "کاربر"}
                        width={50}
                        height={50}
                        className={styles.avatarImg}
                      />
                    ) : (
                      <div className={styles.defaultAvatar}>
                        {comment.user?.name?.[0] || "ک"}
                      </div>
                    )}
                  </div>
                  <span className={styles.userName}>
                    {comment.user?.name || "کاربر ناشناس"}
                  </span>
                </div>
              </div>

              <p className={styles.commentText}>{comment.body}</p>

              {comment.answer?.body && (
                <div className={styles.adminReply}>
                  <div className={styles.replyHeader}>
                    <span className={styles.adminBadge}>پاسخ مدرس</span>

                    <span className={styles.date}>
                      {new Date(comment.answer.createdAt).toLocaleDateString(
                        "fa-IR",
                      )}
                    </span>
                  </div>

                  <p className={styles.replyText}>{comment.answer.body}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {!user && (
        <div className={styles.loginPrompt}>
          <p>
            برای نوشتن نظر، باید{" "}
            <Link href="/auth" className={styles.loginLink}>
              وارد حساب کاربری
            </Link>{" "}
            شوید.
          </p>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalHeader}>
              <h3>نوشتن نظر برای: {course.title}</h3>
              <button onClick={closeModal} className={styles.modalClose}>
                ×
              </button>
            </div>

            <form onSubmit={handleSubmitComment} className={styles.modalForm}>
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="نظر شما درباره این دوره چیست؟ حداقل ۱۰ کاراکتر"
                rows="6"
                className={styles.modalTextarea}
                required
                minLength="10"
              />

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  onClick={closeModal}
                  className={styles.cancelBtn}
                >
                  لغو
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? "در حال ارسال..." : "ارسال نظر"}
                </button>
              </div>
            </form>

            {message.text && (
              <p className={`${styles.modalMessage} ${styles[message.type]}`}>
                {message.text}
              </p>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
