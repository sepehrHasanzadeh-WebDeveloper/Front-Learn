import connectToDB from "@/configs/ConnectDB";
import Comment from "@/models/Comment";
import Course from "@/models/Course";
import Order from "@/models/Order";
import User from "@/models/User";
import { isAdmin } from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();
    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const users = await User.countDocuments();
    const courses = await Course.countDocuments();
    const publishedCourse = await Course.countDocuments({
      status: "published",
    });

    const comments = await Comment.countDocuments();

   const notAcceptedComments = await Comment.countDocuments({
  status: { $ne: "accepted" },
});
    

    const latestComments = await Comment.find({})
      .select("user course body createdAt")
      .populate("user", "name")
      .populate("course", "title slug")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    const ordersCount = await Order.countDocuments();

    const latestOrders = await Order.find({})
      .select("courseTitle totalPrice userName createdAt ")
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return NextResponse.json(
      {
        success: true,
        users,
        courses,
        publishedCourse,
        comments,
        notAcceptedComments,
        latestComments,
        ordersCount,
        latestOrders,
      },
      { status: 200 },
    );
  } catch (err) {
 
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
