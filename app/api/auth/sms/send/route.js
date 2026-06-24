import connectToDB from "@/configs/ConnectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

// تابع اعتبار سنجی شماره
const validatePhoneNumber = (phone) => /^09\d{9}$/.test(phone);

export async function POST(req) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { success: false, message: "ارسال شماره موبایل اجباری میباشد." },
        { status: 400 },
      );
    }

    if (!validatePhoneNumber(phone)) {
      return NextResponse.json(
        { success: false, message: "شماره موبایل وارد شده صحیح نیست" },
        { status: 400 },
      );
    }

    // connect to db
    await connectToDB();

    const user = await User.findOne({ phone });
    if (user && user.otp.expiresAt > new Date()) {
      // 6:19 > 6:17
      return NextResponse.json(
        {
          success: false,
          message: "کد ارسال شده است. لطفا چند دقیقه بعد امتحان کنید",
        },
        { status: 429 },
      );
    }

    // ساخت کد یک بار مصرف
    const otpCode = Math.floor(Math.random() * 9000) + 1000;
    const expiresAt = new Date().getTime() + 120 * 1000; // برای زمان انقضا کد

    const ippanelRes = await fetch(
      "https://api.iranpayamak.com/ws/v1/sms/pattern",
      {
        method: "POST",
        body: JSON.stringify({
          code: process.env.IPPANEL_PATTERN,
          attributes: {
            code: otpCode,
          },
          recipient: phone,
          line_number: process.env.IPPANEL_FROM,
          number_format: "english",
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Api-Key": process.env.SMS_TOKEN_API,
        },
      },
    );

    // لاگ کردن وضعیت و پاسخ از IPPanel
    console.log("IPPanel Response Status:", ippanelRes.status);
    const ippanelJson = await ippanelRes.json(); // پاسخ را به JSON تبدیل می‌کنیم
    console.log("IPPanel Response Body:", ippanelJson);
    ippanelRes.status === 200 || ippanelRes.status === "success";
    if (true) {
      if (user) {
        user.otp.code = otpCode;
        user.otp.expiresAt = new Date(expiresAt);
        await user.save();
      } else {
        await User.create({
          phone,
          otp: { code: otpCode, expiresAt: new Date(expiresAt) },
        });
      }

      return NextResponse.json(
        { success: true, message: "کد با موفقیت ارسال شد" },
        { status: 200 },
      );
    } else {
      // در صورت بروز خطا از سمت IPPanel
      return NextResponse.json(
        {
          success: false,
          message: `خطا در ارسال کد: ${ippanelJson.message || "Unknown error from IPPanel"}`,
        },
        { status: ippanelRes.status || 500 },
      );
    }
  } catch (error) {
    console.error("Error Sending OTP => ", error);
    // در اینجا هم می‌توانید جزئیات خطای catch شده را لاگ کنید
    // console.log("Full error object:", error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
