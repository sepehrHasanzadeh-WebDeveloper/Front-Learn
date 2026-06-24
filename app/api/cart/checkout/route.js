import connectToDB from "@/configs/ConnectDB";
import User from "@/models/User";
import Course from "@/models/Course";
import Order from "@/models/Order";
import getCurrentUser from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    // گرفتن یوزر لاگین شده
    const currentUser = getCurrentUser(req);
    if (!currentUser.success) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا ابتدا به سایت ورود کنید",
        },
        { status: 401 }
      );
    }

    const { courseIds } = await req.json();

    const user = await User.findById(currentUser.userId);
    if (!user) {
      return NextResponse.json(
        { message: "کاربری با مشخصات شما پیدا نشد" },
        { status: 404 }
      );
    }

    // گرفتن اطلاعات دوره‌ها (برای Order)
    const courses = await Course.find({
      _id: { $in: courseIds },
    });

    if (!courses.length) {
      return NextResponse.json(
        { message: "هیچ دوره‌ای پیدا نشد" },
        { status: 404 }
      );
    }

    // 1. اضافه کردن دوره‌ها به کاربر (My Courses)
    user.purchasedCourses.push(...courseIds);

    await user.save();

    // 2. ساخت Order برای هر دوره
    const orders = courses.map((course) => ({
      userId: user._id,
      userName: user.name,
      courseId: course._id,
      courseTitle: course.title,
      totalPrice: course.price,
      status: "paid",
      createdAt: new Date(),
    }));

    await Order.insertMany(orders);

    return NextResponse.json({
      success: true,
      message: "خرید با موفقیت انجام شد",
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: "خطایی سمت سرور رخ داد" },
      { status: 500 }
    );
  }
}