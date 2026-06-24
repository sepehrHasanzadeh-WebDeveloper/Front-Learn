export function PhoneFormatter(value) {
  const faDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return value?.toString().replace(/\d/g, (d) => faDigits[d]);
}
