import connectToDB from "@/configs/ConnectDB";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    connectToDB();
    const { id } = await params;
    const comments = await Comment.find({
  course: id,
  status: "accepted",
})
  .populate("user", "name email")
  .sort({ createdAt: -1 });
    return NextResponse.json({ comments }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 },
    );
  }
}
