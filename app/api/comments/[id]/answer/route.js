import connectToDB from "@/configs/ConnectDB";
import Comment from "@/models/Comment";
import { NextResponse } from "next/server";

export async function PATCH(req, { params }) {
  try {
    await connectToDB();

    const { id } = params;
    const { body } = await req.json();

    if (!body?.trim()) {
      return NextResponse.json(
        { success: false, message: "متن پاسخ الزامی است" },
        { status: 422 }
      );
    }

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      {
        status: "accepted",
        answer: {
          body,
          createdAt: new Date(),
        },
      },
      { new: true }
    );

    if (!updatedComment) {
      return NextResponse.json(
        { success: false, message: "کامنت پیدا نشد" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "پاسخ با موفقیت ثبت شد",
      },
      { status: 200 }
    );

  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { success: false, message: "خطای سرور" },
      { status: 500 }
    );
  }
}