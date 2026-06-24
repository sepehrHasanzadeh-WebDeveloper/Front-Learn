import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get("limit")) || 8;

    const courses = await Course.find({ status: "published" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .select(
        "_id title price slug shortDescription thumbnail discountPrice level isFree studentsCount ",
      )
      .lean();

    return NextResponse.json({ courses });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: "خطا در دریافت اطلاعات" },
      { status: 500 },
    );
  }
}
