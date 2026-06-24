"use client";
import { Container } from "react-bootstrap";
import styles from "./categories.module.css";

import { MdDelete, MdEdit } from "react-icons/md";
import { useEffect, useState } from "react";
import AdminLoader from "@/components/Shared/AdminLoader/AdminLoader";
import Pagination from "@/components/Shared/Pagination/Pagination";
import MessageBox from "@/components/Ui/MessageBox";
import { BiErrorCircle } from "react-icons/bi";
import { FcEmptyFilter } from "react-icons/fc";
import Link from "next/link";

export default function Categories() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [totalCategory, setTotalCategory] = useState();
  const totalPage = Math.ceil(totalCategory / 10);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(
          `/api/admin/categories?search=${search}&page=${page}`,
        );
        const data = await res.json();
        setCategories(data.category);
        setLoading(false);
      } catch (err) {
        setError("خطایی هنگام دریافت اطلاعات به وجود امده");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [page, search]);

  const handleDelete = async (id) => {
    if(window.confirm("آیا از حذف این دسته بندی مطمئن هستید؟")){
      try {
        const res = await fetch(`/api/admin/categories/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (data.success) {
          setCategories(categories.filter((cat) => cat._id !== id));
        }
      } catch (err) {
        setError("خطایی هنگام حذف دسته بندی رخ داد");
      }
    }
  };
  return (
    <>
      <Container className="mt-4">
        <h3 className="mb-3">مدیریت دسته بندی ها</h3>

        <div className={`flex justify-between ${styles.head_content_option}`}>
          <input
            value={search}
            type="search"
            className={styles.input_search}
            placeholder="جستجو بر اساس اسلاگ دسته بندی ..."
            onChange={(e) => setSearch(e.target.value)}
          />
           <Link href={"/admin/categories/add"}>
          <button className={styles.add_user_button}>
            {" "}
           اضافه کردن دسته بندی
          </button>
          </Link>
        </div>

        {loading ? (
          <AdminLoader />
        ) : error ? (
          <MessageBox
            icon={<BiErrorCircle size={55} color="red" />}
            title={"خطایی رخ داد"}
            message={
              "خطایی در هنگام دریافت اطلاعات رخ داد بعدا دوباره امتحان کنید"
            }
          />
        ) : categories.length === 0 ? (
          <div className="d-flex justify-center align-items-center mt-4">
            <MessageBox
              icon={<FcEmptyFilter size={55} color="grey" />}
              title={"چیزی پیدا نشد"}
              message={"دسته بندی با توجه به جستجو شما پیدا نشد"}
            />
          </div>
        ) : (
          <div className={styles.table_wrapper}>
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th>نام دسته</th>
                  <th> اسلاگ </th>
                  <th>تعداد دوره</th>
                  <th>تاریخ</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {categories.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name}</td>
                    <td>{item.slug}</td>
                    <td>{item.coursesCount}</td>

                    <td>
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </td>

                    <td>
                      
                      <button className={styles.action_btn_delete} onClick={() => handleDelete(item._id)}>
                        <MdDelete size={22}  />
                      </button>
                      <button className={styles.action_btn}>
                        {" "}
                        <MdEdit size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Container>
      {totalCategory > 10 && (
        <Pagination
          totalPage={totalPage}
          currentPage={page}
          onChange={(p) => setPage(p)}
        />
      ) }
    </>
  );
}
