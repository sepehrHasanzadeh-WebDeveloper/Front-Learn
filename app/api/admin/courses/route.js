import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";
import { isAdmin } from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = searchParams.get("page") || "1";

    let limit = 5;

    const query = search ? { $or: [{ title: { $regex: search } }] } : {};

    const courses = await Course.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    const totalCourse = await Course.countDocuments(query);

    return NextResponse.json(
      { success: true, courses, totalCourse },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "خطا در دریافت اطلاعات دوره ها" },
      { status: 500 },
    );
  }
}
