"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
} from "react-icons/si";

const stack = [
  {
    name: "React",
    icon: SiReact,
    color: "text-cyan-500",
    bg: "from-cyan-500/10 to-blue-500/5",
    border: "border-cyan-200",
  },
  {
    name: "Next.js",
    icon: SiNextdotjs,
    color: "text-black",
    bg: "from-gray-500/10 to-zinc-500/5",
    border: "border-gray-300",
  },
  {
    name: "JavaScript",
    icon: SiJavascript,
    color: "text-yellow-500",
    bg: "from-yellow-400/10 to-yellow-500/5",
    border: "border-yellow-300",
  },
  {
    name: "Tailwind",
    icon: SiTailwindcss,
    color: "text-sky-500",
    bg: "from-sky-400/10 to-blue-400/5",
    border: "border-sky-200",
  },
  {
    name: "Framer Motion",
    icon: SiFramer,
    color: "text-violet-500",
    bg: "from-violet-500/10 to-purple-500/5",
    border: "border-violet-200",
  },
];

export default function AboutTechStack() {
  return (
    <section className="relative py-28 p-4 bg-white overflow-hidden my-5 rounded-2xl">
      <div className=" absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-violet-300/30 blur-3xl  " />
      <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] bg-sky-300/30 blur-3xl  " />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">
            تکنولوژی‌های استفاده شده
          </h2>

          <p className="text-gray-600 mt-4">
            Front Learn با ابزارهای مدرن وب ساخته شده است
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mt-16">
          {stack.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.08,
                }}
                className={` relative rounded-2xl border ${item.border} bg-gradient-to-br ${item.bg} p-2 text-center shadow-sm hover:shadow-xl transition-all duration-300 cursor-default overflow-hidden`}
              >
                <div className="absolute inset-0 opacity-0 hover:opacity-100 transition bg-gradient-to-r from-violet-500/10 to-sky-500/10" />

                <div className="flex justify-center mb-3 relative z-10">
                  <Icon className={`text-3xl ${item.color}`} />
                </div>

                <h3 className="relative text-lg font-semibold text-gray-800 z-10">
                  {item.name}
                </h3>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
