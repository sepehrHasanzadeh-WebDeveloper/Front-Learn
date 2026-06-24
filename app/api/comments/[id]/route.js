import connectToDB from "@/configs/ConnectDB";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();
    const { id } = await params;

    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return NextResponse.json({ message: "کامنت پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(
      {
        success: true,
        message: "کامنت با موفقیت حذف شد",
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
