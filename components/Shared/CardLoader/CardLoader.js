import styles from "./CardLoader.module.css"
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardLoader () {
    return (
        <>
            <div className={styles.loading_Card}>
                <div><Skeleton height={210} width={230} /></div>
                <div className={styles.loading_Card_body}>
                    <Skeleton height={20} width={150} />
                    <Skeleton height={40} />
                </div>
                <div className={styles.loading_Card_footer}>
                     <Skeleton height={10} width={50} />
                      <Skeleton height={10} width={80} />
                </div>
            </div>
        </>
    )
}