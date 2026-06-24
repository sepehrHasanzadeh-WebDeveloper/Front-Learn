"use client";

import { Col, Container, Row } from "react-bootstrap";
import styles from "./Hero.module.css";
import { TypeAnimation } from "react-type-animation";
import Link from "next/link";
export default function Hero() {
  return (
    <>
      <Container className="p-5">
        <Row className="gy-5 align-items-center justify-content-center ">
          <Col
            className={`${styles.right_col} d-flex flex-column justify-content-center align-items-center`}
            lg={5}
            xs={{ span: 12, order: 2 }}
          >
            <span>فرانت لرن | سکوی یادگیری – اشنایی با تکنولوژی ها</span>

            <TypeAnimation
              sequence={["با فرانت لرن لذت یادگیری رو تجربه کن .", 2000]}
              wrapper="h2"
              speed={50}
              repeat={Infinity}
            />

            <p>
              در فرانت‌لرن مسیر یادگیری فرانت‌اند را از پایه تا ساخت
              اپلیکیشن‌های حرفه‌ای همراهت هستیم. مهارت بساز، نمونه‌کار خلق کن و
              یک قدم به شغل رویایی‌ات نزدیک‌تر شو.
            </p>
            <div>
              <Link href={"/courses"}>
                <button className={styles.button_1_hero}>مشاهده دوره ها</button>
              </Link>
              <Link href={"/about-us"}>
                <button className={styles.button_2_hero}>مشاهده مدرس</button>
              </Link>
            </div>
          </Col>

          <Col lg={{ span: 2, order: 2 }} xs={0}></Col>

          <Col
            className={`${styles.left} d-flex flex-column justify-content-center align-items-center`}
            lg={{ span: 5, order: 2 }}
            xs={{ span: 12, order: 1 }}
          >
            <img src="/images/left.svg" alt="icon" />
          </Col>
        </Row>
      </Container>

      <div className={styles.header_box_bottom}></div>
    </>
  );
}
