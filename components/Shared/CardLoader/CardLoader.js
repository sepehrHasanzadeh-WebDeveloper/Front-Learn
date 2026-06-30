import { useTheme } from "@/contexts/ThemeContext";
import styles from "./CardLoader.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardLoader() {
  const { themeg } = useTheme();
  return (
    <>
      <div className={styles.loading_Card}>
        <div>
          <Skeleton
            height={210}
            width={230}
            baseColor={themeg === "dark" ? "#1f2937" : "#e5e7eb"}
            highlightColor={themeg === "dark" ? "#374151" : "#f3f4f6"}
          />
        </div>
        <div className={styles.loading_Card_body}>
          <Skeleton
            height={20}
            width={150}
            baseColor={themeg === "dark" ? "#1f2937" : "#e5e7eb"}
            highlightColor={themeg === "dark" ? "#374151" : "#f3f4f6"}
          />
          <Skeleton
            height={40}
            baseColor={themeg === "dark" ? "#1f2937" : "#e5e7eb"}
            highlightColor={themeg === "dark" ? "#374151" : "#f3f4f6"}
          />
        </div>
        <div className={styles.loading_Card_footer}>
          <Skeleton
            height={10}
            width={50}
            baseColor={themeg === "dark" ? "#1f2937" : "#e5e7eb"}
            highlightColor={themeg === "dark" ? "#374151" : "#f3f4f6"}
          />
          <Skeleton
            height={10}
            width={80}
            baseColor={themeg === "dark" ? "#1f2937" : "#e5e7eb"}
            highlightColor={themeg === "dark" ? "#374151" : "#f3f4f6"}
          />
        </div>
      </div>
    </>
  );
}
