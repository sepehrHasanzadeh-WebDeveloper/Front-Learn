"use client";
import { useEffect, useState } from "react";
import styles from "./AuthPage.module.css";
import { IoMdArrowRoundBack } from "react-icons/io";
import OtpInputs from "@/components/Features/Auth/OtpInputs";
import { toast } from "sonner";
import Loader from "@/components/Shared/Loader/Loader";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
export default function AuthPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);
  const [timer, setTimer] = useState(120);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { setUser } = useAuth();
  const isPhoneValide = (phone) => /^09\d{9}$/.test(phone);

  const handleSendOtp = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        setIsCodeSent(true);
        toast.success(data.message || "کد با موفقیت ارسال شد.");
      } else {
        toast.error(data.message || "خطا در ارسال کد تایید");
      }
    } catch (error) {
      console.error(error);
      toast.error(data.message || "خطا از سمت سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackToPhone = () => {
    setOtp(["", "", "", ""]);
    setIsCodeSent(false);
    setTimer(120);
    setPhone("");
  };

  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    try {
      setIsLoading(true);
      const res = await fetch("/api/auth/sms/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ phone, otpCode }),
      });
      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        setUser(data.user);
        router.push(data.redirectTo);
      } else {
        toast.error(data.message || "خطا در سرور");
      }
    } catch (error) {
      toast.error(data.message || "خطا در سرور");
    } finally {
      setIsLoading(false);
    }
  };

  const isOtpComplete = otp.every((input) => input !== "");

  const handleResendOtp = async () => {
    try {
      const res = await fetch("/api/auth/sms/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "کد با موفقیت ارسال شد.");
        setOtp(["", "", "", ""]);
        setTimer(120);
      } else {
        toast.error(data.message || "خطا در ارسال کد تایید");
      }
    } catch (error) {
      console.error(error);
      toast.error(data.message || "خطا از سمت سرور");
    }
  };
  useEffect(() => {
    let interval;

    if (isCodeSent && timer > 0) {
      interval = setInterval(() => {
        setTimer((time) => time - 1);
      }, 1000);
    } else if (timer == 0) {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer, isCodeSent]);

  return (
    <>
      <div className={`${styles.authWraper}`}>
        <div className={styles.right}></div>
        <div className={`${styles.form_section}`}>
          {!isCodeSent && (
            <>
              <h2>فرانت لرن</h2>
              <h3>ورود | ثبت نام</h3>
              <p>لطفا شماره موبایل خود را وارد کنید</p>
              <input
                placeholder="شماره موبایل "
                className={styles.form_Input}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              {isLoading ? (
                <Loader />
              ) : (
                <button
                  onClick={handleSendOtp}
                  disabled={!isPhoneValide(phone)}
                >
                  ورود
                </button>
              )}
            </>
          )}
          {isCodeSent && (
            <>
              <h2>فرانت لرن</h2>
              <div className={styles.gotoBack} onClick={handleBackToPhone}>
                <IoMdArrowRoundBack size={"20px"} />
              </div>
              <p>کد تایید برای شماره {phone} ارسال شد</p>
              <h3>کد تایید را وارد کنید</h3>
              <OtpInputs otp={otp} setOtp={setOtp} />
              {isLoading ? (
                <Loader />
              ) : (
                <button onClick={handleVerifyOtp} disabled={!isOtpComplete}>
                  تایید و ورود
                </button>
              )}
              <div className={styles.resendOtp}>
                {timer > 0 ? (
                  <p className={styles.timer}>
                    ارسال مجدد کد تا {timer} ثانیه دیگر
                  </p>
                ) : (
                  <p
                    className={styles.resend}
                    onClick={handleResendOtp}
                    disabled={isResendDisabled}
                  >
                    دریافت مجدد کد تایید
                  </p>
                )}
              </div>
            </>
          )}
        </div>

        <div className={styles.color_section}></div>
      </div>
    </>
  );
}
