"use client";
import { useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import styles from "./Accordion.module.css";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`${styles.acc_item} ${openIndex === i ? styles.open : ""}`}
        >
          <button
            onClick={() => toggle(i)}
            className={styles.acc_btn}
          >
            <span className={styles.acc_question}>
              {item.question}
            </span>

            <div
              className={`${styles.acc_icon} ${openIndex === i ? styles.rotated : ""}`}
            >
              <ChevronDownIcon className={styles.icon} />
            </div>
          </button>

          <div
            className={`${styles.acc_body} ${openIndex === i ? styles.open : ""}`}
          >
            <p className={styles.acc_answer}>
              {item.answer}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}