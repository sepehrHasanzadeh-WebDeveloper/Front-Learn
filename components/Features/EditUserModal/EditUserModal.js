"use client";
import { useEffect, useState } from "react";
import styles from "./EditUserModal.module.css";
import { MdClose } from "react-icons/md";

export default function EditUserModal({
  isModalOpen,
  onClose,
  user,
  onSubmit,
}) {
  const [isBtnActive, setIsBtnActive] = useState(true);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    role: "user",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        id: user._id,
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        role: user?.role || "user",
      });
    }
  }, [user]);

  if (!isModalOpen) return null;

  const handleChange = (e) => {
    setIsBtnActive(false);
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const HandleSave = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.model_header}>
          <h4>ویرایش اطلاعات کاربر</h4>
          <MdClose size={24} style={{ cursor: "pointer" }} onClick={onClose} />
        </div>

        <div style={{ padding: "25px" }}>
          <label>نام</label>
          <input name="name" value={formData.name} onChange={handleChange} />

          <label>ایمیل</label>
          <input name="email" value={formData.email} onChange={handleChange} />

          <label>شماره موبایل</label>
          <input name="phone" value={formData.phone} onChange={handleChange} />
          <label>نقش</label>
          <select name="role" value={formData.role} onChange={handleChange}>
            <option value="user">کاربر عادی</option>
            <option value="admin">ادمین</option>
          </select>

          <div className={styles.actions}>
            <button onClick={onClose} className={styles.cancel}>
              لغو
            </button>
            <button
              disabled={isBtnActive}
              onClick={HandleSave}
              className={styles.save}
            >
              ذخیره تغییرات
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
