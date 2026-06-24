import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";
import User from "@/models/User";
import getCurrentUser from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const currentUser = getCurrentUser(req);

    if (!currentUser?.userId) {
      return NextResponse.json(
        { success: false, message: "you are not allowed" },
        { status: 401 },
      );
    }

    const user = await User.findById(currentUser.userId).populate(
      "purchasedCourses",
    );

    if (!user) {
      return NextResponse.json(
        { success: false, message: "کاربر یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      success: true,
      courses: user.purchasedCourses,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}
