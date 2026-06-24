import connectToDB from "@/configs/ConnectDB";
import Order from "@/models/Order";
import { isAdmin } from "@/utils/Auth";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return NextResponse.json(
        { success: false, message: "دسترسی غیرمجاز" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page")) || "1";
    const limit = parseInt(searchParams.get("limit")) || "10";
    const status = searchParams.get("status");

    let filter = {};
    if (status) {
      filter.status = status;
    }

    const skip = (page - 1) * limit;

    const orders = await Order.find(filter)
      .populate("userId", "name _id")
      .populate("courseId", "title _id")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalOrders = await Order.countDocuments(filter);

    return NextResponse.json({
      success: true,
      message: "Orders fetched successfully",
      orders,
      totalOrders,
      totalPages: Math.ceil(totalOrders / limit),
      currentPage: page,
    });
  } catch (error) {
 

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 },
    );
  }
}
