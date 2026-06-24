import { useEffect, useRef } from "react";
import styles from "./OtpInputs.module.css";
export default function OtpInputs({ otp, setOtp }) {
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length == 1) {
      const updateOtp = [...otp];
      updateOtp[index] = value;
      setOtp(updateOtp);

      if (index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };
  const handleKeyDown = (e, index) => {
    if (e.key == "Backspace") {
      if (otp[index] == "" && index > 0) {
        const updateOtp = [...otp];
        updateOtp[index - 1] = "";
        setOtp(updateOtp);
        inputRefs.current[index - 1].focus();
      } else {
        const updateOtp = [...otp];
        updateOtp[index] = "";
        setOtp(updateOtp);
      }
    }
  };
  return (
    <>
      <div className={styles.otpInputWraper}>
        <input
          type="text"
          className={styles.otpInput}
          maxLength={1}
          inputMode="numeric"
          ref={(el) => (inputRefs.current[0] = el)}
          onChange={(e) => handleChange(e, 0)}
          onKeyDown={(e) => handleKeyDown(e, 0)}
          value={otp[0]}
        />
        <input
          type="text"
          className={styles.otpInput}
          maxLength={1}
          inputMode="numeric"
          ref={(el) => (inputRefs.current[1] = el)}
          onChange={(e) => handleChange(e, 1)}
          onKeyDown={(e) => handleKeyDown(e, 1)}
          value={otp[1]}
        />
        <input
          type="text"
          className={styles.otpInput}
          maxLength={1}
          inputMode="numeric"
          ref={(el) => (inputRefs.current[2] = el)}
          onChange={(e) => handleChange(e, 2)}
          onKeyDown={(e) => handleKeyDown(e, 2)}
          value={otp[2]}
        />
        <input
          type="text"
          className={styles.otpInput}
          maxLength={1}
          inputMode="numeric"
          ref={(el) => (inputRefs.current[3] = el)}
          onChange={(e) => handleChange(e, 3)}
          onKeyDown={(e) => handleKeyDown(e, 3)}
          value={otp[3]}
        />
      </div>
    </>
  );
}
