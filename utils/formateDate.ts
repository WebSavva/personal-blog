export default function (rawDate: string) {
  const [day, month, year] = rawDate.split('.');

  return new Date(+year, +month - 1, +day).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
