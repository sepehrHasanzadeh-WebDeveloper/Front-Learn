import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await connectToDB();

    const { slug } = await params;

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "اسلاگ دوره مورد نظر را ارسال کنید (slug)" },
        { status: 401 },
      );
    }

    const course = await Course.findOne({ slug });
    if (!course) {
      return NextResponse.json(
        { success: false, message: "دوره مورد نظر پیدا نشد" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, course });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
