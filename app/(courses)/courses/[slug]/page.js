import { getCourseBySlug } from "@/app/lib/courses";
import CourseClient from "./CourseClient";
import { notFound } from "next/navigation";
import connectToDB from "@/configs/ConnectDB";
import Course from "@/models/Course";

export async function generateMetadata({ params }) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "دوره پیدا نشد",
      description: "این دوره وجود ندارد",
    };
  }

  return {
    title: course.title,
    description: (course.shortDescription || "").slice(0, 160),
    openGraph: {
      title: course.title,
      description: (course.shortDescription || "").slice(0, 160),
    },
  };
}

export async function generateStaticParams() {
  await connectToDB();

  const courses = await Course.find().select("slug").lean();
  if (!courses) {
    notFound();
  }
  return courses.map((course) => ({ slug: course.slug }));
}

export default async function CoursePage({ params }) {
  const { slug } = await params;

  const course = await getCourseBySlug(slug);

  if (!course) {
    return notFound();
  }

  return <CourseClient course={course} />;
}
