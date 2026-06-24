"use client";
import { Container } from "react-bootstrap";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import {toast} from "sonner";
import { PhoneFormatter } from "@/utils/PhoneFormatter";
import { MdDelete, MdEdit } from "react-icons/md";
import EditUserModal from "@/components/Features/EditUserModal/EditUserModal";
import Pagination from "@/components/Shared/Pagination/Pagination";
import AdminLoader from "@/components/Shared/AdminLoader/AdminLoader";


export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const totalPage = Math.ceil(totalUsers / 5);

  const getUsers = async (search) => {
    try {
      const res = await fetch(`/api/admin/users?search=${search}&page=${page}`);

      const data = await res.json();
      if (data.success) {
        setUsers(data.users || []);
        setTotalUsers(data.totalUsers);
      }
    } catch (error) {
      toast.error("خطا در بارگزاری کاربران");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers(search);
  }, [search, page]);

  const openModal = (user) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };
  const editUserHandler = async ({ id, name, email, role }) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role }),
      });
      const data = await res.json();

      if (data.success) {
        const updatedUser = data.user;
        toast.success("اطلاعات کاربر با موفقیت بروز شد");
        setIsModalOpen(false);
        setUsers((users) =>
          users.map((user) =>
            user._id === id ? { ...user, ...updatedUser } : user,
          ),
        );
        return;
      }
      // اگر ارور متنی بود اینو نشون بده
      if (typeof data.message === "string") {
        toast.error(data.message);
        return;
      }
      // اگر از کتابخانه zod اومده بود همرو نشون بده
      if (typeof data.message === "object") {
        Object.values(data.message).forEach((errorsArray) => {
          errorsArray.forEach((msg) => toast.error(msg));
        });
        return;
      }
      toast.error("خطا در بروزرسانی اطلاعات");
    } catch (error) {
      console.log(error);
      toast.error("خطای سرور");
    }
  };

  const deleteUserHandler = async (id) => {
      if(!confirm("ایا مطمعن از حذف این کاربر هستید ؟")) {
        return;
      }
      try { 
          const res = await fetch(`/api/admin/users/${id}` , {
            method:"DELETE"
          })
          const data = await res.json()
          if(!data.success) {
              return toast.error("خطایی در حذف کاربر پیش امد")
          }
          toast.success(data.message)
          setUsers((prev) => prev.filter((u) => u._id !== id))
      }catch(err) {
          console.log(err)
      }
  }
  return (
    <>
      <Container fluid className={`p-3 mt-3 ${styles.user_parent}`}>
        <h3 className="fw-bold">مدیریت کاربران </h3>
        <div className={styles.action_user_parent}>
          <input
            type="search"
            className={styles.input_search}
            placeholder="جستجو در نام, شماره یا ایمیل ..."
            onChange={(e) => setSearch(e.target.value)}
          />
    
        </div>

        {loading ? (
          <AdminLoader />
        ) : users.length === 0 ? (
          <div>
            <p>هیچ کاربری یافت نشد</p>
          </div>
        ) : (
          <div className={styles.table_wrapper}>
            <table className={styles.custom_table}>
              <thead>
                <tr>
                  <th>نام</th>
                  <th>شماره موبایل</th>
                  <th>ایمیل</th>
                  <th>نقش</th>
                  <th>تایید شده</th>
                  <th>تاریخ ثبت نام</th>
                  <th>عملیات</th>
                </tr>
              </thead>

              <tbody>
                {users.map((item) => (
                  <tr key={item._id}>
                    <td>{item.name || "-"}</td>
                    <td>{PhoneFormatter(item.phone)}</td>
                    <td>{item.email || "-"}</td>
                    <td>
                      <span
                        className={
                          item.role === "admin"
                            ? `${styles.admin_Badge}`
                            : `${styles.user_Badge}`
                        }
                      >
                        {item.role === "admin" ? "مدیر" : "کاربر عادی"}
                      </span>
                    </td>
                    <td>{item.isVerified ? "بله" : "خیر"}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("fa-IR")}
                    </td>
                    <td>
                      <button
                        className={styles.action_btn}
                        onClick={() => openModal(item)}
                      >
                        <MdEdit size={22} />
                      </button>
                      <button
                        className={styles.action_btn}
                        style={{ backgroundColor: "var(--color-red-400)" }}
                        onClick={() => deleteUserHandler(item._id)}
                      >
                        <MdDelete size={22} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <EditUserModal
              isModalOpen={isModalOpen}
              user={selectedUser}
              onClose={() => setIsModalOpen(false)}
              onSubmit={editUserHandler}
            />
          </div>
        )}
      </Container>
      {totalUsers > 5 ? (
        <Pagination
          totalPage={totalPage}
          currentPage={page}
          onChange={(p) => setPage(p)}
        />
      ) : (
        ""
      )}
    </>
  );
}
