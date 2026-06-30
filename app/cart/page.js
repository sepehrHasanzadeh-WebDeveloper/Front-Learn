"use client";
import { Col, Container, Row } from "react-bootstrap";
import styles from "./Cart.module.css";
import Image from "next/image";
import { MdDelete } from "react-icons/md";
import { FaChalkboardTeacher, FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Cart() {

  const [orderLoading, setOrderLoading] = useState(false);
  const { cart, cartCount, totalPrice, removeFromCart, clearCart } = useCart();
  const {refreshUser} = useAuth()
const checkOutOrderhandler = async () => {
  try {
    setOrderLoading(true);

    const res = await fetch("/api/cart/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        courseIds: cart.map((course) => course._id),
      }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      return toast.error(data.message || "خطا در ثبت سفارش");
    }

    await refreshUser();
    clearCart();

    toast.success(data.message);
  } catch (err) {
    
    toast.error("خطای شبکه یا سرور رخ داد");
  } finally {
    setOrderLoading(false);
  }
};

  if (cartCount === 0) {
    return (
      <Container className="mt-10 ">
        <div className={styles.empty_cart}>
          <FaShoppingCart size={89} color="#0ea5e9" />
          <h2>سبد خرید شما خالی است</h2>
          <p>هنوز دوره ای به سبد خرید اضافه نکرده‌اید.</p>
          <Link className={styles.a_view_all_courses} href={"/courses"}>
            مشاهده دوره ها
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      <Container className="mt-10 p-5">
        <p className="cursor-pointer ">
          {" "}
          <span className="text-black/50">صفحه اصلی </span> {`>`} سبد خرید{" "}
        </p>
        <strong className="fs-4">سبد خرید شما</strong>
        <Row className="g-5">
          <Col sm={12} md={12} lg={8}>
            <div className={styles.cart_content}>
              {cart.map((course) => (
                <div className={styles.cart_item_content} key={course._id}>
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    width={200}
                    height={120}
                    className="cursor-pointer"
                  />
                  <div className={styles.cart_item_info}>
                    <div className={styles.cart_item_head}>
                      <span className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 inset-ring inset-ring-purple-700/10">
                        {course.slug}
                      </span>
                      <span
                        onClick={() => removeFromCart(course._id)}
                        className="inline-flex items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-sky-700 inset-ring inset-ring-sky-700/10"
                      >
                        {" "}
                        <MdDelete size={23} />
                      </span>
                    </div>
                    <p className={styles.cart_title}>{course.title}</p>
                    <div className={styles.teacher_info}>
                      <FaChalkboardTeacher />
                      سپهر حسن زاده
                    </div>
                    <strong className={styles.cart_price}>
                      {course.price.toLocaleString("fa-IR")} تومان{" "}
                    </strong>
                  </div>
                </div>
              ))}
              <div className={styles.discount_box}>
                <span className={styles.discount_title}>کد تخفیف</span>
                <div className={styles.discount_row}>
                  <input
                    placeholder="کد تخفیف خود را وارد کنید"
                    type="text"
                    className={`${styles.input_discount} bg-gray-100 focus:outline-sky-200`}
                  />
                  <button className={styles.btn_discount}>اعمال کد</button>
                </div>
              </div>
            </div>
          </Col>
          <Col sm={12} md={12} lg={4}>
          <div className={styles.pric_summery_box} style={{padding:"20px "}}>
            <div className={styles.summary_header}>
              <strong>خلاصه سبد خرید</strong>
              <p>1 دوره</p>
            </div>

            <hr />

            <div className={styles.summary_row}>
              <strong>مجموع قیمت</strong>
              <p>{totalPrice.toLocaleString("fa-IR")} تومان</p>
            </div>

            <div className={styles.summary_row}>
              <strong>پرداخت نهایی</strong>
              <p className={styles.final_price}>
                {totalPrice.toLocaleString("fa-IR")} تومان
              </p>
            </div>

            <button
              className={styles.btn_done_buy}
              disabled={orderLoading}
              onClick={checkOutOrderhandler}
            >
             {orderLoading ? "در حال پردازش سفارش" :" تکمیل خرید"}
            </button>

            <p className={styles.payment_note}>
              پرداخت امن از طریق درگاه بانکی
            </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
