import connectToDB from "@/configs/ConnectDB";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import User from "@/models/User";
export async function GET() {
  try {
    await connectToDB();

    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "لطفا اول ثبت نام کنید" },
        { status: 401 },
      );
    }
    let payload;
    try {
      payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    } catch (err) {
      return NextResponse.json(
        { success: false, message: "Token Expired or invalid" },
        { status: 401 },
      );
    }

    const user = await User.findById(payload.userId)
      .select("name phone email role createdAt purchasedCourses")
     //n .populate("purchasedCourses", "title slug thumbnail")
      .lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not Found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.log(error.message)
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
