import connectToDB from "@/configs/ConnectDB";
import { Category } from "@/models/Category";
import { isAdmin } from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ایدی الزامی میباشد" },
        { status: 400 },
      );
    }

    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, message: "چنین دسته بندی ای وجود ندارد" },
        { status: 404 },
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json(
      { success: true, message: "دسته بندی با موفقیت حذف شد" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "خطا در حذف دسته بندی" },
      { status: 500 },
    );
  }
}
