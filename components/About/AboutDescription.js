"use client";

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
  return (
    <>
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-900"
          >
            چرا Front Learn ساخته شد؟
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center text-gray-600 mt-6 max-w-2xl mx-auto"
          >
            Front Learn تلاش می‌کند یادگیری فرانت‌اند را ساده، ساختارمند و
            پروژه‌محور کند تا مسیر یادگیری برای همه قابل فهم و کاربردی باشد.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6 mt-5">
            {cards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.03 }}
                className=" bg-white border border-gray-200 rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 d-flex justify-center align-items-center flex-col"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {card.title}
                </h3>

                <p className="text-gray-600 mt-3 leading-relaxed">
                  {card.desc}
                </p>

                <div className="mt-6 h-1 w-12 bg-gradient-to-r from-violet-500 to-sky-500 rounded-full"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
