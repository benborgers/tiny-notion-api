export default function colorClass(color): string {
  if (color === "default") {
    return "";
  }

  return `notion-${color}`;
}
