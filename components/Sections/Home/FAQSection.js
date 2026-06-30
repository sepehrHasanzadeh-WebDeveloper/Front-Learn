"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { Col, Container, Row } from "react-bootstrap";

const Accordion = dynamic(
  () => import("@/components/Shared/Accordion/Accordion"),
  {
    ssr: false,
  },
);

export default function FAQSection() {
  const faqItems = [
    {
      question: "پس از خرید دوره تا چه مدت به آن دسترسی دارم؟",
      answer:
        "دسترسی به دوره‌ها دائمی است و پس از خرید محدودیت زمانی نخواهید داشت.",
    },
    {
      question: "آیا پس از اتمام دوره گواهی دریافت می‌کنم؟",
      answer:
        "بله، پس از تکمیل دوره می‌توانید گواهی پایان دوره را دریافت کنید.",
    },
    {
      question: "اگر از خرید خود منصرف شوم امکان بازگشت وجه وجود دارد؟",
      answer:
        "در صورت رعایت شرایط بازگشت وجه، درخواست شما توسط تیم پشتیبانی بررسی خواهد شد.",
    },
    {
      question: "آیا دوره‌ها برای ورود به بازار کار مناسب هستند؟",
      answer:
        "بله، محتوای دوره‌ها بر اساس نیازهای واقعی بازار کار طراحی شده و شامل پروژه‌های عملی می‌باشد.",
    },
  ];

  return (
    <Container>
      <main
        className="py-24"
        style={{ marginBottom: "86px", marginTop: "58px" }}
      >
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-medium mb-4">
            سوالات متداول
          </span>

          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            پاسخ سوالات شما
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto">
            پاسخ پرتکرارترین سوالات کاربران فرانت لرن را در این بخش مشاهده کنید.
          </p>
        </div>

        <Row className="align-items-center g-5  mx-0">
          <Col lg={6}>
            <Accordion items={faqItems} />
          </Col>

          <Col lg={6} className="text-center">
            <Image
              src="/images/faq.png"
              alt="سوالات متداول"
              width={550}
              height={550}
               style={{
                    width: "450px",
                    height: "450px",
                  }}
              className="rounded-3xl shadow-md"
            />
          </Col>
        </Row>
      </main>
    </Container>
  );
}
