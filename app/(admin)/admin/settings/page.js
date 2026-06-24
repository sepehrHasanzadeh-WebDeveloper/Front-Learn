"use client";

import { Container } from "react-bootstrap";
import styles from "./Settings.module.css";
const themes = [
  "linear-gradient(-20deg, #6e45e2 0%, #88d3ce 100%)",
  "linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%)",
  "linear-gradient(to top, #5f72bd 0%, #9b23ea 100%)",
  "linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)",
  "linear-gradient(to top, #1e3c72 0%, #1e3c72 1%, #2a5298 100%)",
  "linear-gradient(-225deg, #7085B6 0%, #87A7D9 50%, #DEF3F8 100%)",
  "linear-gradient(-225deg, #65379B 0%, #886AEA 53%, #6457C6 100%)",
  "linear-gradient(-225deg, #3D4E81 0%, #5753C9 48%, #6E7FF3 100%)",
];
export default function Settings() {
  const setThemeHandler = (theme) => {
    document.documentElement.style.setProperty("--admin-panel-theme", theme);

    localStorage.setItem("admin-theme", theme);
  };

  return (
    <Container className="mt-5">
      <h4 className="fw-bold">تم های پنل ادمین</h4>

      <div className="flex gap-x-6 mt-4">
        {themes.map((theme) => (
          <div
            key={theme}
            className={styles.them_selection}
            style={{ backgroundImage: theme }}
            onClick={() => setThemeHandler(theme)}
          />
        ))}
      </div>
    </Container>
  );
}
