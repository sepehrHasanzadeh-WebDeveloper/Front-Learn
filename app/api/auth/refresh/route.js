import connectToDB from "@/configs/ConnectDB";
import User from "@/models/User";
import  jwt  from "jsonwebtoken";
import { cookies } from "next/headers";

import { NextResponse } from "next/server";

export async function POST(req) {
  const cookieStore = await cookies();
  
  try {
    const refreshToken = cookieStore.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { success: false, message: "refresh token is not exist" },
        { success: 404 },
      );
    }

    let payload;
    try {
      payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
      // اگر توکن نا معتبر یا منقضی بود پاکشون کن
      cookieStore.delete("refreshToken", { path: "/" });
      cookieStore.delete("accessToken", { path: "/" });
      return NextResponse.json(
        { success: false, message: "Invalid or expired refresh Token" },
        { status: 401 },
      );
    }

    await connectToDB();

    const user = await User.findById(payload.userId);
    if (!user) {
      cookieStore.delete("refreshToken", { path: "/" });
      cookieStore.delete("accessToken", { path: "/" });
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 },
      );
    }

    // ساخت جدید توکن دسترسی
    const newAccessToken = jwt.sign(
      {
        userId: user._id,
        phone: user.phone,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" },
    );
    const response = NextResponse.json({
      success: true,
      message: "توکن با موفقیت تازه سازی شد",
      user: {
        id: user._id.toString(),
        phone: user.phone,
        role: user.role || "user",
      },
    });
    response.cookies.set("accessToken" , newAccessToken , {
      httpOnly:true,
      secure:process.env.NODE_ENV === "production",
      sameSite:"strict",
      maxAge:15 * 60,
      path:"/"
    })
    return response
  } catch (error) {
      cookieStore.delete("refreshToken", { path: "/" });
      cookieStore.delete("accessToken", { path: "/" });
      return NextResponse.json(
        { success: false, message: "Server Error" },
        { status: 500 },
      );
  }
}
