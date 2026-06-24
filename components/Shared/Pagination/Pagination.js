import styles from "./Pagination.module.css";
import { PiCaretLineLeft, PiCaretLineRight } from "react-icons/pi";
export default function Pagination({
  totalPage,
  currentPage,
  onChange,
  maxVisible = 5,
}) {
  const getPageNumbers = () => {
    let half = Math.floor(maxVisible / 2);

    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPage, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className={styles.pagination_box}>
      <button
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        className={styles.nav_btn}
      >
        <PiCaretLineRight size={23} />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onChange(page)}
          className={`${styles.btn_page} ${currentPage === page ? styles.active : ""}`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPage}
        onClick={() => onChange(currentPage + 1)}
        className={styles.nav_btn}
      >
        <PiCaretLineLeft size={23} />
      </button>
    </div>
  );
}
