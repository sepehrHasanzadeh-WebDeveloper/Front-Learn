"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

function useCountUp(target, isActive, duration = 1500) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isActive) return;

    let start = 0;
    const steps = 60;
    const increment = target / steps;
    const stepTime = duration / steps;

    const interval = setInterval(() => {
      start += increment;

      if (start >= target) {
        start = target;
        clearInterval(interval);
      }

      setValue(Math.floor(start));
    }, stepTime);

    return () => clearInterval(interval);
  }, [isActive, target, duration]);

  return value;
}

function Counter({ value, label, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const count = useCountUp(value, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.6,
        delay,
        ease: "easeOut",
      }}
      className="text-center relative"
    >
      <div className="absolute inset-0 blur-3xl opacity-20 bg-gradient-to-r from-violet-500 to-sky-500 rounded-full" />

      <motion.h2
        animate={isInView ? { scale: [0.8, 1.15, 1] } : {}}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-gray-900 relative"
      >
        {count}+
      </motion.h2>

      <p className="text-gray-600 mt-3 relative">{label}</p>
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-28 px-6 bg-white my-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl font-bold text-gray-900">آمار Front Learn</h2>

          <p className="text-gray-600 my-4">
            رشد واقعی کاربران و فعالیت‌ها در پلتفرم
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mt-20">
          <Counter value={1200} label="دانشجوی فعال" delay={0.1} />
          <Counter value={85} label="دوره آموزشی" delay={0.2} />
          <Counter value={240} label="پروژه انجام شده" delay={0.3} />
          <Counter value={500} label="ساعت آموزش" delay={0.4} />
        </div>
      </div>
    </section>
  );
}
