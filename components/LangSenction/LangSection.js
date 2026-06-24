import { Container } from "react-bootstrap";
import styles from "./LangSection.module.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
const imgData = [
  {
    id: "1",
    img: "/images/next.svg",
    alt: "Next Js",
  },
  {
    id: "2",
    img: "/images/js.svg",
    alt: "Javascript",
  },
  {
    id: "3",
    img: "/images/git.svg",
    alt: "Git",
  },
  {
    id: "4",
    img: "/images/bootstrap.svg",
    alt: "Bootstrap",
  },
  {
    id: "5",
    img: "/images/vue.svg",
    alt: "Vue",
  },
  {
    id: "6",
    img: "/images/react.svg",
    alt: "React",
  },
  {
    id: "7",
    img: "/images/vite.svg",
    alt: "Vite",
  },
  {
    id: "8",
    img: "/images/angular.svg",
    alt: "Angular",
  },
  {
    id: "9",
    img: "/images/ts.svg",
    alt: "TypeScript",
  },
  {
    id: "10",
    img: "/images/tailwind.svg",
    alt: "Tailwind",
  },
  {
    id: "11",
    img: "/images/html.svg",
    alt: "HTML",
  },
  {
    id: "12",
    img: "/images/redux.svg",
    alt: "Redux",
  },
  {
    id: "13",
    img: "/images/nodejs.svg",
    alt: "NodeJs",
  },
  {
    id: "14",
    img: "/images/npm.svg",
    alt: "Npm ",
  },
];
export default function LangSection() {
  return (
    <>
      <section style={{ marginTop: "100px" }}>
        <Container>
          <p className={styles.title_lang_section}>
            پشتیبانی <span>زبان ها و فریم ورک ها</span>
          </p>
          <p className={styles.text_lang_section}>
            زبان ها و فریم ورک هایی که ما پشتیبانی می کنیم
          </p>
          <Swiper
            modules={[Autoplay]}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            speed={5000}
            loop={true}
            spaceBetween={20}
            slidesPerView={8}
            allowTouchMove={false}
            freeMode={true}
            style={{ padding: "50px 0" }}
            breakpoints={{
              0: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              576: {
                slidesPerView: 3,
                spaceBetween: 12,
              },
              768: {
                slidesPerView: 5,
                spaceBetween: 15,
              },
              992: {
                slidesPerView: 5,
                spaceBetween: 18,
              },
              1400: {
                slidesPerView: 8,
                spaceBetween: 20,
              },
            }}
          >
            {imgData.map((icon) => (
              <SwiperSlide key={icon.id}>
                <div className={styles.parent_lang}>
                  <img src={icon.img} alt={icon.alt || "icon"} />
                  <p>{icon.alt}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </section>
    </>
  );
}
