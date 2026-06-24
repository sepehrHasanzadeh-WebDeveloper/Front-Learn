import connectToDB from "@/configs/ConnectDB";
import Package from "@/models/Package";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    await connectToDB();

    const packages = await Package.find({}).lean();
    
    return NextResponse.json({ success: true, packages });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "خطا در دریافت اطلاعات " },
      { status: 500 },
    );
  }
}
