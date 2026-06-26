import connectToDB from "@/configs/ConnectDB";
import Comment from "@/models/Comment";
import getCurrentUser from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const user = getCurrentUser(req);

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || "1";
    const limit = parseInt(searchParams.get("limit")) || "5";

    const skip = (page - 1) * limit;

    const comments = await Comment.find({
      user: user.userId,
    })
      .populate("course", "title slug")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalComments = await Comment.countDocuments({ user: user.userId });

    return NextResponse.json({
      comments,
      totalComments,
      totalPages: Math.ceil(totalComments / limit),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
