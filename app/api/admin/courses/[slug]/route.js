import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";
import { isAdmin } from "@/utils/Auth";
import { NextResponse } from "next/server";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
export async function GET(req, { params }) {
  try {
    await connectToDB();

    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        { success: false, message: "slug دوره الزامی میباشد" },
        { status: 400 },
      );
    }

    const course = await Course.find({ slug });

    if (!course) {
      return NextResponse.json(
        { success: false, message: "دوره مورد نظر پیدا نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, course }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectToDB();

    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const { slug } = await params;
    if (!slug) {
      return NextResponse.json(
        { success: false, message: "slug دوره الزامی میباشد" },
        { status: 400 },
      );
    }

    const result = await Course.deleteOne({ slug });

    if (result.deletedCount == 0) {
      return NextResponse.json(
        { success: false, message: "دوره مورد نظر پیدا نشد" },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "دوره مورد نظر با موفقیت حذف شد" },
      { status: 200 },
    );
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}

export async function PUT(req, { params }) {
  try {
    await connectToDB();
    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const { slug: urlSlug } = await params;
    if (!urlSlug) {
      return NextResponse.json(
        { success: false, message: "اسلاگ معتبر نیست" },
        { status: 400 },
      );
    }

    const course = await Course.findOne({ slug: urlSlug });
    if (!course) {
      return NextResponse.json(
        { success: false, message: "دوره یافت نشد" },
        { status: 404 },
      );
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
    const updatedSlug = formData.get("slug");
    const thumbnail = formData.get("thumbnail");
    const chaptersJson = formData.get("chapters");

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

    if (updatedSlug != urlSlug) {
      const existingSlug = await Course.findOne({ slug: updatedSlug });
      if (existingSlug) {
        return NextResponse.json(
          { success: false, message: "شما قبلا از این اسلاگ استفاده کرده اید" },
          { status: 400 },
        );
      }
    }

    let imgUrl = course.thumbnail;
    if (thumbnail && thumbnail instanceof File) {
      const bytes = await thumbnail.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(thumbnail.name)}`;
      const uploadDir = path.join(process.cwd(), "public", "images", "courses");
      await mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, filename);
      await writeFile(filePath, buffer);
      imgUrl = `/images/courses/${filename}`;
    }

    course.title = title;
    course.slug = updatedSlug;
    course.shortDescription = shortDescription;
    course.fullDescription = fullDescription;
    course.price = Number(price);
    course.discountPrice = discountPrice ? Number(discountPrice) : null;
    course.isFree = isFree;
    course.level = level;
    course.status = status;
    if (category && category.trim() !== "") {
      course.category = category;
    } else {
      course.category = undefined;
    }
    course.thumbnail = imgUrl;
    course.chapters = chapters;

    let totalLessons = 0;
    for (const ch of chapters) {
      totalLessons += ch.lessons.length;
    }

    await course.save();
    return NextResponse.json(
      { success: true, message: "دوره جدید با موفقیت بروزرسانی شد." },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 500 },
    );
  }
}
