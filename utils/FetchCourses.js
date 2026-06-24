export const fetcher = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("خطا در برقراری ارتباط با سرور");
  }

  const data = await res.json();

  if (!data.success) {
    throw new Error("خطا در دریافت داده‌ها");
  }

  return data;
};
