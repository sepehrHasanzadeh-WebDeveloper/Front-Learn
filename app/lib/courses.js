import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";

export async function getCourseBySlug(slug) {
  if (!slug) {
    return null;
  }

  await connectToDB();

  const courseDoc = await Course.findOne({ slug }).lean();
  if (!courseDoc) {
    return null;
  }

  return JSON.parse(JSON.stringify(courseDoc));
}
