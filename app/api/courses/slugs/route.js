import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";
import { NextResponse } from "next/server";

export async function GET () {
    try {
        await connectToDB();
        const slugs = await Course.find().select("slug title")
        if(!slugs) {
            return NextResponse.json(
                {success:false , message:"هیچ اسلاگی پیدا نشد"},
                {status:404}
            )
        }

        return NextResponse.json({slugs})
    }catch(err) {
        return NextResponse.json(
            {success:false , message:"Server Error"},
            {status:500}
        )
    }
}