import connectToDB from "@/configs/ConnectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
export async function POST(req) {
  try {
    const { phone, otpCode } = await req.json();

    if (!phone || !otpCode) {
      return NextResponse.json(
        { success: false, message: "کد تایید و شماره موبایل الزامی است" },
        { status: 400 },
      );
    }

    await connectToDB();

    const user = await User.findOne({ phone }).select(
      "email phone name role otp purchasedCourses ",
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربری وجود ندارد" },
        { status: 404 },
      );
    }

    const { otp } = user;
    // برسی otp
    if (!otp || otp.code !== otpCode) {
      return NextResponse.json(
        { success: false, message: "کد وارد شده اشتباه میباشد" },
        { status: 401 },
      );
    }
    // برسی زمان انقضا otp

    const currentTime = new Date().getTime();
    const isExpired = currentTime > otp.expiresAt;

    if (isExpired) {
      user.otp = null;
      await user.save();

      return NextResponse.json(
        { success: false, message: "کد منقضی شده است" },
        { status: 410 },
      );
    }

    // ساخت accessToken , refreshToken

    const accessPayload = {
      userId: user._id.toString(),
      phone: user.phone,
      role: user.role,
    };

    const accessToken = jwt.sign(
      accessPayload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7d" }, // انقضا 7 روز
    );

    const refreshToken = jwt.sign(
      accessPayload,
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" },
    );

    user.refreshToken = refreshToken;
    user.otp = null;
    user.isVerified = true;
    user.lastLoginAt = new Date();

    await user.save();

    const cookieStore = await cookies();

    cookieStore.set("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    cookieStore.set("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });

    return NextResponse.json(
      {
        success: true,
        message: "کد تایید شد",
        redirectTo: user.role === "admin" ? "/admin/dashboard" : "/profile",
        user: {
          id: user._id.toString(),
          phone: user.phone,
          name: user.name || "",
          role: user.role,
          purchasedCourses: user.purchasedCourses || [],
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
