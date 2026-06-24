import connectToDB from "@/configs/ConnectDB";
import { Category } from "@/models/Category";
import { isAdmin } from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const page = searchParams.get("page") || "1";

    let limit = 10;

    const query = search
      ? {
          $or: [{ slug: { $regex: search } }],
        }
      : {};
    const category = await Category.find(query)
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();
    if (!category) {
      return NextResponse.json(
        { success: false, message: "دسته بندی یافت نشد" },
        { status: 404 },
      );
    }
    return NextResponse.json({ success: true, category }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "خطا در دریافت لیست دسته بندی ها" },
      { status: 500 },
    );
  }
}
