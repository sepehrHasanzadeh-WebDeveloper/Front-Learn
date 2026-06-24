import connectToDB from "@/configs/ConnectDB";
import User from "@/models/User";
import getCurrentUser from "@/utils/Auth";

import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    await connectToDB();

    const user = getCurrentUser(req);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "لطفا وارد حساب خود شوید",
        },
        { status: 401 },
      );
    }

    const body = await req.json();

    const { name, email } = body;

    await User.findByIdAndUpdate(user.userId, {
      name,
      email,
    });

    return NextResponse.json({
      success: true,
      message: "اطلاعات با موفقیت بروزرسانی شد",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "خطای سرور",
      },
      { status: 500 },
    );
  }
}
