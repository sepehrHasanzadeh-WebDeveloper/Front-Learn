import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";
import { isAdmin } from "@/utils/Auth";
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
export async function POST(req) {
  try {
    await connectToDB();
    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const formData = await req.formData();

    const title = formData.get("title");
    const shortDescription = formData.get("shortDescription");
    const fullDescription = formData.get("fullDescription");
    const price = formData.get("price");
    const discountPrice = formData.get("discountPrice");
    const isFree = formData.get("isFree") === "true";
    const level = formData.get("level") || "beginner";
    const status = formData.get("status") || "draft";
    const category = formData.get("category") || "";
    const slug = formData.get("slug");
    const thumbnail = formData.get("thumbnail");
    const chaptersJson = formData.get("chapters");
    const categoryValue = category && category.trim() !== "" ? category : null;
    if (!title || title.length < 5) {
      return NextResponse.json(
        { success: false, message: "عنوان دوره باید بیشتر از 5 کاراکتر باشه" },
        { status: 400 },
      );
    }

    if (!shortDescription || shortDescription.length < 50) {
      return NextResponse.json(
        {
          success: false,
          message: "توضیحات کوتاه دوره باید بیشتر از 50 کاراکتر باشه",
        },
        { status: 400 },
      );
    }

    if (!thumbnail || !(thumbnail instanceof File)) {
      return NextResponse.json(
        { success: false, message: "تصویر دوره الزامی میباشد" },
        { status: 400 },
      );
    }

    if (!slug) {
      return NextResponse.json(
        { success: false, message: "slug معتبر وارد کنید" },
        { status: 400 },
      );
    }

    let chapters = [];
    if (chaptersJson) {
      try {
        chapters = JSON.parse(chaptersJson.toString());
        if (!Array.isArray(chapters) || chapters.length === 0) {
          return NextResponse.json(
            { success: false, message: "حداقل یک فصل لازم است" },
            { status: 400 },
          );
        }
        for (const ch of chapters) {
          if (!ch.title?.trim()) {
            return NextResponse.json(
              { success: false, message: "عنوان هر فصل الزامی میباشد" },
              { status: 400 },
            );
          }
          if (!Array.isArray(ch.lessons) || ch.lessons.length === 0) {
            return NextResponse.json(
              { success: false, message: "هر فصل حداقل یک درس نیاز دارد" },
              { status: 400 },
            );
          }
          for (const les of ch.lessons) {
            if (!les.title?.trim()) {
              return NextResponse.json(
                { success: false, message: "عنوان هر درس الزامی میباشد" },
                { status: 400 },
              );
            }

            if (!les.duration?.trim()) {
              return NextResponse.json(
                { success: false, message: "مدت زمان هر ویدیو الزامی میباشد" },
                { status: 400 },
              );
            }
          }
        }
      } catch (err) {
        return NextResponse.json(
          { success: false, message: "فرمت فصل ها و درس ها معتبر نیست" },
          { status: 400 },
        );
      }
    }

    const slugExisting = await Course.findOne({ slug });
    if (slugExisting) {
      return NextResponse.json(
        { success: false, message: `این slug قبلا استفاده شده.` },
        { status: 400 },
      );
    }

    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(thumbnail.name)}`;

    const uploadDir = path.join(process.cwd(), "public", "images", "courses");

    await mkdir(uploadDir, { recursive: true });
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, buffer);

    const imageUrl = `/images/courses/${filename}`;

    let totalLessons = 0;
    for (const ch of chapters) {
      totalLessons += ch.lessons.length;
    }

    const newCourse = new Course({
      title,
      slug,
      shortDescription,
      fullDescription,
      price: isFree ? 0 : Number(price),
      discountPrice: discountPrice ? Number(discountPrice) : null,
      isFree,
      level,
      status,
      category: categoryValue,
      thumbnail: imageUrl,
      chapters,
      lessonsCount: totalLessons,
    });

    await newCourse.save();
    return NextResponse.json(
      { success: true, message: "دوره جدید با موفقیت اضافه شد." },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
