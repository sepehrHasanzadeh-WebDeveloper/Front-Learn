import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectToDB from "@/configs/ConnectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";
export async function POST() {
  try {
    const cookieStore = await cookies();

    const refreshToken = cookieStore.get("refreshToken")?.value;
    let userId = null;

    if (refreshToken) {
      try {
        const payload = jwt.verify(
          refreshToken,
          process.env.REFRESH_TOKEN_SECRET,
        );
        userId = payload.userId;
      } catch (err) {
        console.log("Refresh token invalid durimg logout ", err.message);
      }
    }
    if (userId) {
      await connectToDB().catch(() => {});

      await User.findByIdAndUpdate(userId, {
        $unset: { refreshToken: "" },
      }).catch((err) => {
        console.log("Failed to unset refreshToken in DB: ", err.message);
      });
    }

    const response = NextResponse.json(
      { success: true, message: "خروج با موفقیت" },
      { status: 200 },
    );

    const cookieOption = {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    };

    response.cookies.delete("accessToken", cookieOption);
    response.cookies.delete("refreshToken", cookieOption);
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "مشکلی از سمت سرور به وجود امد" },
      { status: 500 },
    );
  }
}
