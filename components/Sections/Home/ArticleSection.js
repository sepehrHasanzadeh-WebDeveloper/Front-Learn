import { Col, Container, Row } from "react-bootstrap";
import styles from "./ArticleSection.module.css";
import Image from "next/image";
import { SlCalender } from "react-icons/sl";

export default function ArticleSection() {
  return (
    <>
      <Container className={`my-5 p-4 p-lg-5 rounded-4 ${styles.wrapper}`}>
        <div className={styles.section_header}>
          <span>بلاگ فرانت لرن</span>

          <h3>جدیدترین مقالات برنامه نویسی</h3>

          <p>آموزش‌های کاربردی، مقالات تخصصی و نکات مهم توسعه وب</p>
        </div>

        <Row className="g-5 row-cols-1 row-cols-lg-2">
          <Col>
            <div className={styles.article_right_side}>
              <span className={styles.category}>UI/UX</span>

              <p>
                بسیاری از توسعه‌دهندگان تصور می‌کنند طراحی رابط کاربری فقط وظیفه
                طراحان است، اما آشنایی با اصول UI/UX می‌تواند کیفیت پروژه‌های
                فرانت‌اند را به شکل چشمگیری افزایش دهد. در این مقاله بررسی
                می‌کنیم چرا هر برنامه‌نویس فرانت‌اند باید حداقل مفاهیم پایه
                طراحی را بداند.
              </p>
              <strong>
                آیا توسعه‌دهندگان فرانت‌اند باید طراحی رابط کاربری را یاد
                بگیرند؟
              </strong>

              <span>
                <small>۴ ماه پیش</small>
                <SlCalender />
              </span>

              <Image
                src="/images/article5.jpg"
                alt="UI UX"
                width={600}
                height={550}
              />
            </div>
          </Col>

          <Col>
            <div className={styles.article_left_side}>
              <div className={styles.article_box}>
                <div className={styles.article_box_image}>
                  <Image
                    src="/images/article1.jpg"
                    alt="برنامه نویسی ماژولار"
                    width={276}
                    height={155}
                  />
                </div>

                <div className={styles.article_box_content}>
                  <span className={styles.category}>JavaScript</span>

                  <strong>برنامه نویسی ماژولار چیست و چه مزایایی دارد؟</strong>

                  <p>
                    برنامه نویسی ماژولار روشی برای سازمان‌دهی کدها به بخش‌های
                    کوچک، مستقل و قابل استفاده مجدد است که نگهداری پروژه را
                    بسیار آسان‌تر می‌کند.
                  </p>

                  <span>
                    <small>۴ ماه پیش</small>
                    <SlCalender />
                  </span>
                </div>
              </div>

              <div className={styles.article_box}>
                <div className={styles.article_box_image}>
                  <Image
                    src="/images/article2.jpg"
                    alt="React UI Libraries"
                    width={276}
                    height={155}
                  />
                </div>

                <div className={styles.article_box_content}>
                  <span className={styles.category}>React</span>

                  <strong>
                    ۱۵ کتابخانه برتر رابط کاربری React برای پروژه‌های مدرن
                  </strong>

                  <p>
                    از Material UI تا Shadcn UI، در این مقاله بهترین
                    کتابخانه‌های رابط کاربری ری‌اکت را بررسی می‌کنیم تا انتخاب
                    مناسب‌تری برای پروژه‌های خود داشته باشید.
                  </p>

                  <span>
                    <small>۴ ماه پیش</small>
                    <SlCalender />
                  </span>
                </div>
              </div>

              <div className={styles.article_box}>
                <div className={styles.article_box_image}>
                  <Image
                    src="/images/article3.jpg"
                    alt="Django REST Framework"
                    width={276}
                    height={155}
                  />
                </div>

                <div className={styles.article_box_content}>
                  <span className={styles.category}>Backend</span>

                  <strong>
                    Django REST Framework چیست؟ معرفی محبوب‌ترین ابزار ساخت API
                  </strong>

                  <p>
                    اگر قصد دارید با جنگو APIهای حرفه‌ای بسازید، DRF یکی از
                    بهترین گزینه‌هاست. در این مقاله با قابلیت‌ها و مزایای آن
                    آشنا می‌شویم.
                  </p>

                  <span>
                    <small>۴ ماه پیش</small>
                    <SlCalender />
                  </span>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className={styles.blog_action}>
          <button>مشاهده همه مقالات</button>
        </div>
      </Container>
    </>
  );
}
