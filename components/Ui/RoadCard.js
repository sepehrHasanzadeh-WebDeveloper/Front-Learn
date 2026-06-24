import styles from "./RoadCard.module.css";

import { FaCss3, FaReact } from "react-icons/fa";
import {
  SiHtml5,
  SiJavascript,
  SiRedux,
  SiTailwindcss,
  SiNodedotjs,
  SiBootstrap,
} from "react-icons/si";

// map آیکن ها
const iconMap = {
  SiHtml5: SiHtml5,
  FaCss3: FaCss3,
  SiJavascript: SiJavascript,
  SiRedux: SiRedux,
  SiTailwindcss: SiTailwindcss,
  SiNodedotjs: SiNodedotjs,
  SiBootstrap: SiBootstrap,
  FaReact: FaReact,
};

export default function RoadCard({ pack }) {
  return (
    <div className={`${styles.course_package} shadow-md`}>
      <div className={styles.icons_box}>
        {pack?.icons?.map((icon, i) => {
          const IconComponent = iconMap[icon.iconName];

          return (
            <div
              key={i}
              className={`${styles.glow_icon}`}
              style={{ "--icon-bg": icon.iconColor }}
            >
              {IconComponent && <IconComponent size={30} />}
            </div>
          );
        })}
      </div>

      <div className={styles.course_package_body}>
        <p className={styles.course_package_title}>{pack.title}</p>
        <p className={styles.course_package_text}>{pack.shortDescription}</p>
      </div>

      <hr />

      <button
        className={styles.btn_see_course}
        style={{ background: pack.theme }}
      >
        مشاهده اطلاعات دوره
      </button>
    </div>
  );
}
