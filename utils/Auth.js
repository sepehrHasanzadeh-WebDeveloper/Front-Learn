import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export function isAdmin(req) {
  const accessToken = req.cookies.get("accessToken")?.value;

  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: "accessToken is not found" },
      { status: 401 },
    );
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (payload.role != "admin") {
      return NextResponse.json(
        { success: false, message: "privet route || you are not allowed" },
        { status: 403 },
      );
    }
    return { isAdmin: true };
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "accessToken is expired" },
      { status: 401 },
    );
  }
}

export default function getCurrentUser(req) {
  const accessToken = req.cookies.get("accessToken")?.value;
  if (!accessToken) {
    return NextResponse.json(
      { success: false, message: "لطفا ابتدا به سایت ورود کنید" },
      { status: 401 },
    );
  }

  let payload;
  try {
    payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    return { success: true, userId: payload.userId };
  } catch (err) {
    return NextResponse.json(
      { success: false, message: "invalid or expired token" },
      { status: 401 },
    );
  }
}
