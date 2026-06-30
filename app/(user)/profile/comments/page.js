"use client";

import { Container } from "react-bootstrap";
import { useEffect, useState } from "react";

import Pagination from "@/components/Shared/Pagination/Pagination";
import { useTheme } from "@/contexts/ThemeContext";

export default function Comment() {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { themeg } = useTheme();
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoading(true);

        const res = await fetch(`/api/users/me/comments?page=${page}&limit=5`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "خطا در دریافت دیدگاه‌ها");
        }

        setComments(data.comments || []);
        setTotalPages(data.totalPages);
        setPage(data.currentPage);
        setTotalComments(data.totalComments);
      } catch (err) {
        console.error(err);
        setError(err.message || "مشکلی رخ داده است");
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [page]);

  if (loading) {
    return (
      <Container className="p-2 mx-2">
        <div className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`animate-pulse ${themeg === "light" ? "bg-white" : "bg-[#10101977]"} border rounded-xl p-5`}
            >
              <div
                className={`h-5 ${themeg === "light" ? "bg-grey-200" : "bg-[#10101977]"} rounded w-40 mb-4`}
              ></div>

              <div
                className={`h-4 ${themeg === "light" ? "bg-grey-200" : "bg-[#10101977]"} rounded w-24 mb-6`}
              ></div>

              <div
                className={`h-24 ${themeg === "light" ? "bg-grey-200" : "bg-[#10101977]"} rounded`}
              ></div>
            </div>
          ))}
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="p-2 mx-2">
        <div
          style={{ marginTop: "50px" }}
          className="bg-red-50 border border-red-200 rounded-xl p-5 text-center"
        >
          <h3 className="font-bold text-red-600 mb-2">خطا در دریافت اطلاعات</h3>

          <p className="text-gray-600">{error}</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="p-2 mx-2">
      <div className="space-y-5">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div
              key={comment._id}
              className={`${themeg === "light" ? "bg-white" : "bg-[#10101977]"} border rounded-xl p-5 my-2 shadow-sm`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold text-lg">{comment.course?.title}</h3>

                  <span className="text-sm text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString("fa-IR")}
                  </span>
                </div>

                <div>
                  {comment.status === "accepted" && (
                    <span className="px-3 py-1 rounded-full text-sm bg-green-100 text-green-700">
                      تایید شده
                    </span>
                  )}

                  {comment.status === "pending" && (
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      در انتظار تایید
                    </span>
                  )}

                  {comment.status === "rejected" && (
                    <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-700">
                      رد شده
                    </span>
                  )}
                </div>
              </div>

              <div
                className={`${themeg === "light" ? "bg-zinc-50" : "bg-[#2f2f38b9]"} rounded-lg p-4`}
              >
                <p
                  className={`leading-8 ${themeg === "light" ? "text-gray-700" : "white"}`}
                >
                  {comment.body}
                </p>
              </div>

              {comment.answer?.body && (
                <div className="mt-4 border-r-4 border-blue-500 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-blue-700">پاسخ مدرس</span>
                  </div>

                  <p
                    className={`leading-8 ${themeg === "light" ? "text-gray-700" : "white"}`}
                  >
                    {comment.answer.body}
                  </p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div
            style={{ marginTop: "50px" }}
            className={`${themeg === "light" ? "bg-white" : "bg-[#10101977]"} border border-dashed border-zinc-300 rounded-xl p-4 text-center`}
          >
            <h3 className="font-bold text-lg mb-2">
              هنوز دیدگاهی ثبت نکرده‌اید
            </h3>

            <p className={`${themeg === "light" ? "text-gray-500" : "white"}`}>
              پس از ثبت دیدگاه برای دوره‌ها، نظرات شما در این بخش نمایش داده
              می‌شود.
            </p>
          </div>
        )}
      </div>

      {totalComments > 10 && (
        <div className="my-5">
          <Pagination
            totalPage={totalPages}
            currentPage={page}
            onChange={(p) => setPage(p)}
          />
        </div>
      )}
    </Container>
  );
}
