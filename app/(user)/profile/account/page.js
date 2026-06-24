"use client";

import { Container } from "react-bootstrap";
import styles from "./Account.module.css";
import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

export default function Account() {
    const {user} = useAuth()
  const [name, setName] = useState(user?.name);
  const [email, setEmail] = useState(user?.email);
  const [loading, setLoading] = useState(false);
  const submitInfoHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await fetch("/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        
        throw new Error(data.message);
      }

      toast.success("اطلاعات شما با موفقیت ثبت شد");
    } catch (err) {
      toast.error(err.message || "خطایی هنگام ثبت اطلاعات پیش آمد");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="p-3 m-2">
      <div className={styles.profileContainer}>
        <div className={styles.profileCard}>
          <div className={styles.header}>
            <h1>ویرایش پروفایل</h1>
            <p>اطلاعات حساب کاربری خود را مدیریت کنید.</p>
          </div>

          <form className={styles.form} onSubmit={submitInfoHandler}>
            <div className={styles.formGroup}>
              <label>نام و نام خانوادگی</label>
              <input
                type="text"
                placeholder="نام خود را وارد کنید"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label>ایمیل</label>
              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={styles.submitBtn}
            >
              {loading ? "در حال ذخیره..." : "ذخیره تغییرات"}
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
}
