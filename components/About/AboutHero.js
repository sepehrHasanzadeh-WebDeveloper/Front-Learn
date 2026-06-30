"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";

const technologies = [
  {
    name: "React",
    description: "رابط‌های کاربری تعاملی",
    border: "border-cyan-500/30",
    bg: "bg-cyan-500/10",
    style: "top-0 left-0 sm:top-0 sm:left-4 lg:-top-5 lg:left-5",
  },
  {
    name: "Next.js",
    description: "اپلیکیشن‌های مدرن وب",
    border: "border-zinc-500/30",
    bg: "bg-zinc-500/10",
    style: "top-8 right-0 sm:top-12 sm:right-2 lg:top-16 lg:-right-5",
  },
  {
    name: "JavaScript",
    description: "زبان اصلی وب",
    border: "border-yellow-500/30",
    bg: "bg-yellow-500/10",
    style: "bottom-8 left-0 sm:bottom-10 sm:left-2 lg:bottom-10 lg:left-0",
  },
  {
    name: "CSS",
    description: "طراحی رابط کاربری",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    style: "bottom-0 right-2 sm:bottom-0 sm:right-4 lg:bottom-0 lg:right-8",
  },
];

function FloatingCard({ tech, index }) {
  const { themeg } = useTheme();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ y: [0, -10, 0], opacity: 1 }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.1 },
        y: {
          duration: 4 + index,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      whileHover={{ scale: 1.05 }}
      className={`
        absolute
        w-32 sm:w-40 lg:w-52
        p-3 sm:p-4 lg:p-5
        rounded-2xl
        border
        ${tech.border}
        ${tech.bg}
        ${tech.style}
        backdrop-blur-xl
        shadow-xl
      `}
    >
      <h3 className="text-sm sm:text-base lg:text-lg font-bold">{tech.name}</h3>

      <p className={`mt-2 text-xs sm:text-sm ${themeg === "light" ? "text-gray-500" : "text-white"}`}>
        {tech.description}
      </p>
    </motion.div>
  );
}

export default function AboutHero() {
   const { themeg } = useTheme();
  return (
    <section className="min-h-screen flex items-center px-6 mb-5 mt-5 ">
      <div className="mx-auto grid max-w-7xl  items-center gap-16 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="text-right "
        >
          <span className="font-medium text-violet-500">
            درباره Front Learn
          </span>

          <h2 className="mt-4 mb-4 font-bold leading-tight lg:text-6xl">
            یادگیری فرانت‌اند با پروژه‌های واقعی
          </h2>

          <p className={`mt-6 max-w-xl text-lg ${themeg === "light" ? "text-gray-500" : "text-gray-100"} `}>
            Front Learn یک پلتفرم آموزشی برای توسعه‌دهندگان فرانت‌اند است که با
            مسیرهای یادگیری هدفمند، پروژه‌های عملی و تکنولوژی‌های مدرن وب،
            یادگیری را ساده‌تر می‌کند.
          </p>

          <Link
            href="/courses"
            className="  mt-8 inline-block rounded-[15px] bg-gradient-to-r from-violet-500 to-sky-500 px-5 py-3 font-medium text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(139,92,246,0.4)] shadow-lg"
          >
            مشاهده دوره‌ها
          </Link>
        </motion.div>

        <div className="relative flex h-[500px] items-center justify-center">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className=" flex h-72 w-72 items-center  justify-center rounded-3xl border border-violet-500/20 bg-gradient-to-br from-violet-500/10 to-sky-500/10 shadow-2xl backdrop-blur-xl"
          >
            <div className="text-center ">
              <h2 className="text-4xl font-bold text-violet-600">
                Front Learn
              </h2>
              <p className={`mt-3  ${themeg === "light" ? "text-gray-500" : "text-white"}`}>مسیر یادگیری توسعه فرانت‌اند</p>
            </div>
          </motion.div>

          {technologies.map((tech, index) => (
            <FloatingCard key={tech.name} tech={tech} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
