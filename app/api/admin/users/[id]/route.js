import connectToDB from "@/configs/ConnectDB";
import User from "@/models/User";
import { isAdmin } from "@/utils/Auth";
import { updateUserSchema } from "@/validations/userEditValidator";

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
        { success: false, message: "ایدی کاربر الزامی میباشد" },
        { status: 401 },
      );
    }

    const result = await User.deleteOne({ _id: id });
    if (result.deletedCount == 0) {
      return NextResponse.json(
        { success: false, message: "کاربر پیدا نشد " },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { success: true, message: "کاربر با موفقیت حذف شد" },
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}

export async function PATCH(req, { params }) {
  try {
    await connectToDB();
    
    const auth = isAdmin(req);
    if (!auth.isAdmin) {
      return auth;
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "userID is required" },
        { status: 400 },
      );
    }

    const body = await req.json();
    const { email, name, role } = body;

   
    const validateResult = updateUserSchema.safeParse({ name, email, role });

    if (!validateResult.success) {
      return NextResponse.json(
        { success: false, message: validateResult.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const existingEmail = await User.findOne({
      email,
      _id: { $ne: id },
    });

    if (existingEmail) {
      return NextResponse.json(
        { success: false, message: "ایمیل وارد شده تکراری میباشد" },
        { status: 401 },
      );
    }

    const user = await User.findById(id);

    if (!user) {
      return NextResponse.json(
        { success: false, message: "user not found" },
        { status: 404 },
      );
    }

    if (name !== undefined) user.name = name.trim() || "";
    if (email !== undefined) user.email = email.trim() || "";
    if (role !== undefined) user.role = role;

    await user.save();

    const updatedUser = await User.findById(id).select("name email role");

    return NextResponse.json({
      success: true,
      message: "کاربر با موفقیت اپدیت شد",
      user: updatedUser,
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "server error" },
      { status: 500 },
    );
  }
}
