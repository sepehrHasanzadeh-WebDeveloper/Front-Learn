import connectToDB from "@/configs/ConnectDB";
import Comment from "@/models/Comment";
import Course from "@/models/Course";
import getCurrentUser from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const user = getCurrentUser(req);
    if (!user) {
      return NextResponse.json(
        { success: false, message: "لطفا ابتدا وارد حساب خود شوید" },
        { status: 401 },
      );
    }

    const { body, courseId } = await req.json();
    console.log(courseId);
    if (!body?.trim()) {
      return NextResponse.json(
        { success: false, message: "متن کامنت اجباری میباشد" },
        { status: 422 },
      );
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return NextResponse.json(
        { success: false, message: "دوره مورد نظر پیدا نشد" },
        { status: 404 },
      );
    }

    const comment = await Comment.create({
      body,
      user: user.userId,
      course: courseId,
    });

    return NextResponse.json(
      {
        message: "کامنت با موفقیت ثبت شد و پس از تایید نمایش داده خواهد شد",
        comment,
      },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
  }
}

export async function GET(req, { searchParams }) {
  try {
    await connectToDB();

    const { searchParams } = new URL(req.url);
    const filter = searchParams.get("filter") || "all";
    const page = parseInt(searchParams.get("page")) || "1";
    const limit = parseInt(searchParams.get("limit")) || "10";

    let query = {};
    switch (filter) {
      case "accepted":
        query.isAccept = true;
        break;

      case "pending":
        query.isAccept = false;
        break;

    case "answered":
  query["answer.body"] = {
    $exists: true,
    $nin: ["", null],
  };
  break;

      default:
        break;
    }
    const skip = (page - 1) * limit;

    const comments = await Comment.find(query)
      .populate("user", "name email")
      .populate("course", "title")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalComments = await Comment.countDocuments(query);

    return NextResponse.json(
      {
        success: true,
        comments,
        totalComments,
        totalPages: Math.ceil(totalComments / limit),
        currentPage: page,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
