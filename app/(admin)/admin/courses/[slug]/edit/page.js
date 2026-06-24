"use client";
import { fetcher } from "@/utils/FetchCourses";
import styles from "../../add/AddCourse.module.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import {toast} from "sonner";
import useSWR from "swr";

const CKEditor = dynamic(() => import("@/components/Tools/CKEditor"), {
  ssr: false,
  loading: () => <p>در حال بارگذاری ویرایشگر</p>,
});

export default function EditCourse() {
  const { slug } = useParams();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreView, setThumbnailPreView] = useState(null);
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/admin/courses/${slug}`);
        const data = await res.json();

        const course = data.course;

        // چون آرایه هست:
        const c = Array.isArray(course) ? course[0] : course;
  
        setFormData({
          title: c?.title || "",
          slug: c?.slug || "",
          shortDescription: c?.shortDescription || "",
          fullDescription: c?.fullDescription || "",
          price: c?.price || "",
          discountPrice: c?.discountPrice || "",
          isFree: c?.isFree || false,
          level: c?.level || "beginner",
          status: c?.status || "draft",
          category: c?.category?._id || c?.category || ""
        });

        setCurrentThumbnail(c?.thumbnail || "");
        setThumbnailPreView(c?.thumbnail || "");

        setChapters(
          c?.chapters && c?.chapters.length > 0
            ? c?.chapters
            : [
                {
                  title: "",
                  lessons: [
                    {
                      title: "",
                      duration: "",
                      isFree: false,
                      videoUrl: "",
                    },
                  ],
                },
              ],
        );
      } catch (err) {
        console.log(err);
        toast.error("خطا در بارگذاری اطلاعات دوره");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const updateChapterTitle = (index, field, value) => {
    setChapters((prev) =>
      prev.map((chapter, i) =>
        i === index ? { ...chapter, [field]: value } : chapter,
      ),
    );
  };
  const addChapterHandler = () => {
    setChapters((prev) => [
      ...prev,
      {
        title: "",
        lessons: [
          {
            title: "",
            duration: "",
            isFree: false,
            videoUrl: "",
          },
        ],
      },
    ]);
  };

  const removeChapterhandler = (index) => {
    if (chapters.length > 1) {
      setChapters((prev) => prev.filter((_, i) => i !== index));
    }
  };

  const updateLessonHandler = (chIndex, lesIndex, field, value) => {
    setChapters((prev) =>
      prev.map((ch, i) =>
        i === chIndex
          ? {
              ...ch,
              lessons: ch.lessons.map((les, li) =>
                li === lesIndex ? { ...les, [field]: value } : les,
              ),
            }
          : ch,
      ),
    );
  };
  const addLessonHandler = (chapterIndex) => {
    setChapters((prev) =>
      prev.map((ch, i) =>
        i === chapterIndex
          ? {
              ...ch,
              lessons: [
                ...ch.lessons,
                { title: "", duration: "", isFree: false, videoUrl: "" },
              ],
            }
          : ch,
      ),
    );
  };

  const removeLessonHandler = (chI, lesI) => {
    setChapters((prev) =>
      prev.map((ch, i) =>
        i === chI
          ? { ...ch, lessons: ch.lessons.filter((_, i) => i !== lesI) }
          : ch,
      ),
    );
  };

  const handleFormData = (e) => {
    const { value, name, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setThumbnailPreView(URL.createObjectURL(file));
    }
  };
const updateCourseHandle = async () => {
  if (!formData?.title) {
    toast.error("عنوان دوره الزامی است");
    return;
  }

  const data = new FormData();
  data.append("title", formData.title);
  data.append("slug", formData.slug);
  data.append("shortDescription", formData.shortDescription);
  data.append("fullDescription", formData.fullDescription);
  data.append("price", formData.price || 0);
  data.append("discountPrice", formData.discountPrice || "");
  data.append("isFree", formData.isFree);
  data.append("level", formData.level);
  data.append("status", formData.status);
  data.append("category" , formData.category)
  data.append("chapters", JSON.stringify(chapters));
  if (thumbnail) data.append("thumbnail", thumbnail);

  try {
    const res = await fetch(`/api/admin/courses/${slug}`, {
      method: "PUT",
      body: data,
    });

    const result = await res.json();

    if (result.success) {
      toast.success(result.message);

      if (result.course?.slug && result.course.slug !== slug) {
        router.push(`/admin/courses/${result.course.slug}/edit`);
      }
      return;
    }

    toast.error(result.message || "خطا در بروزرسانی");
  } catch (err) {
    console.log(err);
    toast.error("خطا در بروزرسانی");
  }
};



const { data, error, isLoading } = useSWR("/api/admin/categories", fetcher, {
  revalidateOnFocus: false,
  keepPreviousData: true,
});

const categories = data?.category;
if (loading) return <p>در انتظار...</p>;
  return (
    <>
      <Container>
        <div className={styles.container_add_course}>
          <h3 className={styles.title_form}>ویرایش اطلاعات دوره </h3>
          <div className={styles.input_field}>
            <label>عنوان دوره *</label>
            <input
              type="text"
              placeholder="مثال : اموزش کامل react از صفر تا صد"
              name="title"
              value={formData?.title}
              required
              onChange={(e) => handleFormData(e)}
            />
          </div>
          <div className={styles.input_field}>
            <label>ادرس URL دوره (slug) *</label>
            <input
              placeholder="مثال : next-js-complete"
              type="text"
              name="slug"
              value={formData?.slug}
              required
              dir="rtl"
              style={{ textAlign: "left", direction: "ltr" }}
              onChange={(e) => handleFormData(e)}
            />
          </div>
          <div className={styles.input_field}>
            <label>توضیحات کوتاه (حداقل 300 کاراکتر) *</label>
            <textarea
              name="shortDescription"
              rows={3}
              value={formData?.shortDescription}
              placeholder="خلاصه ای از دوره برای نمایش در کارت دوره "
              maxLength={300}
              onChange={(e) => handleFormData(e)}
            />
          </div>
          <div className={styles.input_field}>
            <label>توضیحات کامل دوره *</label>
            <CKEditor
              data={formData?.fullDescription}
              onChange={(data) =>
                setFormData((prev) => ({ ...prev, fullDescription: data }))
              }
            />
          </div>

          <div className={styles.row_input}>
            <div className={styles.input_field}>
              <label>قیمت دوره (تومان) *</label>
              <input
                type="number"
                name="price"
                value={formData?.price}
                disabled={formData?.isFree}
                min={0}
                onChange={(e) => handleFormData(e)}
              />
            </div>
            <div className={styles.input_field}>
              <label>قیمت با تخفیف</label>
              <input
                type="number"
                name="discountPrice"
                value={formData?.discountPrice}
                disabled={formData?.isFree}
                min={0}
                onChange={(e) => handleFormData(e)}
              />
            </div>
            <div className={styles.isFree_course}>
              <label>
                <span>دوره رایگان</span>
                <input
                  type="checkbox"
                  name="isFree"
                  checked={formData?.isFree}
                  onChange={(e) => handleFormData(e)}
                />
              </label>
            </div>
          </div>

          <div className={styles.row_input_status}>
            <div className={styles.input_field}>
              <label>سطح دوره</label>
              <select
                name="level"
                value={formData?.level}
                onChange={(e) => handleFormData(e)}
              >
                <option value={"beginner"}>مبتدی</option>
                <option value={"intermidate"}>متوسط</option>
                <option value={"advanced"}>پیشرفته</option>
              </select>
            </div>

            <div className={styles.input_field}>
              <label>وضعیت انتشار</label>
              <select
                name="status"
                value={formData?.status}
                onChange={(e) => handleFormData(e)}
              >
                <option value={"draft"}>پیش نویس</option>
                <option value={"published"}>منتشر شده</option>
                <option value={"coming-soon"}>به زودی</option>
              </select>
            </div>
            

                <div className={styles.input_field}>
              <label> دسته بندی دوره</label>
               <select
                name="category"
                value={formData?.category || ""}
                onChange={(e) => handleFormData(e)}
              >
                {
                  error ? <option className="text-red-500">خطا در بارگذاری ذسته بندی ها</option> :
                isLoading
                  ? <option>در حال بارگذاری</option>
                  : categories?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
              </select>
            </div>

          </div>
          <div className={styles.input_field}>
            <label>تصویر کاور دوره *</label>
            <input
              type="file"
              accept="image/*"
              required
              onChange={handleThumbnail}
            />
            {thumbnailPreView && (
              <div className={styles.preview}>
                <Image
                  src={thumbnailPreView}
                  alt="پیش نمایش"
                  width={250}
                  height={150}
                />
              </div>
            )}
          </div>

          {/* chapter and sesion section */}
          <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
            <h3 className="text-2xl m-4 font-bold text-purple-700 mb-6">
              افزودن فصل و درس‌ها
            </h3>

            {/* یک فصل */}
            {chapters.map((chapter, chIndex) => (
              <div
                key={chIndex}
                className="bg-white border border-purple-200 rounded-xl shadow-sm m-4 overflow-hidden"
              >
                <details className="group">
                  <summary className="cursor-pointer list-none">
                    <div className="flex items-center gap-4 p-4">
                      <span className="text-purple-700 font-bold w-16 text-center">
                        فصل {chIndex + 1}
                      </span>

                      <input
                        type="text"
                        placeholder="نام فصل..."
                        className="flex-1 border border-purple-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-purple-400"
                        value={chapter.title}
                        onChange={(e) =>
                          updateChapterTitle(chIndex, "title", e.target.value)
                        }
                      />

                      <span className="text-purple-600 transition-transform duration-300 group-open:rotate-180">
                        ▼
                      </span>

                      <button
                        onClick={() => removeChapterhandler(chIndex)}
                        className="text-white text-sm hover:text-red-700 ml-2 bg-red-400 w-20 h-10"
                        style={{ borderRadius: "10px" }}
                      >
                        حذف
                      </button>
                    </div>
                  </summary>

                  {chapter.lessons.map((lesson, lesIndex) => (
                    <div className="overflow-hidden" key={lesIndex}>
                      <div className="p-4 space-y-4 border-t">
                        <label className="flex items-center gap-2 text-sm my-2">
                          <input
                            type="checkbox"
                            className="accent-purple-600 ms-2 me-2"
                            checked={lesson.isFree}
                            onChange={(e) =>
                              updateLessonHandler(
                                chIndex,
                                lesIndex,
                                "isFree",
                                e.target.checked,
                              )
                            }
                          />
                          این فصل رایگان است
                        </label>

                        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg space-y-3">
                          <input
                            type="text"
                            placeholder="نام درس"
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-300"
                            value={lesson.title}
                            onChange={(e) =>
                              updateLessonHandler(
                                chIndex,
                                lesIndex,
                                "title",
                                e.target.value,
                              )
                            }
                          />

                          <input
                            type="text"
                            placeholder="مدت زمان ویدیو (مثلاً 10:30)"
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-300 my-3"
                            value={lesson.duration}
                            onChange={(e) =>
                              updateLessonHandler(
                                chIndex,
                                lesIndex,
                                "duration",
                                e.target.value,
                              )
                            }
                          />

                          <input
                            type="text"
                            placeholder="لینک ویدیو"
                            className="w-full border rounded-md p-2 focus:ring-2 focus:ring-blue-300"
                            value={lesson.videoUrl}
                            onChange={(e) =>
                              updateLessonHandler(
                                chIndex,
                                lesIndex,
                                "videoUrl",
                                e.target.value,
                              )
                            }
                          />
                        </div>

                        {lesIndex > 0 && (
                          <button
                            onClick={() =>
                              removeLessonHandler(chIndex, lesIndex)
                            }
                            className="bg-red-600 hover:bg-red-700 w-100 text-white px-4 py-2 text-sm mt-3"
                            style={{ borderRadius: "10px" }}
                          >
                            - حذف این درس
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={() => addLessonHandler(chIndex)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm mt-3 m-3"
                    style={{ borderRadius: "10px" }}
                  >
                    + افزودن درس جدید
                  </button>
                </details>
              </div>
            ))}

            <div className="m-4">
              <button
                onClick={addChapterHandler}
                className="w-full border border-purple-500 text-purple-800 hover:bg-purple-100 py-3 font-medium"
                style={{ borderRadius: "12px" }}
              >
                + افزودن فصل جدید
              </button>
            </div>
          </div>

          {/* chapter and sesion section */}

          <div className={styles.btn_create_course}>
            <button
              type="button"
              onClick={updateCourseHandle}
              disabled={loading}
            >
              {loading ? "در حال بروزرسانی دوره ..." : "بروزرسانی دوره"}
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}
