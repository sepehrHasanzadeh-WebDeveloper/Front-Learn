"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutDeveloperSection() {
  const { themeg } = useTheme();
  return (
    <section
      className={`py-5 rounded-2xl px-4 ${themeg === "light" && "bg-white"} my-5`}
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold my-5 text-gray-900 "
        >
          این پروژه توسط چه کسی ساخته شده؟
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={` mt-14 ${themeg === "dark" ? "bg-[#10101b81]" : "bg-white border"} border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300`}
        >
          <div className="w-24 h-24 mx-auto rounded-full p-[2px] bg-gradient-to-r from-violet-500 to-sky-500">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <Image
                src="/images/My-avatar.jpg"
                alt="سپهر حسن زاده"
                width={96}
                height={96}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <h3 className="text-2xl font-bold mt-6 text-gray-900">
            سپهر حسن زاده
          </h3>

          <p
            className={`${themeg === "dark" ? "text-white" : "text-gray-600"} mt-2`}
          >
            Frontend Developer | React & Next.js
          </p>

          <p
            className={`${themeg === "dark" ? "text-white" : "text-gray-500"} mt-6 leading-relaxed max-w-xl mx-auto`}
          >
            این پروژه به عنوان یک نمونه‌کار برای نمایش مهارت‌های فرانت‌اند طراحی
            شده است. هدف آن ساخت یک تجربه یادگیری ساده، مدرن و پروژه‌محور برای
            توسعه‌دهندگان است.
          </p>

          <div className="flex justify-center gap-6 mt-8">
            <Link
              href="https://github.com/sepehrHasanzadeh-WebDeveloper?tab=overview&from=2025-06-01&to=2025-06-30"
              className={`flex items-center gap-2 transition no-underline ${
                themeg === "light"
                  ? "text-gray-700 hover:text-black"
                  : "text-gray-300 hover:text-white"
              }`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <FaGithub />
              GitHub
            </Link>

            <Link
              href="#"
              className={`flex items-center gap-2 transition no-underline ${
                themeg === "light"
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-gray-300 hover:text-sky-400"
              }`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <FaLinkedin />
              LinkedIn
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
