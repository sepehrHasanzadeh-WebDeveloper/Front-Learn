"use client";
import { Container } from "react-bootstrap";
import styles from "./AddCategory.module.css";
import { useState } from "react";
import {toast} from "sonner";
export default function AddCategory() {
    const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    coursesCount: "",
  });

  const createCategoryHandler = async () => {
    if (!formData.name || !formData.slug) {
      return toast.error("نام و اسلاگ دسته بندی اجباری میباشد");
    }
    if (formData.name.length < 3 || formData.slug.length < 3) {
      return toast.error(
        "نام  یا اسلاگ دسته بندی باید بیشتر از 3 کاراکتر باشه",
      );
    }
    setLoading(true);
    const data = new FormData();
    data.append("name", formData.name);
    data.append("slug", formData.slug);
    data.append("description", formData.description);
    data.append("coursesCount", formData.coursesCount);
    try {
      const res = await fetch("/api/admin/categories/add", {
        method: "POST",
        body: data,
      });
      const result = await res.json();
      if (result.success) {
        toast.success("دسته بندی با موفقت ساخته شد");
        setFormData({
          name: "",
          slug: "",
          description: "",
          coursesCount: "",
        });
      } else {
        toast.error("خطا در هنگام ساخت دسته بندی جدید");
        
      }
    } catch (err) {
      console.error(err);
      toast.error("server Error");
    } finally {
      setLoading(false);
    }
  };
  

  const handleFormData = (e) => {
    const {name , value} = e.target;
    setFormData((prev) => ({
        ...prev,
        [name] :value
    }))
  }
  return (
    <>
      <Container className="mt-4 rounded-lg shadow-md p-3">
        <h4>اضافه کردن دسته بندی</h4>
        <div className="flex flex-col w-full">
          <div className="flex gap-3 ">
            <div className={styles.input_field}>
              <label>نام دسته بندی *</label>
              <input
                type="text"
                value={formData.name}
                placeholder=" مثال : دوره های فرانت اند"
                name="name"
                required
                onChange={(e) => handleFormData(e) }
              />
            </div>
            <div className={styles.input_field}>
              <label>اسلاگ دسته بندی *</label>
              <input
                type="text"
                value={formData.slug}
                placeholder="مثال : frontend"
                name="slug"
                required
                 onChange={(e) => handleFormData(e) }
              />
            </div>
          </div>
          <div className={styles.input_field} style={{ width: "100%" }}>
            <label>توضیحات دسته بندی </label>
            <input
              type="text"
              name="description"
              value={formData.description}
               onChange={(e) => handleFormData(e) }
            />
          </div>
          <div className={styles.input_field}>
            <label>تعداد دوره ها این دسته بندی</label>
            <input
              type="text"
              name="coursesCount"
              placeholder="مثال : 23 "
              value={formData.coursesCount}
               onChange={(e) => handleFormData(e) }
            />
          </div>
          <div className={styles.btn_create_course}>
            <button
              type="button"
              onClick={() => createCategoryHandler()}
              disabled={loading}
            >
              {loading ? "در حال ذخیره دسته بندی ..." : "ذخیره دسته بندی"}
            </button>
          </div>
        </div>
      </Container>
    </>
  );
}
