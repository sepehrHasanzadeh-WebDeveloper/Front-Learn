"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { motion } from "framer-motion";

const cards = [
  {
    title: "آموزش ساده",
    desc: "مفاهیم پیچیده فرانت‌اند به زبان ساده و قابل فهم توضیح داده می‌شوند.",
  },
  {
    title: "پروژه محور",
    desc: "یادگیری همراه با ساخت پروژه‌های واقعی و کاربردی.",
  },
  {
    title: "مسیر یادگیری مشخص",
    desc: "یادگیری مرحله به مرحله از پایه تا سطح حرفه‌ای.",
  },
];

export default function AboutDescription() {
  const { themeg } = useTheme();

  return (
    <section
      className={`py-4 rounded-2xl px-4 transition-all duration-300 ${
        themeg === "light" ? "bg-white" : "bg-[#10101977]"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={`text-3xl md:text-4xl font-bold text-center ${
            themeg === "light" ? "text-gray-900" : "text-white"
          }`}
        >
          چرا Front Learn ساخته شد؟
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className={`text-center mt-6 max-w-2xl mx-auto ${
            themeg === "light" ? "text-gray-600" : "text-gray-300"
          }`}
        >
          Front Learn تلاش می‌کند یادگیری فرانت‌اند را ساده، ساختارمند و
          پروژه‌محور کند تا مسیر یادگیری برای همه قابل فهم و کاربردی باشد.
        </motion.p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {cards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.03 }}
              className={`p-6 flex flex-col items-center text-center transition-all duration-300 ${
                themeg === "light"
                  ? "rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-xl"
                  : `
      rounded-[24px]
      text-white
      bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))]
      backdrop-blur-[22px]
      border border-white/[0.08]
      shadow-[inset_0_1px_0_rgba(255,255,255,0.12),inset_0_-1px_0_rgba(255,255,255,0.02),0_20px_60px_rgba(0,0,0,0.35)]
      hover:-translate-y-2
      hover:border-violet-400/30
      hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_25px_70px_rgba(120,80,255,0.22)]
    `
              }`}
            >
              <h3
                className={`text-xl font-bold ${
                  themeg === "light" ? "text-gray-900" : "text-white"
                }`}
              >
                {card.title}
              </h3>

              <p
                className={`mt-3 leading-relaxed ${
                  themeg === "light" ? "text-gray-600" : "text-gray-300"
                }`}
              >
                {card.desc}
              </p>

              <div className="mt-6 h-1 w-14 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-sky-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
