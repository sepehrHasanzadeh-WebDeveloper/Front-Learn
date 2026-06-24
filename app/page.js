"use client";
import styles from "../components/Hero/Hero.module.css";
import Hero from "@/components/Hero/Hero";
import LangSection from "@/components/LangSenction/LangSection";
import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";
import ArticleSection from "@/components/Sections/Home/ArticleSection";
import FAQSection from "@/components/Sections/Home/FAQSection";
import LastCourses from "@/components/Sections/Home/LastCourses";
import LearnRoad from "@/components/Sections/Home/LearnRoad";
import CardLoader from "@/components/Shared/CardLoader/CardLoader";
import { Suspense } from "react";

const theme = {
  buttonBg: "bg-white/10",
  buttonText: "text-white",
  buttonHover: "bg-white/20",
  menuBg: "bg-white/15",
  menuBorder: "border-white/20",
  menuText: "text-white/90",
  menuHoverBg: "bg-white/20",
  menuHoverText: "text-white",
  logoutText: "text-red-400",
  logoutHoverBg: "bg-red-500/20",
};
export default function Home() {
  return (
    <>
      <div className={styles.Header_bg_section}>
        <Header theme={theme} />
        <Hero />
      </div>
      <LangSection />
      <Suspense fallback={<CardLoader />}>
        <LastCourses />
      </Suspense>
      <LearnRoad />
      <ArticleSection />
      <FAQSection />
      <Footer />
    </>
  );
}
