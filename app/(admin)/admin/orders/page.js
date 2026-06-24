"use client";

import { Container } from "react-bootstrap";
import styles from "./OrderPage.module.css";
import AdminLoader from "@/components/Shared/AdminLoader/AdminLoader";
import { useEffect, useState } from "react";
import Pagination from "@/components/Shared/Pagination/Pagination";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  
  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await fetch(`/api/admin/orders`, {
        method: "GET",
        credentials: "include",
      });
      const data = await res.json();

      setOrders(data.orders || []);
      setTotalPages(data.totalPages);
      setPage(data.currentPage);
      setTotalOrders(data.totalPages);
    } catch (err) {
      console.error("Fetch orders error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page]);

  
  const filteredOrders = orders.filter(
    (order) =>
      order.userName?.toLowerCase().includes(search.toLowerCase()) ||
      order.courseTitle?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <Container fluid className={`p-3 mt-3 ${styles.user_parent}`}>
      <h3 className="fw-bold">مدیریت سفارش‌ها</h3>


      <div className={styles.action_user_parent}>
        <input
          type="search"
          className={styles.input_search}
          placeholder="جستجو در نام کاربر یا دوره ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

   
      {loading ? (
        <AdminLoader />
      ) : filteredOrders.length === 0 ? (
        <div className="flex justify-center align-items-center mt-3 bg-gray-300 m-auto py-2">
          <p>هیچ سفارشی یافت نشد</p>
        </div>
      ) : (
        <div className={styles.table_wrapper}>
          <table className={styles.custom_table}>
            <thead>
              <tr>
                <th>شناسه سفارش</th>
                <th>نام کاربر</th>
                <th>شناسه دوره</th>
                <th>نام دوره خریداری شده</th>
                <th>مبلغ</th>
                <th>وضعیت</th>
                <th>تاریخ</th>
              </tr>
            </thead>

            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.userId?.name}</td>
                  <td>{order.courseId?._id}</td>
                  <td>{order.courseId?.title}</td>
                  <td>{order.totalPrice?.toLocaleString("fa-IR")} تومان</td>

              
                  <td>
                    <span
                      className={
                        order.status === "paid"
                          ? styles.successBadge
                          : order.status === "pending"
                            ? styles.pendingBadge
                            : styles.failedBadge
                      }
                    >
                      {order.status === "paid"
                        ? "پرداخت شده"
                        : order.status === "pending"
                          ? "در انتظار"
                          : "ناموفق"}
                    </span>
                  </td>

              
                  <td>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString("fa-IR")
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {totalOrders > 10 && (
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
