import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || "1");
    const limit = 15;
    const filter = {};

    if (searchParams.get("discount") === "true") {
      filter.discountPrice = { $ne: null };
    }

    if (searchParams.get("status")) {
      const statuses = searchParams.get("status").split(",");
      filter.status = { $in: statuses };
    }

    if (searchParams.get("level")) {
      const levels = searchParams.get("level").split(",");
      filter.level = { $in: levels };
    }

    const sort =
      searchParams.get("sort") === "newest" ? { createdAt: -1 } : { _id: 1 };
    const totalCount = await Course.countDocuments(filter);
    const courses = await Course.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit);

    if (!courses) {
      return NextResponse.json(
        { success: false, message: "هیچ دوره ای یافت نشد" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, courses, totalCount });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server error " },
      { status: 500 },
    );
  }
}
