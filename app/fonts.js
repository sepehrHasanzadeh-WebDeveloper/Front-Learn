import localFont from "next/font/local";

export const myFonts = localFont({
  src: [
    {
      path: "../public/fonts/Vazir-Bold.woff2",
      weight: "700",
    },
    {
      path: "../public/fonts/Vazir.woff2",
      weight: "400",
    },
  ],

  variable: "--font-myfont ",
});
export const avinyFont = localFont({
  src: [{ path: "../public/fonts/aviny.ttf" }],
  variable: "--avinyFont",
});
