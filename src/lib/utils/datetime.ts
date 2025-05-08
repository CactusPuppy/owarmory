export function toSimpleDate(datestring: string) {
  const date = new Date(datestring);

  return date.toLocaleDateString("en", {
    day: "numeric",
    month: "long",
  });
}
