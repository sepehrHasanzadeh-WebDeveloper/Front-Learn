import connectToDB from "@/configs/ConnectDB";
import { Category } from "@/models/Category";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const formData = await req.formData();

    const cleanSlug = formData.get("slug");
    const cleanName = formData.get("name");
    const description = formData.get("description");
    const coursesCount = formData.get("coursesCount");

    if (!cleanSlug || !cleanName) {
      return NextResponse.json(
        { success: false, message: "اسلاگ و نام دسته بندی الزامی میباشد" },
        { status: 400 },
      );
    }

    const existingCategory = await Category.findOne({ cleanSlug });

    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "دسته‌بندی با این اسلاگ قبلاً ثبت شده است.",
        },
        { status: 409 },
      );
    }

    const category = await Category.create({
      slug: cleanSlug,
      name: cleanName,
      description: description?.toString().trim(),
      coursesCount: Number(coursesCount || 0),
    });

    await category.save();

    return NextResponse.json(
      { success: true, message: "دسته بندی جدید با موفقیت اضافه شد." },
      { status: 201 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
