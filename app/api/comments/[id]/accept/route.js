import connectToDB from "@/configs/ConnectDB";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectToDB();

    const { id } = await params;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { status: "accepted" },
      { new: true },
    );

    if (!updatedComment) {
      return NextResponse.json(
        { success: false, message: "کامنت مورد نظر یافت نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "کامنت با موفقیت تایید شد" },
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
